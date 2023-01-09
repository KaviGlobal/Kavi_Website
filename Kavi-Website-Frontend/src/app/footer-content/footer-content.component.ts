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
    this.images = [700, 800, 807].map((n) => `https://picsum.photos/id/${n}/900/500`);
  }

}
