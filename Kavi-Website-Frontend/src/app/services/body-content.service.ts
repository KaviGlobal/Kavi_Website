import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BodyContentService {

  constructor(private httpClient: HttpClient) { }

  getImage() {
    let url = 'https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/Some_analytical_tech_7_28de410afb.png'
    return this.httpClient.get<any>(url);
  }

  getHomeContent(): Observable<any> {
    return this.httpClient.get<any>("https://kavi-strapi-app.azurewebsites.net/api/home-page?populate=deep,20");
   }
}
