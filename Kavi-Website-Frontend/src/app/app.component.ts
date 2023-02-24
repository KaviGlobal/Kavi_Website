import { Component, OnInit } from '@angular/core';
import { FooterService } from './components/footer/footer.service';
import { cloneDeep } from 'lodash';

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
  public dataLoaded: boolean = false;
  public sliderImages: any = [];

  constructor(
    public footerService: FooterService,
  ) {
  }

  ngOnInit(): void {
    this.getHeaderFooterData();
  }
  public getHeaderFooterData() {
    this.footerService.getFooterData().then((response: any) => {
      if (response && response.data) {
        this.headerFooterData = cloneDeep(response.data);
        console.log(this.headerFooterData.attributes.headerfooter.Sliders.data, "footerData");
        this.headerFooterData.attributes.headerfooter.Sliders.data.forEach((element: any) => {
          this.images.push(element.attributes.url);
        });
        console.log('this.headerFooterData: ', this.headerFooterData);
        if (this.headerFooterData.attributes && this.headerFooterData.attributes.headerfooter && this.headerFooterData.attributes.headerfooter.KaviLogo && 
          this.headerFooterData.attributes.headerfooter.KaviLogo.data && this.headerFooterData.attributes.headerfooter.KaviLogo.data.attributes && 
          this.headerFooterData.attributes.headerfooter.KaviLogo.data.attributes.url) {
            this.logoImage = cloneDeep(this.headerFooterData.attributes.headerfooter.KaviLogo.data.attributes.url);          
        }
        console.log('this.logoImage: ', this.logoImage);
        this.dataLoaded = true;
      }
    });
  }

}
