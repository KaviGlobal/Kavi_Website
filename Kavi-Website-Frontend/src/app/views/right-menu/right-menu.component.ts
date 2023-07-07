import { Component, OnInit,Output,Input,Pipe, PipeTransform, Inject } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { cloneDeep, indexOf,sortBy } from 'lodash';
import { Subscription } from 'rxjs';
import { RightMenuService } from './right-menu.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CustomPipePipe } from 'src/app/custom-pipe.pipe';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location} from '@angular/common';
import {marked} from 'marked';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-right-menu',
  templateUrl: './right-menu.component.html',
  styleUrls: ['./right-menu.component.scss'],
})

export class RightMenuComponent implements OnInit  {
  public routePath: any = '';  
  public tagName: any = '';  
  public activeMenuItem: any = {};
  public pageData: any = [];  
  public rightPageData: any =[];
  public isDataLoaded: boolean = false;
  public isEmptyDataList: boolean = false;
  public isOfferingsLoaded: boolean = false; 
  public isAboutUs: boolean = false; 
  public isContactUs: boolean = false;
  public isUserForm: boolean = false;
  public isPublications: boolean = false;
  public isLeadership: boolean = false; 
  public routeChangeSubscription: Subscription | undefined;
  private getMenuItem: Subscription | undefined;
  public  offeringsFullContent: any = [];
  public recommendationMetaData: any = [];
  public listMetaData: any = [];
  public recommendationData: any = [];
  public isRecommendationDisplay : any = [];
  public pageType: any = '';
  public SearchTagMenu: any = '';
  public pageDetailsName: any = '';
  public isPersonal: boolean = false;
  public isPolicy: boolean = false;
  public returnToDownload: boolean = false;
 // public terms: any = [];
  public formData:any = [];
  public contactForm = new FormGroup({});
  public userForm = new FormGroup({
    role: new FormControl(),
    tags: new FormControl()    
  });
  public formSendMessage: any = '';
  public validateMessage : any ='';
  public isCareers: boolean = false;
  public searchTag: boolean = false;
  public parsedRichText : any ='';
  @Input() terms:any = [];  
  @Output() searchTagText:any = '';
  
  public masterTagList: any = [];
   constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public commonService: CommonService,
    private rightMenuService: RightMenuService,
    private sanitizer: DomSanitizer,
    public modalService: NgbModal,
    private _location: Location,
    @Inject(DOCUMENT) private document: Document
  ) {    
  }
 
  ngOnInit(): void {    
    this.pageType = cloneDeep(this.activatedRoute.snapshot.paramMap.get('pageType'));
    this.pageDetailsName = cloneDeep(this.activatedRoute.snapshot.paramMap.get('id')); 
    let routeConfig: any = this.activatedRoute.routeConfig;
//    console.log("ctrl is here",this.commonService.activeMenuName, this.pageDetailsName,routeConfig);
    if(routeConfig && !this.pageDetailsName.includes("SearchTag") )
      this.commonService.activeMenuName = cloneDeep(routeConfig.path);
      this.SearchTagMenu ='';  
        /*  else
    this.commonService.activeMenuName =':id'*/
//    console.log("ctrl is here111", this.commonService.activeMenuName,this.pageDetailsName,this.routePath,routeConfig.path);
    if(this.pageDetailsName && this.pageDetailsName.includes("SearchTag")){
//      console.log("this.pageDetailsName",this.pageDetailsName);
  //    this.commonService.activeMenuName = (this.pageDetailsName).split('=')[1];
      this.routePath = this.commonService.activeMenuName;
      this.loadPageData();
    //  this.routePath='';

    }
    else if(this.pageDetailsName == 'analytics'){
      this.routePath = 'analytics';
      this.loadPageData();
    }
    else if(this.pageDetailsName == 'UserForm'){
      this.routePath = 'UserForm';
//      console.log("menu---",this.commonService.getMenuItem);
      this.loadPageData();
     
    } else if (this.pageDetailsName == 'our-leadership-team'){
      this.commonService.menuData[3]?.AboutUs.forEach((items:any,index:number) =>{ 
          if(items.attributes.Slug == this.pageDetailsName){
            this.commonService.activeMenuData = items;
            this.loadPageData();
          }
      });      
    // }
    // else if (this.pageDetailsName == 'blogs' || this.pageDetailsName == 'newslist' ||
    //   this.pageDetailsName == 'success-stories' || this.pageDetailsName == 'podcasts'
    //   || this.pageDetailsName == 'publications' || this.pageDetailsName == 'presentations'){  
    //     this.loadPageData();
    }
    else{       
      this.getMenuItem = this.commonService.getMenuItem.subscribe((menuItem: any) => {   
        this.loadPageData();
        //console.log("getMenuItem",menuItem);
      });
   
      this.routeChangeSubscription = this.commonService.routeChangeSubscription.subscribe((menuItem: any) => {
        this.loadPageData();
        //console.log("routeChangeSubscription",menuItem);
      });    
    }
  }
  ngOnDestroy(): void {
    if (this.routeChangeSubscription) {
      this.routeChangeSubscription.unsubscribe();
    }
    if (this.getMenuItem) {
      this.getMenuItem.unsubscribe();
    }    
}
downloadFile(filePath:any){ 
  this.returnToDownload = true;  
  const modalRef = this.modalService.open(RightMenuComponent, {
    size: 'xl',
    centered: true,
    windowClass: 'dark-modal'   
  });
  modalRef.componentInstance.isContactUs = true;
  this.rightMenuService.getContactForm().then((response: any) => {
    //            console.log("response",response.data,response.data.attributes.Form,response.data.attributes.Form.length);
    if (response.data.attributes.Form) {
      modalRef.componentInstance.formData = response.data.attributes.Form;
      response.data.attributes.Form.forEach((item: any) => {
          modalRef.componentInstance.contactForm.addControl(item.Label,new FormControl(''));
        });
    }  
  }); 
  
}
saveFile(filePath:any){ 
let url = filePath.split('#');
console.log("filePath",url,filePath); 
 var req = new XMLHttpRequest();
            req.open("GET", url[0], true);
            req.responseType = "blob";
            req.onload = function () {
                //Convert the Byte Data to BLOB object.
                var blob = new Blob([req.response], { type: "application/octetstream" });
 
                //Check the Browser type and download the File.
             
                    var url = window.URL || window.webkitURL;
                    let link = url.createObjectURL(blob);
                    var a = document.createElement("a");
                    a.setAttribute("download", 'sample.pdf');
                    a.setAttribute("href", link);
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                
            };
            req.send();
}
 
callTag(searchText:any){
    this.commonService.activeMenuName = this.commonService.activeMenuName;
    this.routePath = searchText;
    this.loadPageData();  
 }
  public getActiveMenu() {    
    if (this.commonService.menuData && this.commonService.menuData.RightMenu && this.commonService.menuData.RightMenu.length > 0) {
      this.commonService.menuData.RightMenu.forEach((item: any) => {
        if (item.Url === this.routePath) {
          this.activeMenuItem = cloneDeep(item);
        }
      })
    }
    if (this.commonService.menuData && this.commonService.menuData.LeftMenu && this.commonService.menuData.LeftMenu.length > 0) {
      this.commonService.menuData.LeftMenu.forEach((item: any) => {
        if(item.offerings.data.length > 0){
          item.offerings.data.forEach((item1: any) => {    
                  
            if (item1.attributes.Label === this.routePath) {
              this.activeMenuItem = cloneDeep(item1.attributes);
            }       
          });
        }
        if(item.aboutKavi.data.length > 0){
          item.aboutKavi.data.forEach((item1: any) => {                  
            if (item1.attributes.Label === this.routePath) {
              this.activeMenuItem = cloneDeep(item1.attributes);
            }       
          });  
        }
       /* if (item.Url === this.routePath) {
          this.activeMenuItem = cloneDeep(item);
        }*/
      })
    } 
  }
  public getSafeUrl(url:any):SafeResourceUrl {  
    return this.sanitizer.bypassSecurityTrustResourceUrl(url); 
  }
  public onClose() {
    this.isPersonal = false;
    this.isPolicy = false;
    if(this.modalService.hasOpenModals())
    this.modalService.dismissAll();  
  //    this.onClose();
  //  console.log("open",this.modalService.hasOpenModals());
    //componentInstance.isPersonal = true;

    this.modalService.dismissAll();    
  }
  public getTeamDetails(member:any) {
    const modalRef = this.modalService.open(RightMenuComponent, {
    size: 'xl',
    centered: true,
    windowClass: 'dark-modal'   
  });
  
  modalRef.componentInstance.terms = member.FullContent;
  modalRef.componentInstance.isPersonal = true;
}
  submitUserForm(){
//    console.log("xxxxx",this.userForm.value,this.userForm.value.role,this.userForm.value.tags);
    let tag=this.userForm.value.tags;
    this.commonService.activeMenuName = '/SearchTag='+tag;
  //  this.routePath = this.commonService.activeMenuName;
    this.isDataLoaded = false;
    this.loadPageData();
 }
  submitForm() {
  //  console.log("contactForm..",this.contactForm.value,this.contactForm);
    this.formSendMessage = '';
    this.validateMessage = 'Success' ; 
    this.formData.forEach((item: any) => {
      if(item.Required == 'true' && item.Type !='button'){        
        if(this.contactForm.value[item.Label].length == 0)
        this.validateMessage = 'Error' ;  
        if(item.Validate) {
          let emailValidation = new RegExp(item.Validate);
          let valid = emailValidation.test(this.contactForm.value[item.Label]);
          if(!valid)
          this.validateMessage = 'Error' ;   
        }        
  //      console.log("success",item.Required,this.contactForm.value[item.Label].length,item.Type,item.Label);
      }
    });
    if(this.validateMessage != 'Error'){
      console.log("item",this.contactForm.value);
        this.validateMessage = 'Success' ;
        this.rightMenuService.submitContactForm(this.contactForm.value).then((response: any) => {          
          this.formSendMessage = 'The details has been Submitted. We will contact you shortly'
          this.returnToDownload = true;                     
          if(this.modalService.hasOpenModals())
            this.modalService.dismissAll();          
        });
    }
    else{
      this.formSendMessage = 'Please enter the required fields ';
    }
    this.isDataLoaded = false; 
    this.isOfferingsLoaded = false;
   }
   getOfferingData(offering:any){
/*    this.rightMenuService.getOfferingViewer(apiUrl).then((response: any) => { 
      this.listMetaData = response.data.attributes;
//      console.log(" this.listMetaData", this.listMetaData);
    });
    this.rightMenuService.getOfferingData(apiUrl).then((response: any) => { 
      this.listMetaData = response.data.attributes;
//      console.log(" this.listMetaData", this.listMetaData);
    });*/
  
   }
  loadPageData() {
    this.routePath = cloneDeep(this.activatedRoute.snapshot.paramMap.get('id')); 
    this.commonService.pageScrollToTop();
    let tagName = "";
    if(this.commonService.activeMenuName.includes("SearchTag") || this.routePath.includes("SearchTag")){
      let tagName = "";      
      if(this.commonService.activeMenuName.includes("SearchTag"))
        tagName = this.commonService.activeMenuName;
      else
        tagName = (this.routePath).split('=')[1] ;  
//        console.log("ttttt",this.commonService.activeMenuName,this.routePath,tagName);   
        if(this.routePath.includes("SearchTag")){
          let menu =  this.commonService.menuData[1].RightMenu;
          let menuTaglist:any=[];
          let i = 0, j = 0;
          this.rightMenuService.getMetaDataForListViewer().then((response: any) => { 
            this.listMetaData = response.data.attributes;
            for(let item of menu) {
              
                  this.rightMenuService.getTagListByName(tagName,item.attributes.Parameter.type,this.listMetaData.MaxCount).then((response: any) => {
              //      this.rightMenuService.getTagListByName(tagName,item.attributes.Parameter.type,20).then((response: any) => {
                    j++; 
                    if(response.data.length > 0){
                      i++;
                      response.data[0].attributes.menuType = item.attributes.Parameter.type; 
                      response.data[0].attributes.menuLabel = item.attributes.DisplayName;                                 
                      this.searchTag = true;
                      menuTaglist.push(response.data);
                      this.isDataLoaded = true;
                      this.isUserForm = false;
                      this.routePath='';
                      this.SearchTagMenu = ':id';
                      // this.SearchTagMenu = this.commonService.activeMenuName;
        //              menuTaglist = response.data;
                    }
                    if (i == 0 && j == menu.length){
                      this.isDataLoaded = false;
                      this.isEmptyDataList = true;
                      this.isLeadership = true;
                    }
                    this.tagName = tagName;
                    this.pageData = menuTaglist;
                    var element = this.document.getElementById("header_block");
                      if(element != null){
                        element.classList.add('our_page');
                      }
                    //        console.log("call",menuTaglist,this.pageData.length);              
                  });
                 
                }
          });
//          console.log("zzzz",this.listMetaData);
/*          for(let item of menu) {  //console.log("eeee",item.attributes.Parameter.type);       
        //    this.rightMenuService.getTagListByName(tagName,item.attributes.Parameter.type,this.listMetaData.MaxCount).then((response: any) => {
              this.rightMenuService.getTagListByName(tagName,item.attributes.Parameter.type,20).then((response: any) => {
              if(response.data.length > 0){
                response.data[0].attributes.menuType = item.attributes.Parameter.type;             
                this.searchTag = true;
                menuTaglist.push(response.data);
                this.isDataLoaded = true;
                this.isUserForm = false;
                this.routePath='';
                this.SearchTagMenu = this.commonService.activeMenuName;
  //              menuTaglist = response.data;
              }
              this.pageData = menuTaglist;
              //        console.log("call",menuTaglist,this.pageData.length);              
            });
          }*/
          this.getRightPageData();
        } 
/*        if(this.commonService.activeMenuName == ":id"){
          let menu=['blogs','newslist','success-stories', 'podcasts', 'publications' ,'presentations'];
          let menuTaglist:any=[];
          for(let item of menu) {         
            this.rightMenuService.getTagListByName(tagName,item).then((response: any) => {
              if(response.data.length > 0){
                response.data[0].attributes.menuType = item;             
                this.searchTag = true;
                menuTaglist.push(response.data);
                this.isDataLoaded = true;
                this.isUserForm = false;
                this.routePath='';
                this.SearchTagMenu = this.commonService.activeMenuName;
  //              menuTaglist = response.data;
              }
            });
          };
          
          this.pageData = menuTaglist;
  //        console.log("call",menuTaglist,this.pageData.length);
          this.getRightPageData();
        }
        else if(this.commonService.activeMenuName != ":id"){   
            this.rightMenuService.getTagListByName(tagName,this.commonService.activeMenuName).then((response: any) => {
            if(response.data.length > 0){
              this.searchTag = true;        
              this.pageData = response.data;   
              response.data[0].attributes.menuType = this.commonService.activeMenuName;       
              this.isDataLoaded = true;
              this.isUserForm = false;
              this.routePath='';
              this.SearchTagMenu = '';
              this.getRightPageData();
      //        console.log("routePath123",  this.searchTag ,this.isDataLoaded,this.commonService.activeMenuName);
            }
            else{
              this.isDataLoaded = false;
              this.searchTag = false;   
              console.log("location",this._location.historyGo(-1));
            }       
          })
        }    */
    }
    else if (this.routePath && !this.commonService.activeMenuName.includes("SearchTag")){
//      console.log("xxxx123",this.commonService.activeMenuName);
      this.getActiveMenu();     
      this.commonService.activeMenuName = cloneDeep(this.routePath);      
      this.isDataLoaded = false;
      this.isContactUs = false;
      this.isUserForm = false;
      this.isAboutUs = false;
      this.isCareers = false;
      this.isLeadership = false;
      this.isOfferingsLoaded = false;
      this.isPublications = false;
      this.pageData = [];
      this.offeringsFullContent = []; 
      /*
      console.log("this.routePath", this.routePath,this.activatedRoute.snapshot.paramMap.get('id'),
      this.activeMenuItem,this.activeMenuItem.ContentLink,this.activeMenuItem.OfferingType,
      !this.activeMenuItem.OfferingType);    
      */
 //     this.activeMenuItem.ContentLink == null;
//      console.log("hi",this.activeMenuItem.ContentLink,this.activeMenuItem.ContentLink);  
      if (this.routePath == 'UserForm'){
        this.isUserForm = true;  
        this.isDataLoaded = false;  
        this.rightMenuService.getTagList().then((response: any) => {
//                      console.log("response",response.data);
          this.masterTagList = response.data;
        });      
        //https://kavi-strapi-app.azurewebsites.net/api/tags?populate=deep,20
    }
      if (this.routePath == 'ContactUs'){
          this.isContactUs = true;
          this.isUserForm = false;
          this.rightMenuService.getContactForm().then((response: any) => {
//            console.log("response",response.data,response.data.attributes.Form,response.data.attributes.Form.length);
            if (response.data.attributes.Form) {
                this.formData = response.data.attributes.Form;
                this.formData.forEach((item: any) => {
                this.contactForm.addControl(item.Label,new FormControl(''));
                });
            }
          });
      } 
      else if (this.routePath == 'Careers'){
        this.isCareers = true;
        this.isUserForm = false;
        this.rightMenuService.getCareers().then((response: any) => {         
          if (response.data[0].attributes) {
            this.offeringsFullContent = response.data[0].attributes.FullContent;  
            console.log("xxxx55555",this.routePath,this.isCareers,this.isAboutUs,
            this.isDataLoaded,this.isOfferingsLoaded, this.getMenuItem  );  
       
 //           this.routePath='';           
          }
        });
      } 
/*      else if(this.routePath.includes("SearchTag")){
          this.rightMenuService.findTag((this.routePath).split('=')[1]).then((response: any) => {
          if(response.data.length > 0){
            this.searchTag = true;
            this.pageData = response.data;
            this.isDataLoaded = true;
            this.routePath='';
          }
          else{
  //          this.searchTag = false
            this.isDataLoaded = false;
            this.searchTag = false;   
            console.log("location",this._location.historyGo(-1));
          }       
        })
        
      }*/

      else if (this.routePath == 'blogs' || this.routePath == 'newslist' ||
      this.routePath == 'success-stories' || this.routePath == 'podcasts'
      || this.routePath == 'publications' || this.routePath == 'presentations'){        
        this.rightPageData = [];  
        let menu =  this.commonService.menuData[1].RightMenu;
/*        let menuTaglist:any=[];
        for(let item of menu) {  //console.log("eeee",item.attributes.Parameter.type);       
          this.rightMenuService.getTagListByName(tagName,item.attributes.Parameter.type)*/
        this.rightMenuService.getMetaDataForListViewer().then((response: any) => { 
          this.listMetaData = response.data.attributes;
          let key, parameter = '';
          for(let item of menu) {
            if(item.attributes?.Parameter?.type == this.routePath){
              for(let i = 0 ; i < Object.keys(item.attributes?.Parameter?.parameter).length; i++){
                key = Object.keys(item.attributes?.Parameter?.parameter)[i]
                if(item.attributes?.Parameter?.parameter[key] != ''){
                  parameter = parameter.concat("&", key.concat("=", item.attributes?.Parameter?.parameter[key]));
                  }
              }
            }
          }
         this.rightMenuService.getRightMenuPageData(this.routePath, parameter,this.listMetaData.MaxCount).then((response: any) => {
            if (response.data && response.data.length > 0) {
              this.pageData = response.data;
              //commenting this for the UI to test all the content
/*              response.data.forEach((item:any,index:number) =>{
                if(index < this.listMetaData.MaxCount ){
                  this.pageData.push(item)
                }               
              });*/
            }
//              console.log("tags",tags);
            this.isDataLoaded = true;          
       
          });
        });
        this.getRightPageData()

      } else if (this.routePath == 'our-leadership-team'){
        this.rightMenuService.getDetailsData(this.commonService.activeMenuData?.attributes?.Parameter?.type, this.pageDetailsName, this.commonService.activeMenuData?.attributes?.Parameter?.parameter?.filter).then((response: any) => {
          if (response.data && response.data.length > 0) {
            var sort = sortBy(response.data, ["id"]);
            this.pageData = sort;
            this.isLeadership = true;
            this.isAboutUs = true;
          }
        })
      } else if (this.activeMenuItem && this.activeMenuItem.ContentLink && 
        !this.activeMenuItem.OfferingType) {        
        if(this.activeMenuItem.ContentLink == "null" && this.activeMenuItem.leadershipTeams.data.length == 0){        
            this.offeringsFullContent = this.activeMenuItem.FullContent;           
            this.isAboutUs = true;
          }    
        else if(this.activeMenuItem.ContentLink == "null" && 
        this.activeMenuItem.leadershipTeams.data.length > 0){             
        var sort = sortBy(this.activeMenuItem.leadershipTeams.data, ["id"]);       
  //console.log("1111",this.activeMenuItem.leadershipTeams.data.length,this.activeMenuItem.FullContent)  ;       
          this.pageData = sort;
          this.isAboutUs = true;        
        }  
               
        else{    console.log("xxxx",this.activeMenuItem.ContentLink);
        let menu =  this.commonService.menuData[1].RightMenu;
          let key, parameter = '';
          for(let item of menu) {
            if(item.attributes?.Parameter?.type == this.routePath){
              for(let i = 0 ; i < Object.keys(item.attributes?.Parameter?.parameter).length; i++){
                key = Object.keys(item.attributes?.Parameter?.parameter)[i]
                if(item.attributes?.Parameter?.parameter[key] != ''){
                  parameter = parameter.concat("&", key.concat("=", item.attributes?.Parameter?.parameter[key]))
                  }
              }
            }
          }  
          this.rightMenuService.getRightMenuPageData(this.activeMenuItem.ContentLink, parameter,this.listMetaData.MaxCount).then((response: any) => {
            if (response.data && response.data.length > 0) {
              this.pageData = response.data;              
              let tags: any = [];
              this.pageData.forEach((item: any) => {
                if (item.attributes && item.attributes.Tags && item.attributes.Tags.data && item.attributes.Tags.data.length > 0) {
        //          tags.push(item);
                    tags.push(item.attributes.Tags.data);
      //            console.log("yyy",item.attributes.Tags,item.attributes.Tags.data,item.attributes.Tags.data);//this.activeMenuItem.ContentLink);
                }
                if(item.attributes.ShortContent == null &&
                  item.attributes.ShortContent == null &&
                  item.attributes.Media.data !=null)
                  this.isPublications = true;
              });             
            } 
//            console.log("pageData",this.pageData);
            this.isDataLoaded = true;  
            this.rightPageData = [];  
            if(!this.isPublications )        
            this.rightPageData.push(this.pageData);          
          });   
        } 
         
      }      
      else if (this.activeMenuItem && this.activeMenuItem.ContentLink && 
        this.activeMenuItem.OfferingType){         
        this.rightMenuService.getOfferingsData(this.pageDetailsName,this.activeMenuItem.Label).then((response: any) => {
          if (response.data && response.data.length > 0) {            
          this.pageData = response.data;
          let tagName: any = [];
          this.pageData.forEach((item: any) => {
            if (item.attributes && item.attributes.FullContent)
              this.offeringsFullContent = item.attributes.FullContent;     
             
            if (item.attributes && item.attributes.Tags && item.attributes.Tags.data && item.attributes.Tags.data.length > 0) {
              item.attributes.Tags.data.forEach((tag: any, index: number) => {                
                tagName.push(tag.attributes.Name);
              });
            }                       
          });
          this.getRecommendationsByTag(tagName,'slugName');          
          this.isOfferingsLoaded = true;
        }
             
      });      
      }   
    else { 
      this.isOfferingsLoaded = false;
      this.isContactUs = false;
      this.isCareers = false;
      this.isAboutUs = false;
      this.isDataLoaded = true;
      this.isLeadership = false;
    }     
    }
    else {
      this.router.navigate(['']);
    }
  }
  searchAuthor(authorName:any){  
    this.router.navigate(['/people/'+ authorName]);
  }
  getRightPageData(){
    let tags: any = [];
    this.rightPageData = [];
    // this.getMetaDataForListViewer();
    this.rightMenuService.getTagList().then((response: any) => {          //          
      let responseLength = response.data.length;
      let dimension_tag = this.groupBy(response.data, (item:any) => item?.attributes?.tag_dimension.data.attributes.DisplayName);
      this.rightPageData.push(dimension_tag);
    });     
  //  this.rightPageData.push(tags);
  }
  public groupBy(list:any, keyGetter:any) {
    const map = new Map();
    let keyProperties :any [];
    let groupedData:any=[];
    list.forEach((item:any,index:number) => {
         const key = keyGetter(item);                   
         const collection = map.get(key);         
         if (!collection) {               
             map.set(key, [item]);                      
         }        
         else {            
             collection.push(item);
         }         
    });
    return map;
}
  getMetaDataForListViewer(){    
    this.rightMenuService.getMetaDataForListViewer().then((response: any) => { 
      this.listMetaData = response.data.attributes;
//      console.log(" this.listMetaData", this.listMetaData);
    });
  }
  getRecommendationsByTag(tagName: any,slugName:any) {     
    this.rightMenuService.getOfferingsViewer().then((viewerResp: any) => {     
      if (viewerResp && viewerResp.data && viewerResp.data.attributes && viewerResp.data.attributes.Posts) {
        // 'data science'
        this.recommendationMetaData = cloneDeep(viewerResp.data.attributes.Posts);       
        //this.pageType, tagName
        this.recommendationData=[];
        this.isRecommendationDisplay = [];
        let titleDisplay :any= {};
        this.recommendationMetaData.forEach((typeFilter: any) => {         
          this.rightMenuService.getRecommendationsByTag(typeFilter.TypeFilter,tagName,'slugName').then((response: any) => {
            this.rightPageData.push(this.recommendationMetaData) ; 
//          console.log("xxxx",response.data.length,typeFilter.TypeFilter);
           
           
            if(response.data.length == 0){
              titleDisplay[typeFilter.TypeFilter] = false;              
//              this.isRecommendationDisplay.push(titleDisplay); 
            }
            if (response.data && response.data.length > 0) {
              titleDisplay[typeFilter.TypeFilter] = true;              
//              this.isRecommendationDisplay.push(titleDisplay); 
               let i=0;
                response.data.forEach((item: any) => {                  
                  if ( i < typeFilter.MaxCount && item.attributes.Type == typeFilter.TypeFilter)  {
                    this.recommendationData.push(item);
                  }
                  i++;
              });         
            } 
            this.isRecommendationDisplay.push(titleDisplay);
          });
        }); 
        titleDisplay = {};
        
      }
    });
  }

}
