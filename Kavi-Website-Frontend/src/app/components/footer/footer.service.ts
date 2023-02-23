import { Injectable } from '@angular/core';
import appConfig from '../../../assets/config/appconfig.json';
import { ApiCallService } from '../../services/apicall.service';

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  constructor(
    private apicallService: ApiCallService,
  ) { }

  public getFooterData(): any {
    return new Promise<any>((resolve, reject) => {
      const apiUrl =  appConfig.HEADER_FOOTER;
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
