import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BodyContentRoutingModule } from './body-content-routing.module';
import { BodyContentComponent } from './body-content.component';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    BodyContentRoutingModule,
    FormsModule, 
    MatInputModule, 
    MatButtonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAvcDy5ZYc2ujCS6TTtI3RYX5QmuoV8Ffw'
    })
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class BodyContentModule { }
