import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogRoutingModule } from './blog-routing.module';
import { DatePipe } from '@angular/common';
import { BlogCardLayoutModule } from 'src/app/core/blog-card-layout/blog-card-layout.module';
import { MarkdownModule } from 'ngx-markdown';
// import { BlogViewerComponent } from '../blog-viewer/blog-viewer.component';

@NgModule({
  declarations: [
    // BlogCardComponent
  
    // BlogViewerComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BlogCardLayoutModule,
    MarkdownModule.forChild()
  ],
  providers:[DatePipe]
})
export class BlogModule { }
