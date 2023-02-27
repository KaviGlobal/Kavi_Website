import { Injectable } from '@angular/core';
import appConfig from '../../../assets/config/appconfig.json';
import { ApiCallService } from '../../services/apicall.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private apicallService: ApiCallService,
  ) { }


  public getHomeData(): any {
    return new Promise<any>((resolve, reject) => {
      const endpoint =  appConfig.HOME;
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
