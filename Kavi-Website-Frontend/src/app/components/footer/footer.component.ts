import { Component, OnInit, Input } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { FooterService } from './footer.service';
import { RightMenuService } from 'src/app/views/right-menu/right-menu.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RightMenuComponent} from 'src/app/views/right-menu/right-menu.component';
import { CommonService } from 'src/app/services/common.service';
import { Router, ActivatedRoute,  NavigationStart, NavigationEnd } from '@angular/router';
import { cloneDeep } from 'lodash';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  providers: [NgbCarouselConfig]
})
export class FooterComponent implements OnInit {

  @Input() images: any = [];
  @Input() footerData: any = [];
  @Input() isDataLoaded: boolean = false;
  @Input() sliderImages: any = [];
  @Input() logoImage: string = '';
  public currentYear: any = '';
  public isSubscribed:  boolean = false;
  public terms :any=[];
  public aboutUs :any = [];  
  public menuData: any = [];
  public message: string = '';
  constructor(
    public footerService: FooterService,
    public config: NgbCarouselConfig,
    public rightMenuService: RightMenuService,
    public commonService : CommonService,
    public router: Router,
    public modalService: NgbModal
  ) {
    config.interval = 3000;
    config.wrap = true;
    config.keyboard = true;
    config.pauseOnHover = false;
  }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear(); 
    this.getAboutUs();
    this.menuData = cloneDeep(this.commonService.menuData);
  }
  public emailSubscription(email:any){    
    let emailValidation = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");
    let valid = emailValidation.test(email);
    if(valid){
      //call API
      this.rightMenuService.emailSubscription(email).then((response: any) => {
        if(response){
          this.isSubscribed = true;
          this.message = response.statusMessage;
        } else {
          this.isSubscribed = false;
          this.message = 'Error in Subscribe';
        }
      })
    }
    else{
      //error message
      this.isSubscribed = false
    }
    console.log(valid);    
  }
  public getAboutUs(){
    this.rightMenuService.getAboutUs().then((response: any) => {
//      console.log("this.terms123",response.data,response.data[0].attributes.FullContent); 
      if(response.data){                
        this.aboutUs.push(response.data[0].attributes.PreviewContent);
      }
     })     
  }
  public getPolicyData(){
    this.rightMenuService.getPolicyData().then((response: any) => {
//      console.log("this.terms123",response.data,response.data[0].attributes.FullContent); 
      if(response.data){                
        this.terms.push(response.data[0].attributes.FullContent);
      }
     })     
  }
  public policyTerms(){  
    this.getPolicyData();    
    const modalRef = this.modalService.open(RightMenuComponent, {
      size: 'xl',
      centered: true,
      windowClass: 'dark-modal'
    });    
//    console.log("this.terms",this.terms,this.terms[0]);
    modalRef.componentInstance.terms = this.terms;    
    modalRef.componentInstance.isPolicy = true;
    this.commonService.activeMenuName = 'policy';
  //  this.router.navigate(["/policy"]);
//    modalRef.componentInstance.RightMenuComponent = terms.FullContent;
  }
  
  public makeMenuActive(menuItem?: any) {
//    this.showMenu = false;
//    document.getElementById('menu_block')!.classList.remove("menu-container-open");
//    this.document.body.classList.remove('hide-scroll'); 
    if (menuItem) {
      if(menuItem == 'JoinUs'){
        this.commonService.activeMenuName = 'JoinUs';
        this.router.navigate(["/JoinUs"]);
 /*       setTimeout(() => {
          this.commonService.routeChangeSubscription.next(true);        
        }, 100);  */      
      }
    }
  }
}
