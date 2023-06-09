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


  public getRightMenuPageData(menuType: string, parameter: string): any {
    return new Promise<any>((resolve, reject) => {
      const endpoint =  '/'+menuType+appConfig.VIEWER+parameter;     
      this.apicallService.apiCall('', endpoint, 'get','','').then((resp: any) => {
        if (resp) {
          resolve(resp);
        }
        else {
          resolve(false);
        }
      })
    });
    /*return new Promise<any>((resolve, reject) => {
      this.apicallService.apiCall(apiUrl, '', 'get', '', '').then((resp: any) => {
        if (resp) {
          resolve(resp);
        }
        else {
          resolve(false);
        }
      })
    });*/
  }
  public getAnalyticsData(): any {
    return new Promise<any>((resolve, reject) => {
      const endpoint =  appConfig.GET_ANALYTICS ;
//      console.log("endpoint...",endpoint); 
      this.apicallService.apiCall('', endpoint, 'get','','').then((resp: any) => {
        if (resp) {
          resolve(resp);
        }
        else {
          resolve(false);
        }
      })
    });

  }
  public getTagList(): any {
    return new Promise<any>((resolve, reject) => {
      const endpoint =  appConfig.GET_TAG_LIST ;
//      console.log("endpoint...",endpoint); 
      this.apicallService.apiCall('', endpoint, 'get','','').then((resp: any) => {
        if (resp) {
          resolve(resp);
        }
        else {
          resolve(false);
        }
      })
    });

  }
public getTagListByName(tagName:any,menuName:any): any {
    return new Promise<any>((resolve, reject) => {
      const endpoint =  '/'+menuName+appConfig. GET_TAG_LIST_BY_NAME+tagName;      
      this.apicallService.apiCall('', endpoint, 'get','','').then((resp: any) => {
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
  public getAuthorsPost(name:any,menuName:any):any{
    return new Promise<any>((resolve, reject) => {
      const endpoint = '/'+menuName+ appConfig.GET_AUTHORS_POST + name;
//      console.log("tag",tag); 
      this.apicallService.apiCall('', endpoint, 'get','','').then((resp: any) => {
//        console.log("resp",resp);
        if (resp) {
          resolve(resp);
        }
        else {
          resolve(false);
        }
      })
    });
  }
  public getPeopleViewer():any{   
    return new Promise<any>((resolve, reject) => {
      const endpoint =  appConfig.GET_PEOPLE_VIEWER ;      
      this.apicallService.apiCall('', endpoint, 'get','','').then((resp: any) => {
//        console.log("resp",resp);
        if (resp) {
          resolve(resp);
        }
        else {
          resolve(false);
        }
      })
    });
      
  }
  public getPeople(name:any):any{
    return new Promise<any>((resolve, reject) => {
      const endpoint =  appConfig.GET_PEOPLE + name;
//      console.log("tag",tag); 
      this.apicallService.apiCall('', endpoint, 'get','','').then((resp: any) => {
//        console.log("resp",resp);
        if (resp) {
          resolve(resp);
        }
        else {
          resolve(false);
        }
      })
    });
  }
  public findTag(tag: string): any {
    return new Promise<any>((resolve, reject) => {
      const endpoint =  appConfig.GET_TAG + tag+"&sort=Type";
      console.log("tag",tag, endpoint); 
      this.apicallService.apiCall('', endpoint, 'get','','').then((resp: any) => {
//        console.log("resp",resp);
        if (resp) {
          resolve(resp);
        }
        else {
          resolve(false);
        }
      })
    });
  }
  public getSpeakerList(type:string,authorName:string){
    return new Promise<any>((resolve, reject) => {
      //  const endpoint =  appConfig.RIGHT_MENU_TYPE + type + appConfig.RIGHT_MENU_VIEW_TYPE + blogTitle;
        const endpoint =  '/'+ type + appConfig.GET_SPEAKER_LIST + authorName;
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
  public getAuthorsPresentationsOrPublications(type:string,authorName:string){
    return new Promise<any>((resolve, reject) => {
      //  const endpoint =  appConfig.RIGHT_MENU_TYPE + type + appConfig.RIGHT_MENU_VIEW_TYPE + blogTitle;
        const endpoint =  '/'+ type + appConfig.GET_AUTHORS_PRESENTATIONS_OR_PUBLICATIONS + authorName;
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
  public getDetailsData(type: string, blogTitle: string): any {//console.log(type,blogTitle)
    return new Promise<any>((resolve, reject) => {
    //  const endpoint =  appConfig.RIGHT_MENU_TYPE + type + appConfig.RIGHT_MENU_VIEW_TYPE + blogTitle;
      const endpoint =  '/'+ type + appConfig.RIGHT_MENU_VIEW_TYPE + blogTitle;
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
  public getMetaDataForListViewer(): any{
    return new Promise<any>((resolve, reject) => {
      const endpoint =  appConfig.GET_LIST_VIEWER;
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
  public getViewer(viewer:any): any {
    return new Promise<any>((resolve, reject) => {
      const endpoint =  "/"+viewer+appConfig.VIEWER;
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
  public getRelatedDataByTag(pagetype: any, tagName: any,){
    return new Promise<any>((resolve, reject) => {
      const endpoint =  "/"+pagetype+appConfig.GET_RELATED_TAGS+tagName;      
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
  public getRecommendationsByTag(type: string, tagName: any,menuSlug:any): any {
    return new Promise<any>((resolve, reject) => {
      let endpoint =  "/"+type+appConfig.VIEWER ;
      let tagFilter="";
      tagName.forEach((tag:any,index:any) => { 
          
        if(index == 0)
        tagFilter = tagFilter + "&filters[Tags][Slug][$in]["+index+"]="+tag.attributes.Slug;
        else
        tagFilter = tagFilter + "&filters[Tags][Slug][$in]["+index+"]="+tag.attributes.Slug;
//        console.log("tag",tag.attributes.Slug,index);         
      }); 
//      console.log("tag11",tagFilter);
      endpoint = endpoint+tagFilter+"&filters[Slug][$ne]="+menuSlug;
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
