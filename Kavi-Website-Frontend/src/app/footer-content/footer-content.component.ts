import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-footer-content',
  templateUrl: './footer-content.component.html',
  styleUrls: ['./footer-content.component.scss'],
  providers: [NgbCarouselConfig]
})
export class FooterContentComponent implements OnInit {
  images: any;
  constructor(config: NgbCarouselConfig) {
    // config.interval = 2000;
    config.keyboard = true;
    config.pauseOnHover = true;
  }

  ngOnInit(): void {
    this.images = ['footer_image1.png', 'footer_image2.png', 'footer_image3.png'].map((n) => `assets/${n}`);
  }

}
