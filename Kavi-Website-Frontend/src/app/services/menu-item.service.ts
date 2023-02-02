import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {
  public auth_token?: any = 'ce8017deb30083a2792dc015dcfaf0b7c60358a6fb170a20ff7c0ced4058198641643ed4bd9fffb868b477cd58b6d2e64bc7c4ff641297fb4791acdca348d94748705ab103909d414dffe18f867e8126e44e80ae1bb38b6cb33c2a1c918d392bbb908a2dc96f3ff26b155510a8911fc73c00d82c515745b6673ad4be3af5ade9'
  constructor(private httpClient: HttpClient) { }

  getMenuItems(): Observable<any> {
    return this.httpClient.get<any>("https://kavi-strapi-app.azurewebsites.net/api/left-menus");
  }
}
