import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { cloneDeep } from 'lodash';
import { FooterService } from './footer.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  providers: [NgbCarouselConfig]
})
export class FooterComponent implements OnInit {

  public images: any = [];
  public footerData:any;
  public dataLoad:boolean = false;
  public sliderImages:any = [];
  constructor(
    public footerService: FooterService,
  ) { }

  ngOnInit(): void {
    // this.images = ['footer_image1.png', 'footer_image2.png'].map((n) => `assets/Images/${n}`);
    this.getFooterListData();
  }

  public async getFooterListData(){
    this.footerService.getFooterData().then(async(response: any) =>{
      if(response && response.data){
        this.footerData = await cloneDeep(response.data);
        console.log(this.footerData.attributes.headerfooter.Sliders.data,"footerData");
        this.footerData.attributes.headerfooter.Sliders.data.forEach((element:any) => {
          this.images.push(element.attributes.url);
        });
        this.dataLoad = response.data ? true : false;
      }
    });
    console.log(this.images,"this.images");
  }
}
