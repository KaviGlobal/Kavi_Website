import { Component, OnInit, Input,Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { cloneDeep, indexOf } from 'lodash';
import { Subscription } from 'rxjs';
import { RightMenuService } from './right-menu.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CustomPipePipe } from 'src/app/custom-pipe.pipe';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  public isDataLoaded: boolean = false;
  public isOfferingsLoaded: boolean = false; 
  public isAboutUs: boolean = false; 
  public isContactUs: boolean = false;
  public routeChangeSubscription: Subscription | undefined;
  private getMenuItem: Subscription | undefined;
  public  offeringsFullContent: any = [];
  public recommendationMetaData: any = [];
  public recommendationData: any = [];
  public pageType: any = '';
  public pageDetailsName: any = '';
  public isPolicy: boolean = false;
  public terms: any = [];
  public formData:any = [];
  public contactForm = new FormGroup({});
  public formSendMessage: any = '';
  public validateMessage : any ='';
  public isCareers: boolean = false;
  public parsedRichText : any ='';
   constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public commonService: CommonService,
    private rightMenuService: RightMenuService,
    private sanitizer: DomSanitizer,
    public modalService: NgbModal
  ) {    
  }
 
  ngOnInit(): void {
    this.pageType = cloneDeep(this.activatedRoute.snapshot.paramMap.get('pageType'));
    this.pageDetailsName = cloneDeep(this.activatedRoute.snapshot.paramMap.get('id'));      
    this.getMenuItem = this.commonService.getMenuItem.subscribe((menuItem: any) => {      
      this.loadPageData();
    });    
    
    this.routeChangeSubscription = this.commonService.routeChangeSubscription.subscribe((menuItem: any) => {
      this.loadPageData();
    });
  }
  ngOnDestroy(): void {
    if (this.routeChangeSubscription) {
      this.routeChangeSubscription.unsubscribe();
    }
    if (this.getMenuItem) {
      this.getMenuItem.unsubscribe();
    }    
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
    this.modalService.dismissAll();
  }
  public getTeamDetails(member:any) {
    console.log("member",member);
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
   
   public parseRichText(fullContent : any){
    let parsedRichText = marked.parse(fullContent); 
  //  console.log("parsedRichText1....",parsedRichText); 
  //  this.parsedRichText = parsedRichText1;
    return parsedRichText;
   }

  loadPageData() {
    this.routePath = cloneDeep(this.activatedRoute.snapshot.paramMap.get('id'));    
    this.commonService.pageScrollToTop();    
    if (this.routePath) {
      this.getActiveMenu();
      this.commonService.activeMenuName = cloneDeep(this.routePath);    
      this.isDataLoaded = false;
      this.isContactUs = false;
      this.isAboutUs = false;
      this.isCareers = false;
      this.isOfferingsLoaded = false;
      this.pageData = [];
      this.offeringsFullContent = [];      
      if (this.routePath == 'ContactUs'){
          this.isContactUs = true;
          this.rightMenuService.getContactForm().then((response: any) => {
//            console.log("response",response.data,response.data.attributes.Form,response.data.attributes.Form.length);
            if (response.data.attributes.Form) {
                this.formData = response.data.attributes.Form;
                this.formData.forEach((item: any) => {
                this.contactForm.addControl(item.Label,new FormControl(''));
                });
              console.log("contactForm",this.contactForm); 
            }
          });
      } 
      else if (this.routePath == 'Careers'){
        this.isCareers = true;
        this.rightMenuService.getCareers().then((response: any) => {         
          if (response.data[0].attributes) {
            this.offeringsFullContent = response.data[0].attributes.FullContent;  
            console.log("xxxx55555",this.routePath,this.isCareers,this.isAboutUs,
            this.isDataLoaded,this.isOfferingsLoaded );  
            this.isCareers = true;            
          }
        });
    } 
      else if (this.activeMenuItem && this.activeMenuItem.ContentLink && 
        !this.activeMenuItem.OfferingType) {          
        if(this.activeMenuItem.ContentLink == "null" && this.activeMenuItem.leadershipTeams.data.length == 0){        
            this.offeringsFullContent = this.activeMenuItem.FullContent;           
            this.isAboutUs = true;
          }    
        else if(this.activeMenuItem.ContentLink == "null" && 
        this.activeMenuItem.leadershipTeams.data.length > 0){        
  //        this.offeringsFullContent = this.activeMenuItem.FullContent; ;
  console.log("1111",this.activeMenuItem.leadershipTeams.data.length,this.activeMenuItem.FullContent)  ;       
          this.pageData = this.activeMenuItem.leadershipTeams.data;    
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

              });
            } 
            this.isDataLoaded = true;         
          });   
        } 
         
      }      
      else if (this.activeMenuItem && this.activeMenuItem.ContentLink && 
        this.activeMenuItem.OfferingType){ 
           
        this.rightMenuService.getOfferingsData(this.pageDetailsName,this.activeMenuItem.Name).then((response: any) => {
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
      //        
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
        this.recommendationMetaData.forEach((typeFilter: any) => {         
          this.rightMenuService.getRecommendationsByTag(typeFilter.TypeFilter,tagName).then((response: any) => {
            if (response.data && response.data.length > 0) {
               let i=0;
                response.data.forEach((item: any) => {                  
                  if ( i < typeFilter.MaxCount && item.attributes.Type == typeFilter.TypeFilter)  {
                    this.recommendationData.push(item);
                  }
                  i++;
              });         
            }            
          });
        });
        
      }
    });
  }

}
