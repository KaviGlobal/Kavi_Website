import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterContentComponent } from './footer-content.component';



@NgModule({
  declarations: [
    FooterContentComponent
  ],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports: [FooterContentComponent],

})
export class FooterContentModule { }
