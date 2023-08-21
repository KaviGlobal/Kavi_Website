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


  public getRightMenuPageData(menuType: string, parameter: string,listCount:number): any {
    return new Promise<any>((resolve, reject) => {
      const endpoint =  '/'+menuType+appConfig.VIEWER+parameter+"&pagination[pageSize]="+listCount;     
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
  public getTagListByName(tagName:any,menuName:any,listCount:number): any {
    return new Promise<any>((resolve, reject) => {
      const endpoint =  '/'+menuName+appConfig. GET_TAG_LIST_BY_NAME+tagName+"&pagination[pageSize]="+listCount;      
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
  public getTagPropertyForTagSlug(slugName: any):any{
    return new Promise<any>((resolve, reject) => {
      const endpoint = appConfig. GET_TAG_PROPERTY_FOR_TAG_SLUG + slugName;      
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
  public sendContactDetailsToDb(contactDetails:any):any{
    return new Promise<any>((resolve, reject) => {
      const endpoint =  appConfig.ADD_CONTACT_FORM_TO_DB ;
        
      this.apicallService.apiCustomCall('', endpoint, 'post',contactDetails,'').then((resp: any) => {
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
 /*     let emailAddress = {
        "data": 
        {
            "Email": email
        }    
      }   */
      this.apicallService.apiCustomCall('', endpoint, 'post',{emailid:email},'').then((resp: any) => {
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
  public getAuthorsPodcast(authorName:string,type:string){
    return new Promise<any>((resolve, reject) => {
      //  const endpoint =  appConfig.RIGHT_MENU_TYPE + type + appConfig.RIGHT_MENU_VIEW_TYPE + blogTitle;
        const endpoint =  '/podcasts' + appConfig.GET_AUTHORS_PODCAST + authorName;
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
 
  public getDetailsData(type: string, blogTitle: string, filter : any): any {
//    console.log(type,blogTitle,filter);
    return new Promise<any>((resolve, reject) => {
    let endpoint = '';
    let filterValue = '';
    if(filter && (type == "pages" || type == "people")){  
      filterValue = '&filters' + filter;
        endpoint =  '/'+ type + appConfig.VIEWER + filterValue;
      } 
    else if(type == "clients" || type == "partners"){
      endpoint =  '/'+ type + appConfig.VIEWER 
     }
      else {
//        filter = '';
//        endpoint =  '/'+ type + appConfig.VIEWER + filter;
        endpoint= '/'+type +appConfig.RIGHT_MENU_VIEW_TYPE + blogTitle;
      }
//      console.log("filter",filter,endpoint);
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
    public getCareersMarkdown(): any {
    return new Promise<any>((resolve, reject) => {
      const endpoint =  appConfig.CAREERS_MARKDOWN;
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
  public getCareersList(): any {
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
  public getRelatedDataByTag(pagetype: any, tagName: any, relatedmax:any){
    return new Promise<any>((resolve, reject) => {
      if(relatedmax != undefined && relatedmax != '' && relatedmax > 0){  
        relatedmax = '&pagination[pageSize]=' + relatedmax;
      } else {
        relatedmax = '';
      }
      const endpoint =  "/"+pagetype+appConfig.GET_RELATED_TAGS+tagName + relatedmax;      
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
  public getPolicyData(){
    return new Promise<any>((resolve, reject) => {
      const endpoint =  appConfig.GET_POLICY_DATA;      
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
  public getAboutUs(){
    return new Promise<any>((resolve, reject) => {
      const endpoint =  appConfig.GET_ABOUT_US;      
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
