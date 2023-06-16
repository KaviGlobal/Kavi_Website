import { Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { HomeService } from "../home/home.service";
import { cloneDeep } from 'lodash';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';


// declare const google: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
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
  zoom: number = 16;
  lat: number = 42.135230;
  lng: number = -88.133640;

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
      this.isDataLoaded = true;
    });
  }

  getClientImages() {
    let temp: any = [];
    let items: any = [];
    for (let index = 0; index < this.homeData.attributes.OurClientImages.length; index++) {     
      if (this.homeData.attributes.OurClientImages[index].Order % 4 === 0) {
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
