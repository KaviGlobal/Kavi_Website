import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyContentComponent } from './body-content.component';

const routes: Routes = [
  {
    path: '',
    component: BodyContentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BodyContentRoutingModule { }
