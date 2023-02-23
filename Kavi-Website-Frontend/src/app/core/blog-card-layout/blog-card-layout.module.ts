import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { BlogCardLayoutRoutingModule } from './blog-card-layout-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BlogCardLayoutRoutingModule,
  ],
  providers:[DatePipe],
})
export class BlogCardLayoutModule { }
