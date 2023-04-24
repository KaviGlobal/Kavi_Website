import { Component, OnInit,Output,Input,Pipe, PipeTransform } from '@angular/core';
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
@Component({
  selector: 'app-right-menu',
  templateUrl: './right-menu.component.html',
  styleUrls: ['./right-menu.component.scss'],
})

export class RightMenuComponent implements OnInit  {
  public routePath: any = '';  
  public activeMenuItem: any = {};
  public pageData: any = [];  
  public rightPageData: any =[];
  public isDataLoaded: boolean = false;
  
  public isOfferingsLoaded: boolean = false; 
  public isAboutUs: boolean = false; 
  public isContactUs: boolean = false;
  public isUserForm: boolean = false;
  public isPublications: boolean = false;  
  public routeChangeSubscription: Subscription | undefined;
  private getMenuItem: Subscription | undefined;
  public  offeringsFullContent: any = [];
  public recommendationMetaData: any = [];
  public recommendationData: any = [];
  public isRecommendationDisplay : any = [];
  public pageType: any = '';
  public pageDetailsName: any = '';
  public isPersonal: boolean = false;
  public isPolicy: boolean = false;
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
    private _location: Location
  ) {    
  }
 
  ngOnInit(): void {
    this.pageType = cloneDeep(this.activatedRoute.snapshot.paramMap.get('pageType'));
    this.pageDetailsName = cloneDeep(this.activatedRoute.snapshot.paramMap.get('id')); 
    let routeConfig: any = this.activatedRoute.routeConfig;
    this.commonService.activeMenuName = cloneDeep(routeConfig.path);   
 //   console.log("ctrl is here",this.pageDetailsName,this.routePath);
    if(this.pageDetailsName && this.pageDetailsName.includes("SearchTag")){
      this.commonService.activeMenuName = (this.pageDetailsName).split('=')[1];
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
 callTag(searchText:any){
//  console.log("search",searchText);
    this.commonService.activeMenuName = searchText;
    this.routePath = this.commonService.activeMenuName;
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
    console.log("xxxxx",this.userForm.value,this.userForm.value.role,this.userForm.value.tags);
    let tag=this.userForm.value.tags;
    this.commonService.activeMenuName = '/SearchTag='+tag;
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
        console.log("success",item.Required,this.contactForm.value[item.Label].length,item.Type,item.Label);
      }
    });
    if(this.validateMessage != 'Error'){
      console.log("item",this.contactForm.value);
        this.validateMessage = 'Success' ;
        this.rightMenuService.submitContactForm(this.contactForm.value).then((response: any) => {
          
          this.formSendMessage = 'The details has been Submitted. We will contact you shortly'
        });
    }
    else{
      this.formSendMessage = 'Please enter the required fields ';
    }
    this.isDataLoaded = false; 
    this.isOfferingsLoaded = false;
   }
   
  loadPageData() {
    this.routePath = cloneDeep(this.activatedRoute.snapshot.paramMap.get('id'));    
    this.commonService.pageScrollToTop();    
  /*  if(this.routePath == 'analytics'){      
      this.rightMenuService.getAnalyticsData().then((response: any) => {
        if (response.data && response.data.length > 0) {
          this.pageData = response.data;   
          this.isDataLoaded = true;          
        }
        this.routePath='';    
      });
    }*/
//    console.log("routePath",this.routePath,this.commonService.activeMenuName);
     if(this.commonService.activeMenuName.includes("SearchTag")){
      this.rightMenuService.findTag((this.commonService.activeMenuName).split('=')[1]).then((response: any) => {
      if(response.data.length > 0){
        this.searchTag = true;
        this.pageData = response.data;
        this.isDataLoaded = true;
        this.isUserForm = false;
        this.routePath='';
        console.log("routePath123",  this.searchTag ,this.isDataLoaded);
      }
      else{
        this.isDataLoaded = false;
        this.searchTag = false;   
        console.log("location",this._location.historyGo(-1));
      }       
    })
    
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
      this.isOfferingsLoaded = false;
      this.isPublications = false;
      this.pageData = [];
      this.offeringsFullContent = []; 
      /*
      console.log("this.routePath", this.routePath,this.activatedRoute.snapshot.paramMap.get('id'),
      this.activeMenuItem,this.activeMenuItem.ContentLink,this.activeMenuItem.OfferingType,
      !this.activeMenuItem.OfferingType);    
      */
      if (this.routePath == 'UserForm'){
        this.isUserForm = true;  
        this.isDataLoaded = false;  
        this.rightMenuService.getTagList().then((response: any) => {
                      console.log("response",response.data);
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
      else if(this.routePath.includes("SearchTag")){
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
        
      }
      else if (this.activeMenuItem && this.activeMenuItem.ContentLink && 
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
        else{          
          this.rightMenuService.getRightMenuPageData(this.activeMenuItem.ContentLink).then((response: any) => {
            if (response.data && response.data.length > 0) {
              this.pageData = response.data;   
              let tags: any = [];
              this.pageData.forEach((item: any) => {
                if (item.attributes && item.attributes.Tags && item.attributes.Tags.data && item.attributes.Tags.data.length > 0) {
                  tags.push(item);
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
            this.rightPageData.push(this.pageData);          
          });   
        } 
         
      }      
      else if (this.activeMenuItem && this.activeMenuItem.ContentLink && 
        this.activeMenuItem.OfferingType){ 
//        console.log("this.activeMenuItem.Name",this.activeMenuItem.Name,this.activeMenuItem) ; 
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
          this.getRecommendationsByTag(tagName);          
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
    }     
  }
    else {
      this.router.navigate(['']);
    }
  }

  getRecommendationsByTag(tagName: any) {     
    this.rightMenuService.getOfferingsViewer().then((viewerResp: any) => {     
      if (viewerResp && viewerResp.data && viewerResp.data.attributes && viewerResp.data.attributes.Posts) {
        // 'data science'
        this.recommendationMetaData = cloneDeep(viewerResp.data.attributes.Posts);       
        //this.pageType, tagName
        this.recommendationData=[];
        this.isRecommendationDisplay = [];
        let titleDisplay :any= {};
        this.recommendationMetaData.forEach((typeFilter: any) => {         
          this.rightMenuService.getRecommendationsByTag(typeFilter.TypeFilter,tagName).then((response: any) => {
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
