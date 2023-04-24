import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  HostListener, Inject
} from '@angular/core';
import { cloneDeep } from 'lodash';
import { Router, ActivatedRoute,  NavigationStart, NavigationEnd } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { DOCUMENT} from '@angular/common';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RightMenuService } from 'src/app/views/right-menu/right-menu.service';
import { HomeComponent} from 'src/app/views/home/home.component';
//import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() logoImage: string = '';

  public menuData: any = [];
  public isDataLoaded: boolean = false;
  public leftMenuCardOne: any = [];
  public leftMenuCardTwo: any = [];
  public searchTagValue: any = [];
  public showMenu: boolean = false;
  public isScroll: boolean = false;
  private getMenuItem: Subscription | undefined;
  public isSubscribed:  boolean = false;
  constructor(
    public router: Router,
    public commonService: CommonService,
    public rightMenuService: RightMenuService, 
    public modalService: NgbModal,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
//    this.router.routeReuseStrategy.shouldReuseRoute = () => false; 
    this.document.body.classList.remove('hide-scroll');
    this.getMenuItem = this.commonService.getMenuItem.subscribe((menuItem: any) => {     
      this.makeMenuList();
    });
  }
  ngOnDestroy(): void {
    if (this.getMenuItem) {
      this.getMenuItem.unsubscribe();
    }
  }

  @HostListener('window:scroll', ['$event'])
  doSomething(event: any) {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    if (pos > document.documentElement.offsetHeight) {
      this.isScroll = true;
    }
    else {
      this.isScroll = false;
    }
  }

  public makeMenuList() {
//    console.log("menulist",this.commonService.menuData);
    this.menuData = cloneDeep(this.commonService.menuData);
    let LeftMenu: any = cloneDeep(this.menuData?.LeftMenu);
    this.leftMenuCardOne = LeftMenu.filter((element: any) => element.Card === 'Card1');
    this.leftMenuCardTwo = LeftMenu.filter((element: any) => element.Card === 'Card2');
//    console.log("menuData",this.menuData);
  }

  public makeMenuActive(menuItem?: any) {//console.log("menuItem",menuItem);
    this.showMenu = false;
    this.document.body.classList.remove('hide-scroll'); 
    if (menuItem) {
      if(menuItem == 'ContactUs'){
      this.commonService.activeMenuName = 'ContactUs';
      setTimeout(() => {
        this.commonService.routeChangeSubscription.next(true);        
      }, 100);
      }
      else if(menuItem == 'Careers'){
  //    this.commonService.activeMenuName = 'Careers';
      setTimeout(() => {
        this.commonService.routeChangeSubscription.next(true);        
      }, 100);
      
      }
      else if(menuItem == 'SearchTag'){
      this.commonService.activeMenuName = this.searchTagValue;
      setTimeout(() => {
        this.commonService.routeChangeSubscription.next(true);        
      }, 100);
      }
      else if(menuItem == 'UserForm'){
   //     this.commonService.activeMenuName = this.searchTagValue;
        setTimeout(() => {
          this.commonService.routeChangeSubscription.next(true);        
        }, 100);
        }
      else{
      this.commonService.activeMenuName = menuItem.Label;
      this.makeMenuList();
 //     console.log("activeMenuName",this.commonService.activeMenuName);  
        setTimeout(() => {
          this.commonService.routeChangeSubscription.next(true);        
        }, 100);
      }         
    }
    else {
      this.commonService.activeMenuName = '';
      this.router.navigate(['/']);
    }
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
  public makeOfferingsActive(menuItem?: any,selectedMenu?: any) {
  //  console.log("xxxx",menuItem,selectedMenu);
    this.showMenu = false;    
    this.document.body.classList.remove('hide-scroll');    
    if (menuItem.offerings.data && menuItem.offerings.data.length > 0 
    ) {    
      menuItem.offerings.data.forEach((item: any) => {
        if(item.attributes['Label'] == selectedMenu){
          this.commonService.activeMenuName = selectedMenu;
      setTimeout(() => {
        this.commonService.routeChangeSubscription.next(true);        
      }, 100);
        }
      });
      
    }
    else if (menuItem.aboutKavi.data && menuItem.aboutKavi.data.length > 0)
    {    
      menuItem.aboutKavi.data.forEach((item: any) => {
        if(item.attributes['Label'] == selectedMenu){
          this.commonService.activeMenuName = selectedMenu;
      setTimeout(() => {
        this.commonService.routeChangeSubscription.next(true);        
      }, 100);
        }
      });      
    }
    else {
      this.commonService.activeMenuName = '';
      this.router.navigate(['/']);
    }
  }

requestForm(){ 
  this.makeMenuActive('UserForm'); 
  this.router.navigate(["/UserForm"]); 
}

searchTag(searchText:any){ 
 if(searchText.value == ''){
 }
 else{
  this.searchTagValue = searchText.value;
  this.makeMenuActive('SearchTag');  
  searchText.value='';
  this.router.navigate(["/SearchTag="+this.searchTagValue]);
 }
}

  toggleDiv() {
    this.showMenu = !this.showMenu;
    this.document.body.classList.remove('hide-scroll');
    if (this.showMenu) {
      this.document.body.classList.add('hide-scroll');
    }
  }


}


