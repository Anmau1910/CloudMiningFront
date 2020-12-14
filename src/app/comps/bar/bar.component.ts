import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, retry } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormControl } from '@angular/forms'

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {
  option = new FormControl();  
  opts = [];
  response: any;
  load = false;
  error = false;
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get(`${environment.apiUrl}/datacols`).pipe(
      retry(3),
      catchError(err => {
        console.error(`Error ${err.status} getting columns`);
        this.error = true;
        return of(null);
      }))
      .subscribe(res => {
        if (res != null) {
          this.opts = (res as any).response;
          window.scroll(0,10000);
        }
      });
  }

  bar() {
    this.load=true;
    const params = new HttpParams().set('x', this.option.value[0]).set('y', this.option.value[1]);

    this.http.get(`${environment.apiUrl}/bar`, { params }).pipe(
      retry(3),
      catchError(err => {
        console.error(`Error ${err.status} getting barplot`);
        return of(null);
      }))
      .subscribe(res => {
        this.response = res;
        console.log(this.response);
        window.scroll(0,10000);
      });
  }

  scroll() {
    this.load =false;
    window.scroll(0,1000);
  }

}
