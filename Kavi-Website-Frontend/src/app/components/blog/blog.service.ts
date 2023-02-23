import { Injectable } from '@angular/core';
import appConfig from '../../../assets/config/appconfig.json';
import { ApiCallService } from '../../services/apicall.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(
    private apicallService: ApiCallService,
  ) { }


  public getBlogList(): any {
    return new Promise<any>((resolve, reject) => {
      const apiUrl =  appConfig.BLOGLIST;
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
  public getBlogView(blogTitle: string): any {
    return new Promise<any>((resolve, reject) => {
      const apiUrl =  appConfig.BLOG_VIEW + blogTitle;
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
