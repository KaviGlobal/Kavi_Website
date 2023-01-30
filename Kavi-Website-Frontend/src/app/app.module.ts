import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AgmCoreModule } from '@agm/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SecurityContext } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MarkdownModule } from 'ngx-markdown';
import { NgxTinySliderModule } from 'ngx-tiny-slider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CollageViewComponent } from './collage/collage-view/collage-view.component';
import { FooterContentComponent } from './footer-content/footer-content.component';
import { HeaderContentModule } from './header-content/header-content.module';
import { TokenInterceptorService } from './interceptorService.ts/tokenInterceptor.service';
import { FooterContentModule } from './footer-content/footer-content.module';
@NgModule({
  declarations: [
    AppComponent,
    // FooterContentComponent,
    CollageViewComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    HeaderContentModule,
    FooterContentModule,
    ScrollingModule,
    MatCardModule,
    NgxTinySliderModule,
    NgbModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAvcDy5ZYc2ujCS6TTtI3RYX5QmuoV8Ffw'
    }),
    MarkdownModule.forRoot({ loader: HttpClient, sanitize: SecurityContext.NONE })
  ],
  exports: [
    CommonModule,
    NgxTinySliderModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
