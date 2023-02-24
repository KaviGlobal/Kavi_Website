import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';
import { AgmCoreModule } from '@agm/core';
import { CardLayoutComponent } from './core/card-layout/card-layout.component';
import { BlogComponent } from './components/blog/blog.component';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { BlogCardLayoutComponent } from './core/blog-card-layout/blog-card-layout.component';
import { SubscribeLayoutComponent } from './core/subscribe-layout/subscribe-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogSidebarComponent } from './core/blog-sidebar/blog-sidebar.component';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { PageLoaderComponent } from './core/page-loader/page-loader.component';
import { ServiceloaderComponent } from './core/page-loader/serviceloader/serviceloader.component';
import { MarkdownModule } from 'ngx-markdown';
import { BlogDetailsComponent } from './components/blog-details/blog-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CardLayoutComponent,
    BlogComponent,
    BlogCardLayoutComponent,
    SubscribeLayoutComponent,
    BlogSidebarComponent,
    PageLoaderComponent,
    ServiceloaderComponent,
    BlogDetailsComponent,
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
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAvcDy5ZYc2ujCS6TTtI3RYX5QmuoV8Ffw',
    }),
    MarkdownModule.forRoot()
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
