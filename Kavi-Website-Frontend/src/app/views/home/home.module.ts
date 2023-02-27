import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { HomeRoutingModule } from './home-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AgmCoreModule
  ]
})
export class HomeModule { }
