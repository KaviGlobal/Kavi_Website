import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
//import { CustomPipePipe } from './custom-pipe.pipe';
import { CustomPipePipe } from 'src/app/custom-pipe.pipe';


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
  ],
  imports: [
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
  providers: [DatePipe,CustomPipePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
