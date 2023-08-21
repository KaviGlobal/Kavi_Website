import { Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { HomeService } from "../home/home.service";
import { cloneDeep } from 'lodash';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import {  HostListener} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import appConfig from '../../../assets/config/appconfig.json';
import { EmailClient} from '@azure/communication-email';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment.prod';
import { RightMenuService } from 'src/app/views/right-menu/right-menu.service';
// declare const google: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  // HostListener('window:scroll')
})

export class HomeComponent implements OnInit {

  public homeData: any = [];
  public clientImages: any = [];
  public hyperlinkText: any = "Read More";
  public layoutType: any = "topImage-layout";
  public backgroundImg: any;
  public title: any;
  public isDataLoaded: boolean = false;
  public partnerImg: any;
  public validateStatus: boolean = false;
  public validateMessage: String = '';
  zoom: number = 16;
  lat: number = 42.135230;
  lng: number = -88.133640;
  public firstNamevalue: any = "";
  public lastNamevalue: any = "";
  public emailvalue: any = "";
  public messagevalue: any = "";
  public phonevalue: any = ""
  public emailFormName :any;
  public modalOptions:NgbModalOptions;
  public closeResult: string = '';
  public imageUrl:string='';
  demoSection = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    message:new FormControl('')
  });
  constructor(
    private activatedRoute: ActivatedRoute,
    public commonService: CommonService,
    private homeService: HomeService,
    public modalService: NgbModal,
    public rightMenuService: RightMenuService,
    @Inject(DOCUMENT) private document: Document
    ) {this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop',
      size: 'xl',
      centered: true,
      windowClass: 'dark-modal'
    } }

  ngOnInit(): void {
    this.imageUrl = environment.apiDetails.apiImgUrl;
    let routeConfig: any = this.activatedRoute.routeConfig;
    this.commonService.activeMenuName = cloneDeep(routeConfig.path);
    this.getHomePageData();
    this.commonService.pageScrollToTop();
  }

  ngOnDestroy(): void {
    this.document.body.classList.remove('home-page');
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {

      if (document.documentElement.scrollTop > document.getElementById('achievements_section')!.offsetTop - 400) {
        document.getElementById('achievements_section_count')!.classList.add("fade-down-animate");
        // setTimeout(() => {  document.getElementById('achievements_section_count')!.classList.add("fade-down-animate"); }, 500);
        // let counts = setInterval(updated);
        // let upto = 0;
        // function updated() {

        //     let count = document.getElementById("counter");
        //     count!.innerHTML = String('$'+ ++upto +' million');
        //     if (upto === 500) {
        //         clearInterval(counts);
        //     }
        // }
      } else {
        // document.getElementById('achievements_section_desc')!.classList.remove("fade-down-animate");
        // document.getElementById('achievements_section_count')!.classList.remove("fade-down-animate");
      }

      if (document.documentElement.scrollTop > document.getElementById('analytics_section')!.offsetTop - 600) {
        document.getElementById('analytics_section')!.classList.add("fade-up-animate");
      } else {
        // document.getElementById('analytics_section')!.classList.remove("fade-up-animate");
      }

      if (document.documentElement.scrollTop > document.getElementById('success_story')!.offsetTop - 500) {
        document.getElementById('success_story')!.classList.add("fade-up-animate");
      } else {
        // document.getElementById('success_story')!.classList.remove("fade-up-animate");
      }

      if (document.documentElement.scrollTop > document.getElementById('sssk_section')!.offsetTop - 500) {
        document.getElementById('sssk_section')!.classList.add("fade-up-animate");
      }

      if (document.documentElement.scrollTop > document.getElementById('blog_section')!.offsetTop - 500) {
        document.getElementById('blog_section')!.classList.add("fade-up-animate");
      } else {
        // document.getElementById('blog_section')!.classList.remove("fade-up-animate");
      }

      if (document.documentElement.scrollTop > document.getElementById('news_cont')!.offsetTop - 500) {
        document.getElementById('news_cont')!.classList.add("fade-up-animate");
      } else {
        // document.getElementById('news_cont')!.classList.remove("fade-up-animate");
      } 

      if (document.documentElement.scrollTop > document.getElementById('clients_section')!.offsetTop - 500) {
        document.getElementById('clients_section')!.classList.add("fade-up-animate");
      } else {
        // document.getElementById('clients_section')!.classList.remove("fade-up-animate");
      } 

      if (document.documentElement.scrollTop > document.getElementById('clients_carousel')!.offsetTop - 500) {
        document.getElementById('clients_carousel')!.classList.add("fade-up-animate");
      } else {
        // document.getElementById('clients_carousel')!.classList.remove("fade-up-animate");
      } 
  }

 public sendDemoRequest(){
  console.log("demoSection",this.demoSection);
  if(!this.demoSection.value.firstName || !this.demoSection.value.lastName || !this.demoSection.value.email){
    //error display
    this.validateStatus = false;
    this.validateMessage = "Please fill the required fields";   
  }
  else{
    //success call api
    this.validateStatus = true;
    this.sendEmail(this.demoSection);
    this.validateMessage = "Thank you for contacting us. Our team will get in touch with you shortly.";
  }
 
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
 open(content:any,fileUrl:any,fileName:any,fileExtention:any,formName:any) {
  this.emailFormName = formName;
  this.modalService.open(content, this.modalOptions).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {     
    this.closeResult = `Dismissed ${
      this.getDismissReason(reason)
    }`;
  });
}
public onClose() {
  if(this.modalService.hasOpenModals())
  this.modalService.dismissAll();  
  this.modalService.dismissAll();    
}
  public clearForm(formName:any){
//  console.log("jjjj",formName);
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
 sendEmail(contactForm:any){ 
  let contactMessage = "";
  if(contactForm.value.message)
    contactMessage = "Message:"+contactForm.value.message;
    let message = {    
      senderAddress: appConfig.EMAIL_SENDER_ADDRESS,
      content:{
        subject: "Consultation Request from Home Page",
        html:"<html><body> The user "+contactForm.value.firstName+" has requested a 30-minute consultation from the home page. Kindly contact the user with the below details.<br/>First Name : "+contactForm.value.firstName+"<br/>Last Name : "+contactForm.value.lastName+"<br/>Email : "+contactForm.value.email+"<br/>Phone : "+contactForm.value.phone+"<br/>"+contactMessage+"</br></body></html>"
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
    // let emailContent = new HtmlEmal
     console.log("message",message);
     emailClient.beginSend(message); 
     let contactDetails = {
      /*  "data": 
        {
            "Email": email
        }   */ 
        "emailid": contactForm.value.email,
        "firstname": contactForm.value.firstName,
        "lastname": contactForm.value.lastName,
        "phone": contactForm.value.phone,
        "message": contactForm.value.message,
        "page":'HomePage',
        "pagedetails":''
      }
     this.rightMenuService.sendContactDetailsToDb(contactDetails).then((response: any) => {
//      console.log("hhhhhh",contactForm,response);
     });
 }
  public getHomePageData() {    
    this.homeService.getHomeData().then((response: any) => {
      if (response.data) {
        this.homeData = response.data;
        this.commonService.menuData.forEach((items: any) => {
          if(items.RightMenu){
            this.homeData.rightmenu = [];
            for (let index = 0; index < items.RightMenu.length; index++) {
              this.homeData.rightmenu.push(items.RightMenu[index]);
            }
          }
        });
        this.title = this.homeData.attributes.HeroHeader[0].Title;
        this.backgroundImg = this.homeData.attributes.HeroHeader[0].SliderMedia.Media.data.attributes.url;
        this.partnerImg = this.homeData.attributes.HeroHeader;      
        this.getClientImages();
      }
      this.document.body.classList.add('home-page');
      var header = this.document.getElementById("header_block");
      if(header != null){
        header.classList.remove('our_page');
      }
      this.isDataLoaded = true;
    });
  }

  getClientImages() {
    let temp: any = [];
    let items: any = [];
    for (let index = 0; index < this.homeData.attributes.OurClientImages.length; index++) {     
      if (this.homeData.attributes.OurClientImages[index].Order % 5 === 0) {
      //  console.log("index",index,this.homeData.attributes.OurClientImages,this.homeData.attributes.OurClientImages[index].Order);
        items.push(this.homeData.attributes.OurClientImages[index]);
        temp.push(items);
        items = [];
      }
      else {
        items.push(this.homeData.attributes.OurClientImages[index]);
      }
    }
    this.clientImages = temp;
   // console.log("this.clientImages",this.clientImages);
  }

  clickedMarker(label: string, index: number) {
    // console.log(`clicked the marker: ${label || index}`);
  }

  mapClicked($event: any) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: false
    });
  }

  public makeMenuActive(menuItem?: any) {
    console.log("plp", menuItem);
    if (menuItem) {
      
      this.commonService.activeMenuName = menuItem?.attributes?.Parameter?.type;  
      this.commonService.activeMenuData =  menuItem;
      setTimeout(() => {
        this.commonService.routeChangeSubscription.next(true);        
      }, 100);
    }
  }

  markerDragEnd(m: marker | undefined, $event: any) {
    // console.log('dragEnd', m, $event);
  }

  markers: marker[] = [
    {
      lat: 42.135230,
      lng: -88.133640,
      label: '',
      draggable: false
    }
  ];

}
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
