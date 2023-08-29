import { CUSTOM_ELEMENTS_SCHEMA ,NgModule } from '@angular/core';
import { BrowserModule, Meta } from '@angular/platform-browser';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './views/home/home.component';
import { CardLayoutComponent } from './core/card-layout/card-layout.component';
import { RightMenuComponent } from './views/right-menu/right-menu.component';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { RightMenuDetailsCardComponent } from './core/right-menu-details-card/right-menu-details-card.component';
import { SubscribeLayoutComponent } from './core/subscribe-layout/subscribe-layout.component';
import { RightMenuSidebarComponent } from './core/right-menu-sidebar/right-menu-sidebar.component';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { PageLoaderComponent } from './core/page-loader/page-loader.component';
import { ServiceloaderComponent } from './core/page-loader/serviceloader/serviceloader.component';
import { MarkdownModule } from 'ngx-markdown';
import { RightMenuDetailsComponent } from './views/right-menu-details/right-menu-details.component';
import { DetailViewerRightPaneComponent } from './core/detail-viewer-right-pane/detail-viewer-right-pane.component';
//import { CustomPipePipe } from './custom-pipe.pipe';
import { CustomPipePipe } from 'src/app/custom-pipe.pipe';
import { MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MAT_SELECT_CONFIG } from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CardLayoutComponent,
    RightMenuComponent,
    RightMenuDetailsCardComponent,
    SubscribeLayoutComponent,
    RightMenuSidebarComponent,
    PageLoaderComponent,
    ServiceloaderComponent,
    RightMenuDetailsComponent,
    CustomPipePipe,
    DetailViewerRightPaneComponent,
    PagenotfoundComponent,
  ],
  imports: [
    MatTableModule,
    BrowserModule,
    AppRoutingModule,
    NgbCarouselModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CommonModule,
  //  EmbedVideoModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAvcDy5ZYc2ujCS6TTtI3RYX5QmuoV8Ffw',
    }),
    MarkdownModule.forRoot(),
  ],
  providers: [
    Meta,
    DatePipe,CustomPipePipe,
    {provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: {disabled: true}},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { floatLabel: 'always' } },
    {provide: MAT_SELECT_CONFIG, useValue: { disableOptionCentering: 'true' } }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
