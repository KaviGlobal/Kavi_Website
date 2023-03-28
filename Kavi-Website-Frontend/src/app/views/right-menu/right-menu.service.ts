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
  
  public submitContactForm(contactForm: any): any {
    return new Promise<any>((resolve, reject) => {
      const endpoint =  appConfig.SEND_CONTACT_FORM ;
      let formData = {"data":""};
      formData["data"] = contactForm;
      this.apicallService.apiCall('', endpoint, 'post',formData,'').then((resp: any) => {
        console.log("resp",resp);
        if (resp) {
          resolve(resp);
        }
        else {
          resolve(false);
        }
      })
    });
  }
  public emailSubscription(email: string): any {
    return new Promise<any>((resolve, reject) => {
      const endpoint =  appConfig.EMAIL_SUBSCRIPTION ;
      let emailAddress = {
        "data": 
        {
            "Email": email
        }    
      }      
      this.apicallService.apiCall('', endpoint, 'post',emailAddress,'').then((resp: any) => {
        console.log("resp",resp);
        if (resp) {
          resolve(resp);
        }
        else {
          resolve(false);
        }
      })
    });
  }
  public getDetailsData(type: string, blogTitle: string): any {console.log(type,blogTitle)
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

  public getOfferingsData(name: string, Title: string): any {
    return new Promise<any>((resolve, reject) => {
      const endpoint =  appConfig.LEFT_MENU_TYPE + Title;
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
  
  public getContactForm(): any {
    return new Promise<any>((resolve, reject) => {
      const endpoint =  appConfig.GET_CONTACT_FORM;
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
  public getCareers(): any {
    return new Promise<any>((resolve, reject) => {
      const endpoint =  appConfig.CAREERS;
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
  public getOfferingsViewer(): any {
    return new Promise<any>((resolve, reject) => {
      const endpoint =  appConfig.OFFERINGS_VIEWER;
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
  
  public getRecommendationsByTag(type: string, tagName: any): any {
    return new Promise<any>((resolve, reject) => {
      let endpoint =  appConfig.RECOMMENDATION_BY_TAG + type ;
//      +appConfig.RECOMMENDATION_BY_TAG_FILTER ;
      tagName.forEach((tag:any,index:any) => {     
           
        if(index=0)
          endpoint = endpoint + "&filters[$or]["+index+"][Tags][Name][$eq]"+tag
        else
          endpoint = endpoint + "&filters[$or]["+index+"][Tags][Name][$eq]="+tag;            
      }); 
      
 //     tagName;
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
