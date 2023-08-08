import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxTinySliderModule } from 'ngx-tiny-slider';
import { FooterContentModule } from '../footer-content/footer-content.module';
import { HeaderContentModule } from '../header-content/header-content.module';
import { DefaultRoutingModule } from './default-routing.module';
import { DefaultComponent } from './default.component';
import { AppModule } from "../app.module";


@NgModule({
    declarations: [
        DefaultComponent
    ],
    imports: [
        CommonModule,
        DefaultRoutingModule,
        ScrollingModule,
        FooterContentModule,
        HeaderContentModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        MatDialogModule,
        ScrollingModule,
        MatCardModule,
        NgxTinySliderModule,
        NgbModule,
        // AppModule
    ]
})
export class DefaultModule { }
