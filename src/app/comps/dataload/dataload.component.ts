import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { Dataloadint } from './dataloadint';
import { of } from 'rxjs/internal/observable/of';
import { catchError, last, map, tap } from 'rxjs/operators';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpClient, HttpRequest, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dataload',
  templateUrl: './dataload.component.html',
  styleUrls: ['./dataload.component.css'],
  animations: [
      trigger('fadeInOut', [
      state('in', style({ opacity: 100 })),
      transition('* => void', [
        animate(300, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class DataloadComponent implements OnInit {
  @Input() text = 'Upload';
  @Input() param = 'file';
  @Input() target = `${environment.apiUrl}/dataload`;
  @Input() accept = '.csv';

  @Output() complete = new EventEmitter<string>();
  fileInformation: any;
  files: Array<Dataloadint> = [];
  error = false;
  constructor(private _http: HttpClient) { }

  ngOnInit(): void {
  }
  
  onClick() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;

    fileUpload.onchange = () => {
      if(fileUpload.files != null){  
        for (let index = 0; index < fileUpload.files.length; index++) {
          const file = fileUpload.files[index];
          this.files.push({
            data: file,
            state: 'in',
            inProgress: false,
            progress: 0,
            canRetry: false,
            canCancel: true
          });
        }
      }

      this.uploadFiles();
    };

    fileUpload.click();
  }

  cancelFile(file: Dataloadint) {
    if(file.sub != null)
      file.sub.unsubscribe();

    this.removeFileFromArray(file);
  }

  retryFile(file: Dataloadint) {
    this.uploadFile(file);

    file.canRetry = false;
  }

  private uploadFile(file: Dataloadint) {
    this.error = false;
    const fd = new FormData();
    fd.append(this.param, file.data);

    const req = new HttpRequest('POST', this.target, fd, {
      reportProgress: true
    });

    file.inProgress = true;
    file.sub = this._http.request(req).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            if(event.total != null)
              file.progress = Math.round(event.loaded * 100 / event.total);
              return;
          case HttpEventType.Response:
            return event;
          default:
            return;
        }
      }),
      tap(message => { }),
      last(),
      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;
        file.canRetry = true;
        this.error = true;
        return of(`${file.data.name} upload failed.`);
      })
    ).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {
          this.removeFileFromArray(file);
          this.complete.emit(event);
        }
      }
    );
  }

  private uploadFiles() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.value = '';

    this.files.forEach(file => {
      this.uploadFile(file);
    });
  }

  private removeFileFromArray(file: Dataloadint) {
    const index = this.files.indexOf(file);

    if (index > -1) {
      this.files.splice(index, 1);
    }
  }
}
