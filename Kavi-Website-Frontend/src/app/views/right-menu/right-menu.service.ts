import { Injectable } from '@angular/core';
import appConfig from '../../../assets/config/appconfig.json';
import { ApiCallService } from '../../services/apicall.service';

@Injectable({
  providedIn: 'root'
})
export class RightMenuService {

  constructor(
    private apicallService: ApiCallService,
  ) { }


  public getRightMenuPageData(apiUrl: string): any {
    return new Promise<any>((resolve, reject) => {
      this.apicallService.apiCall(apiUrl, '', 'get', '', '').then((resp: any) => {
        if (resp) {
          resolve(resp);
        }
        else {
          resolve(false);
        }
      })
    });
  }
  public getDetailsData(type: string, blogTitle: string): any {
    return new Promise<any>((resolve, reject) => {
      const endpoint =  appConfig.RIGHT_MENU_TYPE + type + appConfig.RIGHT_MENU_VIEW_TYPE + blogTitle;
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
  
  public getBlogViewer(): any {
    return new Promise<any>((resolve, reject) => {
      const endpoint =  appConfig.BLOG_VIEWER;
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
  
  public getRecommendationsByTag(type: string, tagName: string): any {
    return new Promise<any>((resolve, reject) => {
      const endpoint =  appConfig.RECOMMENDATION_BY_TAG + type + appConfig.RECOMMENDATION_BY_TAG_FILTER + tagName;
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
