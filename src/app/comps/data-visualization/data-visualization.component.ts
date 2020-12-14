import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-visualization',
  templateUrl: './data-visualization.component.html',
  styleUrls: ['./data-visualization.component.css']
})

export class DataVisualizationComponent implements OnInit {
  show = false;
  error = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  next(event:any){
    if (event.status == 200)
      this.show = true;
    else
      this.show = false;
  }

}
