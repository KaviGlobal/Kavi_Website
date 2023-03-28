import { Component, OnInit, Input } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { FooterService } from './footer.service';
import { RightMenuService } from 'src/app/views/right-menu/right-menu.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RightMenuComponent} from 'src/app/views/right-menu/right-menu.component';
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
  public currentYear: any = '';
  public isSubscribed:  boolean = false;
  constructor(
    public footerService: FooterService,
    public config: NgbCarouselConfig,
    public rightMenuService: RightMenuService,
    public modalService: NgbModal
  ) {
    config.interval = 3000;
    config.wrap = true;
    config.keyboard = true;
    config.pauseOnHover = false;
  }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear(); 
  }
  public emailSubscription(email:any){    
    let emailValidation = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");
    let valid = emailValidation.test(email);
    if(valid){
      //call API
      this.rightMenuService.emailSubscription(email).then((response: any) => {
        if(response.data){
          this.isSubscribed = true
        }
        else
          this.isSubscribed = false
      })
    }
    else{
      //error message
      this.isSubscribed = false
    }
    console.log(valid);    
  }
  public policyTerms(terms: any){  
    const modalRef = this.modalService.open(RightMenuComponent, {
      size: 'xl',
      centered: true,
      windowClass: 'dark-modal'
    });
    modalRef.componentInstance.isPolicy = true;
    modalRef.componentInstance.terms = terms;
   // modalRef.componentInstance.RightMenuComponent = terms.FullContent;
  }
  
}
