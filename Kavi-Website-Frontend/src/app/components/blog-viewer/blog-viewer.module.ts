import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { BlogViewerRoutingModule } from './blog-viewer-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BlogViewerRoutingModule,
    MarkdownModule.forChild()
  ],
  providers:[DatePipe]
})
export class BlogViewerModule { }
