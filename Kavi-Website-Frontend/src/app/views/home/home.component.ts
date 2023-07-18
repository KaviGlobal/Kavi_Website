import { Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { HomeService } from "../home/home.service";
import { cloneDeep } from 'lodash';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import {  HostListener} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  ngOnInit(): void {
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

      } else {
        // document.getElementById('achievements_section_desc')!.classList.remove("fade-down-animate");
        document.getElementById('achievements_section_count')!.classList.remove("fade-down-animate");
      }

      if (document.documentElement.scrollTop > document.getElementById('analytics_section')!.offsetTop - 400) {
        document.getElementById('analytics_section')!.classList.add("fade-up-animate");
      } else {
        document.getElementById('analytics_section')!.classList.remove("fade-up-animate");
      }

      if (document.documentElement.scrollTop > document.getElementById('success_story')!.offsetTop - 400) {
        document.getElementById('success_story')!.classList.add("fade-up-animate");
      } else {
        document.getElementById('success_story')!.classList.remove("fade-up-animate");
      }

      if (document.documentElement.scrollTop > document.getElementById('blog_section')!.offsetTop - 400) {
        document.getElementById('blog_section')!.classList.add("fade-up-animate");
      } else {
        document.getElementById('blog_section')!.classList.remove("fade-up-animate");
      }

      if (document.documentElement.scrollTop > document.getElementById('news_cont')!.offsetTop - 400) {
        document.getElementById('news_cont')!.classList.add("fade-up-animate");
      } else {
        document.getElementById('news_cont')!.classList.remove("fade-up-animate");
      } 

      if (document.documentElement.scrollTop > document.getElementById('clients_section')!.offsetTop - 400) {
        document.getElementById('clients_section')!.classList.add("fade-up-animate");
      } else {
        document.getElementById('clients_section')!.classList.remove("fade-up-animate");
      } 

      if (document.documentElement.scrollTop > document.getElementById('clients_carousel')!.offsetTop - 400) {
        document.getElementById('clients_carousel')!.classList.add("fade-up-animate");
      } else {
        document.getElementById('clients_carousel')!.classList.remove("fade-up-animate");
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
    this.validateMessage = "Thank you for contacting us. Our team will get in touch with you shortly.";
  }
 
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
