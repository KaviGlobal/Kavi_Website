import { Component, OnInit } from '@angular/core';
import { cloneDeep } from 'lodash';
import { HeaderService } from './components/header/header.service';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'kaviGlobal';
  public headerFooterData: any;
  public logoImage: string = 'https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/KG_Logo_final_29535fe51f.png';
  public images: any = [];
  public footerData: any;
  public isDataLoaded: boolean = false;
  public sliderImages: any = [];

  constructor(
    public commonService: CommonService,
    public headerService: HeaderService,
  ) {
  }

  ngOnInit(): void {
    this.getHeaderFooterData();
  }
  public getHeaderFooterData() {
    this.headerService.getHeaderFooterData().then((response: any) => {
      if (response && response.data) {
        this.headerFooterData = cloneDeep(response.data);
   /*     this.headerFooterData.attributes.headerfooter.Sliders.data.forEach((element: any) => {
          this.images.push(element.attributes.url);
        });*/
        if (this.headerFooterData.attributes && this.headerFooterData.attributes.headerfooter && this.headerFooterData.attributes.headerfooter.KaviLogo &&
          this.headerFooterData.attributes.headerfooter.KaviLogo.data && this.headerFooterData.attributes.headerfooter.KaviLogo.data.attributes &&
          this.headerFooterData.attributes.headerfooter.KaviLogo.data.attributes.url) {
          this.logoImage = cloneDeep(this.headerFooterData.attributes.headerfooter.KaviLogo.data.attributes.url);
        }
      }
      this.getMenuList();
//      this.getMenu();
    });
  }
  public getMenuList() {
    this.headerService.getMenuList().then((response: any) => {
      if (response && response.data && response.data.attributes) {
//        response.data = 
        let menuData = cloneDeep(response.data.attributes);
        let LeftMenu: any = cloneDeep(response.data.attributes.LeftMenu);
        menuData.RightMenu.forEach((item: any) => {
          item.Url = '';
 /*         if (item.ContentLink) {//console.log("item.ContentLink",item,item.ContentLink,menuData.RightMenu);
            let Url = item.ContentLink.split('=').pop();
            if (Url) {
              item.Url = cloneDeep(Url);
            }
          }*/
        });
        this.commonService.menuData = menuData;
        setTimeout(() => {
          this.commonService.getMenuItem.next(true);
        }, 100);
      }
      this.isDataLoaded = true;
    });
  }
  public sortByDisplayOrder(a:any, b:any) {
    return a.attributes.DisplayOrder - b.attributes.DisplayOrder;
  }
  public groupBy(list:any, keyGetter:any) {
    const map = new Map();
    let groupedData:any=[];
    list.forEach((item:any) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
            
         } else {
             collection.push(item);
         }         
    });
    console.log("groupedData",groupedData);
    console.log("map",map);
    
    return map;
}
  public getMenu() {
    this.headerService.getMenu().then((response: any) => {
      let leftMenu:any = [];
      let rightMenu:any = [];
      let industryMenu:any = [];
      let menuData:any = [];
//      console.log("response",response);
      if (response && response.data) { 
        leftMenu = response.data.filter((element: any) => (element.attributes.Menu == "Offering"));
        rightMenu = response.data.filter((element: any) => (element.attributes.Menu == "Type"));
        industryMenu = response.data.filter((element: any) => (element.attributes.Menu == "Industry"));
        leftMenu.sort(this.sortByDisplayOrder); 
        rightMenu.sort(this.sortByDisplayOrder); 
        industryMenu.sort(this.sortByDisplayOrder);     
//        menuData.push({LeftMenu :leftMenu});        
      } 
      let groupedMenu = this.groupBy(leftMenu, (item:any) => item?.attributes?.parent_item?.data?.attributes?.DisplayName);

      menuData.push({LeftMenu :groupedMenu});
      menuData.push({RightMenu :rightMenu});
      menuData.push({IndustryMenu :industryMenu});
      /*      for(let menu of menuData[0].LeftMenu) {
        console.log("xxxx",menu?.attributes?.ParentItem?.data?.attributes?.DisplayName);
        
      }*/
      this.commonService.menuData = menuData;
//      console.log("xxxx",menuData[0].LeftMenu);
      setTimeout(() => {
        this.commonService.getMenuItem.next(true);
      }, 100);
      this.isDataLoaded = true;
    });
  }

}
