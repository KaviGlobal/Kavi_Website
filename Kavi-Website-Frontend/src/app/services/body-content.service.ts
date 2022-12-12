import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BodyContentService {

  constructor(private httpClient: HttpClient) { }

  getImage() {
    let url = 'https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/Some_analytical_tech_7_28de410afb.png'
    return this.httpClient.get<any>(url);
  }
}
