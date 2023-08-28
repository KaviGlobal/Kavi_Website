import { Component, OnInit,Output,Input, Inject } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { RightMenuService } from '../right-menu/right-menu.service';
import { cloneDeep, sortBy } from 'lodash';
import { CommonService } from 'src/app/services/common.service';
import { Subscription } from 'rxjs';
import { CustomPipePipe } from 'src/app/custom-pipe.pipe';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { NgModule } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';
import appConfig from '../../../assets/config/appconfig.json';
import { EmailClient} from '@azure/communication-email';
import { environment } from 'src/environments/environment.prod';
import { Meta } from '@angular/platform-browser';
@Component({
  selector: 'app-right-menu-details',
  templateUrl: './right-menu-details.component.html',
  styleUrls: ['./right-menu-details.component.scss'],
})
export class RightMenuDetailsComponent implements OnInit {

  public rightPageRelatedData: any =[];  
  public rightPageData: any =[];
  public listMetaData:any = [];  
  public pageType: any = '';
  public pageDetailsName: any = '';
  public firstNamevalue: any = "";
  public lastNamevalue: any = "";
  public emailvalue: any = "";
  public messagevalue: any = "";
  public phonevalue: any = ""
  public viewerData:any=[];
  public pageData: any = [];  
  public pageFullContent: any;
  public authors: any;
  public tags:any;
  public publishDate:any;
  public publishedOn:any;
  public broadcastedOn:any;
  public releasedOn:any;
  public presentedOn:any;
  public isDataLoaded: boolean = false;
  public isPageLoaded: boolean = false;
  public isPeople: boolean = false;
  public isClient: boolean = false;
  public isPartner: boolean = false;
  public recommendationMetaData: any;
  public recommendationData: any = [];
  public relatedTagData: any = [];
  public routerEventSubscription: Subscription | undefined;
  public externalLink: any;  
  public newsMedia: any;
  public authorPost: any;
  public partnerValues:any=[];
  public title = 'ng-bootstrap-modal-demo';
  public closeResult: string = '';
  public modalOptions:NgbModalOptions;
  public validateStatus: boolean = false;
  public validateMessage: string = '';
  public downloadFileURL:any;
  public emailFormName :any;
  public imageUrl:string='';
  demoSection = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    message:new FormControl('')
  });
  constructor(
    private meta: Meta,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public commonService: CommonService,
    private rightMenuService: RightMenuService,
    public modalService: NgbModal,
    private sanitizer: DomSanitizer,
    @Inject(DOCUMENT) private document: Document
  ) {this.modalOptions = {
    backdrop:'static',
    backdropClass:'customBackdrop',
    size: 'xl',
    centered: true,
    windowClass: 'dark-modal'
  } }

  ngOnInit(): void {
    this.loadPageData();
    this.routerEventSubscription = this.router.events.subscribe((evt: any) => {
      if ((evt instanceof NavigationEnd)) {
        this.loadPageData();
      }
    });
  }
  ngOnDestroy(): void {
    if (this.routerEventSubscription) {
      this.routerEventSubscription.unsubscribe();
    }
  }
  public loadPageData() {   
      this.pageType = cloneDeep(this.activatedRoute.snapshot.paramMap.get('pageType'));
      this.pageDetailsName = cloneDeep(this.activatedRoute.snapshot.paramMap.get('id'));
      this.clearForm(this.demoSection);
      this.validateMessage = "";
      this.imageUrl = environment.apiDetails.apiImgUrl;      
      if (this.pageType && this.pageDetailsName && !this.pageType.includes("SearchTag")) {
        if(this.pageType != "pages"){
          let menuItemAttributes = this.commonService.menuData[1].RightMenu.filter((element: any) => (element.attributes.Parameter.type == this.pageType));
          if(menuItemAttributes[0]){
            this.commonService.activeMenuData = menuItemAttributes[0];
          }
          if(this.pageType == "clients"){
            this.isClient = true;
            this.isPartner = false;
            this.imageUrl = this.imageUrl+'Our_Clients_c3172330e9.png';
          } else if(this.pageType == "partners"){
            this.isClient = false;
            this.isPartner = true;
            this.imageUrl = this.imageUrl+'Our_Partner_b53404e808.png';
          }
        }
        else if(this.pageType == "pages"){
          let activeMenuAttributes;
          this.commonService.menuData[0]?.LeftMenu.forEach((items:any,index:number) =>{ 
              if(items.attributes.Slug == this.pageDetailsName){
                activeMenuAttributes = items;
              }
          });
          this.commonService.menuData[2]?.IndustryMenu.forEach((items:any,index:number) =>{ 
            items.forEach((item:any,index:number) =>{ 
              if(item.attributes.Slug == this.pageDetailsName){
                activeMenuAttributes = item;
              }
            }) 
          });
          this.commonService.menuData[3]?.AboutUs.forEach((item:any,index:number) =>{ 
              if(item.attributes.Slug == this.pageDetailsName){
                activeMenuAttributes = item;
              }
          });
          this.commonService.menuData[5]?.SolutionsMenu.forEach((item:any,index:number) =>{ 
            if(item.attributes.Slug == this.pageDetailsName){
              activeMenuAttributes = item;
            }
          });
          this.commonService.menuData[6]?.AdvancedAnalyticsMenu.forEach((item:any,index:number) =>{ 
            if(item.attributes.Slug == this.pageDetailsName){
              activeMenuAttributes = item;
            }
          });
          if(activeMenuAttributes){
            this.commonService.activeMenuData = activeMenuAttributes;
          }
        }
        this.commonService.activeMenuName = cloneDeep(this.pageType);
        this.isDataLoaded = false;
        setTimeout(() => { 
          this.pageData = [];          
          this.pageFullContent = '';
          this.authors = [];
          this.recommendationMetaData = [];
          if (this.pageDetailsName && this.pageType != 'people' && this.pageType != 'tag') {
            this.getDetailsData();
          }
          if(this.pageType == 'people'){    
            if(this.pageDetailsName.includes("leadership")) {
              this.getDetailsData();
            } else { 
              this.getAuthorData();
            }
          }
          if(this.pageType == 'clients'){    
            this.getDetailsData();
          }
          else {
            this.isDataLoaded = true;
          }
          this.commonService.pageScrollToTop();
        }, 50);
      }
      

  }
  public getUserInfo(){
  }

  open(content:any,fileUrl:any,fileName:any,fileExtention:any,formName:any) {
    this.downloadFileURL = fileUrl;
    this.emailFormName = formName;
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {     
      this.closeResult = `Dismissed ${
        this.getDismissReason(reason)
      }`;     
        if(this.validateStatus && fileUrl.length > 0){  
          this.downloadFile(fileUrl,fileName,fileExtention,this.emailFormName);
        }
    });
  }
  public sendDemoRequest(){
    if(!this.demoSection.value.firstName || !this.demoSection.value.lastName || !this.demoSection.value.email){
      //error display
      this.validateStatus = false;
      this.validateMessage = "Please fill the required fields";   
    }
    else{
      //success call api
      this.validateStatus = true;
      this.sendEmail(this.demoSection,this.emailFormName);
      this.validateMessage = "Thank you for contacting us. Our team will get in touch with you shortly.";  
      this.onClose(); 
      this.clearForm(this.demoSection);
    }   
  }

  sendContactDetailsToDb(contactDetails:any){
    this.rightMenuService.sendContactDetailsToDb(contactDetails).then((response: any) => {
    });
  }

 sendEmail(contactForm:any,formName:string){   
  let contactMessage = "";
  let htmlContent = "";
  let pageName="";
  let pageType="";
  if(this.pageType != 'pages')
    pageType =  "Page Type:"+ this.pageType.charAt(0).toUpperCase() + this.pageType.slice(1);;
  if(contactForm.value.message)
    contactMessage = "Message:"+contactForm.value.message;
  if(formName == 'Contact Us'){
    formName = formName ;
    pageName= this.pageDetailsName.charAt(0).toUpperCase() + this.pageDetailsName.slice(1);
    htmlContent = "<html><body> The user "+contactForm.value.firstName+" has filled the Contact Us form <br/>First Name : "+contactForm.value.firstName+"<br/>Last Name : "+contactForm.value.lastName+"<br/>Email : "+contactForm.value.email+"<br/>Phone : "+contactForm.value.phone+"<br/>"+contactMessage+"<br/>Page  : "+ pageName +"<br/>"+pageType+"--<br/>This e-mail was sent from a contact form on "+pageName+": "+pageType+"<br/>--</body></html>"
 
  }
  if(formName == 'Download File'){
    formName = formName +" from "+ this.pageDetailsName.charAt(0).toUpperCase() + this.pageDetailsName.slice(1)
    htmlContent = "<html><body> The user "+contactForm.value.firstName+" has downloaded the a file from the URL "+this.downloadFileURL +"<br/>First Name : "+contactForm.value.firstName+"<br/>Last Name : "+contactForm.value.lastName+"<br/>Email : "+contactForm.value.email+"<br/>Phone : "+contactForm.value.phone+"<br/>"+contactMessage+"</br></body></html>"
    
  }
    let message = {    
      senderAddress: appConfig.EMAIL_SENDER_ADDRESS,
      content:{
        subject:formName,
        html:  htmlContent
      }, 
      recipients: {
        to: [
          {
            address: appConfig.CONTACT_FORM_RECIPIENT_ADDRESS,
            displayName: "Customer Name",
          },
        ],
      }
    };
    let emailClient = new EmailClient(appConfig.EMAIL_CONNECTION_STRING);
     emailClient.beginSend(message); 
     let contactDetails = {
        "emailid": this.demoSection.value.email,
        "firstname": this.demoSection.value.firstName,
        "lastname": this.demoSection.value.lastName,
        "phone": this.demoSection.value.phone,
        "message": this.demoSection.value.message,
        "category": this.pageType || this.emailFormName,
        "page":this.pageDetailsName,
      }
    this.sendContactDetailsToDb(contactDetails);
     
 }
 public clearForm(formName:any){
  formName.value.firstName ='';
  formName.value.lastName ='';
  formName.value.email ='';
  formName.value.phone ='';
  formName.value.message ='';
  this.firstNamevalue ="";
  this.lastNamevalue ="";
  this.emailvalue ="";
  this.phonevalue ="";
  this.messagevalue ="";
 }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  public downloadFile(fileUrl:any,fileName:any,fileExtention:any,formName:any){   
    var req = new XMLHttpRequest();
            req.open("GET", fileUrl, true);
            req.responseType = "blob";
            req.onload = function () {
                //Convert the Byte Data to BLOB object.
                var blob = new Blob([req.response], { type: "application/octetstream" }); 
                //Check the Browser type and download the File.
             
                    var url = window.URL || window.webkitURL;
                    let link = url.createObjectURL(blob);
                    var a = document.createElement("a");
                    a.setAttribute("download", fileName+fileExtention);
                    a.setAttribute("href", link);
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                
            };
            req.send();
            this.emailFormName = 'Download File';
  }
  public onClose() {
    this.isPeople = false;
    if(this.modalService.hasOpenModals())
    this.modalService.dismissAll();  
    this.modalService.dismissAll();    
  }
  getAuthorData(){
  this.authorPost = [];
  this.rightMenuService.getPeopleViewer().then((peopleViewerResp: any) => {    
    if (peopleViewerResp.data && peopleViewerResp.data.attributes) {
        if(peopleViewerResp.data.attributes.BlogContribution)   {
          let menuName = peopleViewerResp.data.attributes.BlogContribution.Label.toLowerCase();           
          this.rightMenuService.getAuthorsPost(this.pageDetailsName,menuName).then((response: any) => {  
            let dataObj:any=[];      
            if (response.data && response.data.length > 0) {
              response.data.forEach((item:any,index:number) =>{
                if(index < peopleViewerResp.data.attributes.BlogContribution.MaxCount ){
                  dataObj.push(item)
                }               
              });
           }
            peopleViewerResp.data.attributes.BlogContribution.Data = dataObj;
            peopleViewerResp.data.attributes.BlogContribution.pageType = menuName;           
          });
          this.authorPost.push(peopleViewerResp.data.attributes.BlogContribution);            
        } 
        if(peopleViewerResp.data.attributes.PublicationContribution) {
          let menuName = peopleViewerResp.data.attributes.PublicationContribution.Label.toLowerCase();           
          this.rightMenuService.getAuthorsPost(this.pageDetailsName,menuName).then((response: any) => {  
            let dataObj:any=[];      
            if (response.data && response.data.length > 0) {
              response.data.forEach((item:any,index:number) =>{
                if(index < peopleViewerResp.data.attributes.PublicationContribution.MaxCount ){
                  dataObj.push(item)
                }               
              });
           }
            peopleViewerResp.data.attributes.PublicationContribution.Data = dataObj;
            peopleViewerResp.data.attributes.PublicationContribution.pageType = menuName;
           
          });
          this.authorPost.push(peopleViewerResp.data.attributes.PublicationContribution);        
        }
        if(peopleViewerResp.data.attributes.PresentationContribution){
          let menuName = peopleViewerResp.data.attributes.PresentationContribution.Label.toLowerCase();           
          this.rightMenuService.getAuthorsPost(this.pageDetailsName,menuName).then((response: any) => {  
            let dataObj:any=[];      
            if (response.data && response.data.length > 0) {
              response.data.forEach((item:any,index:number) =>{
                if(index < peopleViewerResp.data.attributes.PresentationContribution.MaxCount ){
                  dataObj.push(item)
                }               
              });
           }
            peopleViewerResp.data.attributes.PresentationContribution.Data = dataObj;
            peopleViewerResp.data.attributes.PresentationContribution.pageType = menuName;
           
          });
          this.authorPost.push(peopleViewerResp.data.attributes.PresentationContribution);
        }
         
        if(peopleViewerResp.data.attributes.PodcastContribution){
          let menuName = peopleViewerResp.data.attributes.PodcastContribution.Label.toLowerCase();           
          this.rightMenuService.getAuthorsPodcast(this.pageDetailsName,menuName).then((response: any) => {  
            let dataObj:any=[];      
            if (response.data && response.data.length > 0) {
              response.data.forEach((item:any,index:number) =>{
                if(index < peopleViewerResp.data.attributes.PodcastContribution.MaxCount ){
                  dataObj.push(item)
                }               
              });
           }
            peopleViewerResp.data.attributes.PodcastContribution.Data = dataObj;
            peopleViewerResp.data.attributes.PodcastContribution.pageType = menuName;
           
          });
          this.authorPost.push(peopleViewerResp.data.attributes.PodcastContribution);
          
        }
    }    
    });
     
    this.rightMenuService.getPeople(this.pageDetailsName).then((response: any) => {
      if (response.data && response.data.length > 0) {
        this.pageData = response.data[0].attributes;
        this.pageFullContent = response.data[0].attributes?.FullContent;        
      }      
      this.isPeople = true;
      this.isDataLoaded = true;
      this.isPageLoaded = true;
    });
     
  }
  getRelatedDataByTag(tagName:any, viewer:any){
    let menu=['success-stories','blogs','newslist', 'publications' ,'presentations','podcasts',];
    let menuTaglist:any=[];
    let relatedMeta:any;
    this.rightPageRelatedData = [];
    
    for(let item of menu) { 
      if(item == 'success-stories'){
        relatedMeta = viewer.RelatedSuccessStories;
      } if(item == 'blogs'){
        relatedMeta = viewer.RelatedBlogs;
      } else if(item == 'newslist'){
        relatedMeta = viewer.RelatedNews;
      } else if(item == 'publications'){
        relatedMeta = viewer.RelatedPublication;
      } else if(item == 'presentations'){
        relatedMeta = viewer.RelatedPresentation;
      } else if(item == 'podcasts'){
        relatedMeta = viewer.RelatedPodcast;
      }
      this.rightMenuService.getRelatedDataByTag(item,tagName,relatedMeta?.MaxCount).then((response: any) => {
        if(response.data.length > 0){
           if(item == 'success-stories'){
            relatedMeta = viewer.RelatedSuccessStories;
          } else if(item == 'blogs'){
            relatedMeta = viewer.RelatedBlogs;
          } else if(item == 'newslist'){
            relatedMeta = viewer.RelatedNews;
          } else if(item == 'publications'){
            relatedMeta = viewer.RelatedPublication;
          } else if(item == 'presentations'){
            relatedMeta = viewer.RelatedPresentation;
          } else if(item == 'podcasts'){
            relatedMeta = viewer.RelatedPodcast;
          } 
          response.data[0].attributes.menuType = item;
          response.data[0].attributes.relatedMeta = relatedMeta;
          menuTaglist[item] = (response.data);
        }
      })
    }
    this.rightPageRelatedData = menuTaglist;
  }
  get partnerKeys(){
    this.partnerValues = Array.from(this.pageData[0].values());
    return Array.from(this.pageData[0].keys());
  }
  getDetailsData() { 
    let filter :any=[];
    if(this.commonService.activeMenuName == "pages" && this.commonService.activeMenuData?.attributes?.Viewer){
        filter = this.commonService.activeMenuData?.attributes?.Parameter?.parameter?.filter;
        this.getViewer(this.commonService.activeMenuData?.attributes?.Viewer);
      }    
    if(this.pageType != "pages" && 
      (this.commonService.activeMenuName == "offering-viewer" || this.commonService.activeMenuName == "page-viewer")){
      filter = null;
    }
    if(this.pageType == "clients" || this.pageType =="partners"){
      filter = null;
    }
   this.rightMenuService.getDetailsData(this.pageType, this.pageDetailsName, filter).then((response: any) => {
      if (response.data && response.data.length > 0) {
        this.isPageLoaded = true;
        this.isPartner = false;
        this.isClient = false;
        this.pageData = response.data;        
        this.isPeople = false;
        this.pageFullContent = response.data[0].attributes?.FullContent;
        this.authors = response.data[0].attributes?.Authors;
        this.tags = response.data[0].attributes?.Tags;
        this.publishDate = response.data[0].attributes?.publishedAt;
        this.externalLink = response.data[0].attributes?.ExternalLink;
        this.newsMedia = response.data[0].attributes?.NewsMedia;
        if(response.data[0].attributes?.PublishedOn){
          this.publishedOn = response.data[0].attributes?.PublishedOn;
        }
        if(response.data[0].attributes?.ReleasedOn){
          this.releasedOn = response.data[0].attributes?.ReleasedOn;
        }
        if(response.data[0].attributes?.PresentedOn){
          this.presentedOn = response.data[0].attributes?.PresentedOn;
        }
        if(response.data[0].attributes?.BroadcastedOn){
          this.broadcastedOn = response.data[0].attributes?.BroadcastedOn;
        }
        let pageData: any = cloneDeep(response.data[0]);
        if (pageData.attributes && pageData.attributes.Tags && pageData.attributes.Tags.data && pageData.attributes.Tags.data.length > 0) {
          let tagName: any = [];   
          tagName = pageData.attributes.Tags.data ; 
          if (tagName) {           
            this.getRecommendations(tagName,response.data[0].attributes?.Slug);
          }
        }
        if(this.pageType == 'podcasts'){         
          this.rightMenuService.getSpeakerList(this.pageType,  pageData[0]?.attributes?.Speakers?.data[0].attributes.Slug).then((response: any) => {
          this.authorPost = response.data;
          });
        }
        if(this.pageType == 'clients'){
          this.isClient = true;
          this.isPartner = false;
          this.isPageLoaded = true; 
          var element = this.document.getElementById("header_block");
          if(element != null){
            element.classList.add('our_page');
          }
        }
        if(this.pageType == 'partners'){
          var partner_sort = sortBy(response.data, ["id"]); 
          let partner_group = this.groupBy(partner_sort, (item:any) => item?.attributes?.Type);
          this.pageData = [];
          this.pageData.push(partner_group);
          this.isPartner = true;
          this.isClient = false;
          this.isPageLoaded = true; 
          var element = this.document.getElementById("header_block");
          if(element != null){
            element.classList.add('our_page');
          }
          console.log("this.pageData",this.pageData);
        }
        if(this.pageType == 'publications' || this.pageType == 'presentations'){
         this.rightMenuService.getAuthorsPresentationsOrPublications(this.pageType, this.authors.data[0].attributes.Slug).then((response: any) => {
            this.authorPost = response.data;
          });
         } 
      }
      this.getMetaDataForListViewer();
      this.isDataLoaded = true;
    });
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
    });
  }
  getViewer(viewerName:any) {
    this.viewerData = [];
    if(viewerName){
      this.rightMenuService.getViewer(viewerName).then((viewerResp: any) => {
        this.viewerData = viewerResp.data.attributes;
        this.rightPageRelatedData = [];
        if(this.pageType == "pages"){
          this.getRelatedDataByTag(this.pageDetailsName, this.viewerData);
        }
      });
    }
  }
  getRecommendations(tagName: any,menuSlug:any) {
    this.recommendationData = [];
    this.rightMenuService.getRecommendationsByTag(this.pageType, tagName,menuSlug).then((response: any) => {
      if (response.data && response.data.length > 0) {
       this.recommendationData=response.data;
      }      
    });  
    this.recommendationMetaData =this.viewerData.Recommendations;
  }
}
