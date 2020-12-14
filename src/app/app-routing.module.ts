import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Routes
import { MainComponent } from './comps/main/main.component';
import { DataVisualizationComponent } from './comps/data-visualization/data-visualization.component';
import { ScatterComponent } from './comps/scatter/scatter.component'
import { BoxComponent } from './comps/box/box.component';
import { BarComponent } from './comps/bar/bar.component';
import { DataloadComponent } from './comps/dataload/dataload.component';
import { DensityComponent } from './comps/density/density.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch:"full" },
  { path: 'main', component: MainComponent },
  { path: 'datavisualization', component: DataVisualizationComponent, children: [ 
    { path: 'scatter', component: ScatterComponent },
    { path: 'box', component: BoxComponent },
    { path: 'bar', component: BarComponent },
    { path: 'density', component: DensityComponent }
  ]},
  { path: 'dataload', component: DataloadComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
