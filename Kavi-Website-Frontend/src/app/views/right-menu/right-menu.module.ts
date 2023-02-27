import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RightMenuRoutingModule } from './right-menu-routing.module';
import { DatePipe } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RightMenuRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MarkdownModule.forChild()
  ],
  providers:[DatePipe]
})
export class RightMenuModule { }
