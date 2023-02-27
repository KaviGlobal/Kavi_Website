import { Component, OnInit, Input } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
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
  @Input() isDataLoaded: boolean = false;
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
  }
}
