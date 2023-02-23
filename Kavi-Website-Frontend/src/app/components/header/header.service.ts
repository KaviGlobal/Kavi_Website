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

  public getMenuList(): any {
    return new Promise<any>((resolve, reject) => {
      const apiUrl =  appConfig.MENU;
      this.apicallService.apiCall(apiUrl, 'get', '', '').then((resp: any) => {
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
