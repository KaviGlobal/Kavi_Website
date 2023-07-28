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
  public headerData: any;
  public logoImage: string = '';//https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/KG_Logo_final_29535fe51f.png';
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
//    this.getHeaderFooterData();
    this.getHeaderData();
    this.getFooterData();
  }
  public getHeaderData() {
    this.headerService.getHeaderData().then((response: any) => {
      if (response && response.data) {
        this.headerData = cloneDeep(response.data);
   /*     this.headerFooterData.attributes.headerfooter.Sliders.data.forEach((element: any) => {
          this.images.push(element.attributes.url);
        });*/
        if (this.headerData.attributes && this.headerData.attributes?.Logo?.Media?.data?.attributes?.url) {
          this.logoImage = cloneDeep(this.headerData.attributes?.Logo?.Media?.data?.attributes?.url);
        }
      }
//      this.getMenuList();
      this.getMenu();
    });
  }
  public getFooterData() {
    this.headerService.getFooterData().then((response: any) => {
      if (response && response.data) {
        this.headerFooterData = cloneDeep(response.data);
   /*     this.headerFooterData.attributes.headerfooter.Sliders.data.forEach((element: any) => {
          this.images.push(element.attributes.url);
        });*/
        if (this.headerFooterData.attributes && this.headerFooterData.attributes.headerfooter && this.headerFooterData.attributes.Logo &&
          this.headerFooterData.attributes.Logo.Media && this.headerFooterData.attributes.Logo.Media.data && this.headerFooterData.attributes.Logo.Media.data.attributes &&
          this.headerFooterData.attributes.Logo.Media.data.attributes.url) {
          this.logoImage = cloneDeep(this.headerFooterData.attributes.Logo.Media.data.attributes.url);
        }
      }
//      this.getMenuList();
      this.getMenu();
    });
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
//      this.getMenuList();
      this.getMenu();
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
  public getMenu() {
    this.headerService.getMenu().then((response: any) => {
      let leftMenu:any = [];
      let rightMenu:any = [];
      let industryMenu:any = [];
      let menuData:any = [];
      let aboutUs:any=[];
      let softwareMenu:any=[];
      let solutionsMenu:any=[];
      
      if (response && response.data) { 
        response.data.forEach((element:any,index:number) => { 
        if (element.attributes.IsTitle == false && element.attributes.parent_item.data != null){          
          if(element?.attributes.parent_item?.data?.attributes?.DisplayName == "Software"){
            softwareMenu.push(element);
          } else if(element?.attributes.parent_item?.data?.attributes?.DisplayName == "Solutions"){
            solutionsMenu.push(element);
          } else {
            leftMenu.push(element);
          }
        } else if(element.attributes.IsTitle == false && element.attributes.parent_item.data == null && element.attributes.Menu != 'Type'){
          if(element.attributes.Menu == "About Us"){
            aboutUs.push(element);
          } else {
            industryMenu.push(element);
          }
        } else if(element.attributes.IsTitle == false && element.attributes.parent_item.data == null  && element.attributes.Menu == 'Type'){
          rightMenu.push(element);  
        }
      });
        // leftMenu = response.data.filter((element: any) => (element.attributes.Menu == "Offering"));
        // rightMenu = response.data.filter((element: any) => (element.attributes.Menu == "Type"));
        // industryMenu = response.data.filter((element: any) => (element.attributes.Menu == "Industry"));
        // aboutUs = response.data.filter((element: any) => (element.attributes.Menu == "About Us"));
        aboutUs.sort(this.sortByDisplayOrder);
        leftMenu.sort(this.sortByDisplayOrder);
        rightMenu.sort(this.sortByDisplayOrder);
        industryMenu.sort(this.sortByDisplayOrder);
        softwareMenu.sort(this.sortByDisplayOrder);
        solutionsMenu.sort(this.sortByDisplayOrder);
//        menuData.push({LeftMenu :leftMenu});        
      }  
      // let groupedMenu = this.groupBy(leftMenu, (item:any) => item?.attributes.parent_item?.data?.attributes?.DisplayName);
      let groupindustryMenu = this.groupBy(industryMenu, (item:any) => item?.attributes?.Menu);     
      menuData.push({LeftMenu :leftMenu});
      menuData.push({RightMenu :rightMenu});
      menuData.push({IndustryMenu :groupindustryMenu});
      menuData.push({AboutUs :aboutUs});
      menuData.push({SoftwareMenu :softwareMenu});
      menuData.push({SolutionsMenu :solutionsMenu});
      /*      for(let menu of menuData[0].LeftMenu) {
        console.log("xxxx",menu?.attributes?.ParentItem?.data?.attributes?.DisplayName);
        
      }*/
      this.commonService.menuData = menuData;
    // console.log("xxxx",menuData);
      setTimeout(() => {
        this.commonService.getMenuItem.next(true);
      }, 100);
      this.isDataLoaded = true;
    });
  }

}
