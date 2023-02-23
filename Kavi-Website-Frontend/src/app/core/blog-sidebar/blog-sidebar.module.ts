import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogSidebarRoutingModule } from './blog-sidebar-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BlogSidebarRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class BlogSidebarModule {}
