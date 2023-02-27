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
        this.headerFooterData.attributes.headerfooter.Sliders.data.forEach((element: any) => {
          this.images.push(element.attributes.url);
        });
        if (this.headerFooterData.attributes && this.headerFooterData.attributes.headerfooter && this.headerFooterData.attributes.headerfooter.KaviLogo &&
          this.headerFooterData.attributes.headerfooter.KaviLogo.data && this.headerFooterData.attributes.headerfooter.KaviLogo.data.attributes &&
          this.headerFooterData.attributes.headerfooter.KaviLogo.data.attributes.url) {
          this.logoImage = cloneDeep(this.headerFooterData.attributes.headerfooter.KaviLogo.data.attributes.url);
        }
      }
      this.getMenuList();
    });
  }
  public getMenuList() {
    this.headerService.getMenuList().then((response: any) => {
      if (response && response.data && response.data.attributes) {
        let menuData = cloneDeep(response.data.attributes);
        let LeftMenu: any = cloneDeep(response.data.attributes.LeftMenu);
        menuData.RightMenu.forEach((item: any) => {
          item.Url = '';
          if (item.ContentLink) {
            let Url = item.ContentLink.split('=').pop();
            if (Url) {
              item.Url = cloneDeep(Url);
            }
          }
        });
        this.commonService.menuData = menuData;
        setTimeout(() => {
          this.commonService.getMenuItem.next(true);
        }, 100);
      }
      this.isDataLoaded = true;
    });
  }

}
