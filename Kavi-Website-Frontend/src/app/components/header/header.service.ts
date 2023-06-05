import { Injectable } from '@angular/core';
import appConfig from '../../../assets/config/appconfig.json';
import { ApiCallService } from '../../services/apicall.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(
    private apicallService: ApiCallService,
  ) { }

  public getHeaderFooterData(): any {
    return new Promise<any>((resolve, reject) => {
      const endpoint =  appConfig.HEADER_FOOTER;
      this.apicallService.apiCall('', endpoint, 'get', '', '').then((resp: any) => {
        if (resp) {
          resolve(resp);
        }
        else {
          resolve(false);
        }
      })
    });
  }
  public getHeaderData(): any {
    return new Promise<any>((resolve, reject) => {
      const endpoint =  appConfig.HEADER;
      this.apicallService.apiCall('', endpoint, 'get', '', '').then((resp: any) => {
        if (resp) {
          resolve(resp);
        }
        else {
          resolve(false);
        }
      })
    });
  }
  public getFooterData(): any {
    return new Promise<any>((resolve, reject) => {
      const endpoint =  appConfig.FOOTER;
      this.apicallService.apiCall('', endpoint, 'get', '', '').then((resp: any) => {
        if (resp) {
          resolve(resp);
        }
        else {
          resolve(false);
        }
      })
    });
  }
  public getMenuList(): any {
    return new Promise<any>((resolve, reject) => {
      const endpoint =  appConfig.MENU;
      this.apicallService.apiCall('', endpoint, 'get', '', '').then((resp: any) => {
        if (resp) {
          resolve(resp);
        }
        else {
          resolve(false);
        }
      })
    });
  }
  public getMenu(): any {
    return new Promise<any>((resolve, reject) => {
      const endpoint =  appConfig.MENU_LIST;
      this.apicallService.apiCall('', endpoint, 'get', '', '').then((resp: any) => {
        if (resp) {
          resolve(resp);
        }
        else {
          resolve(false);
        }
      })
    });
  }
}
