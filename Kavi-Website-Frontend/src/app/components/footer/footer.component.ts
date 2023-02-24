import { Component, OnInit, Input } from '@angular/core';
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

  @Input() images: any = [];
  @Input() footerData: any;
  @Input() dataLoad: boolean = false;
  @Input() sliderImages: any = [];
  @Input() logoImage: string = '';

  constructor(
    public footerService: FooterService,
    public config: NgbCarouselConfig
  ) {
    config.interval = 3000;
    config.wrap = true;
    config.keyboard = true;
    config.pauseOnHover = false;
  }

  ngOnInit(): void {
    // this.images = ['footer_image1.png', 'footer_image2.png'].map((n) => `assets/images/${n}`);
    // this.getFooterListData();
  }

  public getFooterListData() {
    this.footerService.getFooterData().then((response: any) => {
      if (response && response.data) {
        this.footerData = cloneDeep(response.data);
        console.log(this.footerData.attributes.headerfooter.Sliders.data, "footerData");
        this.footerData.attributes.headerfooter.Sliders.data.forEach((element: any) => {
          this.images.push(element.attributes.url);
        });
        this.dataLoad = response.data ? true : false;
      }
    });
    console.log(this.images, "this.images");
  }
}
