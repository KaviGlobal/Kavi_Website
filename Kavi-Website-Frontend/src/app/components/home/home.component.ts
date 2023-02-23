import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import data from "../../../assets/homepage-data.json";
import { HomeService } from "../home/home.service";
import { cloneDeep } from 'lodash';
import { ActivatedRoute } from '@angular/router';


// declare const google: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public clientImages:any = [];
  public hyperlinkText:any = "Read More";
  public layoutType:any = "topImage-layout";
  public homepageData:any;
  public backgroundImg:any;
  public backgroundImageUrl = 'url(backgroundImg)'
  // public homepageDet:any = {title:''};
  public title:any;
  public homeData:any = [];
  public dataLoad:boolean = false;
  public partnerImg:any;
  zoom: number = 8;
  lat: number = 51.673858;
  lng: number = 7.815982;
  ourCientImages: any = [];
  flip: string = 'inactive';
  @ViewChild('googleMap') googleMapEle!: ElementRef;
  // markers: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    public commonService: CommonService,
    private homeService : HomeService
  ) {
    this.homepageData = data;
    // console.log(this.homepageData.data.attributes.SuccessStory.data[1].attributes.Media.data[0].attributes.url)
   }

  ngOnInit(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    let routeConfig: any = this.activatedRoute.routeConfig;
    console.log(routeConfig.path);
    this.commonService.activeMenuName = cloneDeep(routeConfig.path);
    this.getHomePageData();
    // this.clientImages = [{img:'footer_image1.png'}, {img:'footer_image1.png'},{img:'footer_image1.png'},{img:'footer_image1.png'}].map((n) => `assets/Images/${n}`);
    let temp: any = [];
        let items: any = [];

        for (let index = 0; index < this.homepageData.data.attributes.OurClientImages.length; index++) {
          if (this.homepageData.data.attributes.OurClientImages[index].Order % 4 === 0) {
            items.push(this.homepageData.data.attributes.OurClientImages[index]);
            temp.push(items);
            items = [];
          }
          else {
            items.push(this.homepageData.data.attributes.OurClientImages[index]);
          }
        }
        this.clientImages = temp;
  }

public async getHomePageData() {
    this.homeService.getHomeData().then(async (response: any) =>{
      // let data:any = await response.data;
    
      this.homeData = await response.data;
      this.dataLoad =await response.data ? true : false;
      this.title = this.homeData.attributes.HeroHeader[0].Title;
      this.backgroundImg = this.homeData.attributes.HeroHeader[0].SliderMedia.Media.data.attributes.url;
      this.partnerImg  = this.homeData.attributes.HeroHeader;
      // console.log(this.homepageData.data.attributes.Blogs.data[1],"homeData");
      // console.log(this.homeData,"length");
    });
    
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  mapClicked($event: any) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }

  markerDragEnd(m: marker | undefined, $event: any) {
    console.log('dragEnd', m, $event);
  }

  markers: marker[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: 'A',
      draggable: true
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: 'B',
      draggable: false
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: 'C',
      draggable: true
    }
  ] 


}
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
