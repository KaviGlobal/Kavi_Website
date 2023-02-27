import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  HostListener, Inject
} from '@angular/core';
import { cloneDeep } from 'lodash';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';

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

  public showMenu: boolean = false;
  public isScroll: boolean = false;
  private getMenuItem: Subscription | undefined;

  constructor(
    public router: Router,
    public commonService: CommonService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
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
    this.menuData = cloneDeep(this.commonService.menuData);
    let LeftMenu: any = cloneDeep(this.menuData?.LeftMenu);
    this.leftMenuCardOne = LeftMenu.filter((element: any) => element.Card === 'Card1');
    this.leftMenuCardTwo = LeftMenu.filter((element: any) => element.Card === 'Card2');
  }

  public makeMenuActive(menuItem?: any) {
    this.showMenu = false;
    this.document.body.classList.remove('hide-scroll');
    if (menuItem) {
      this.commonService.activeMenuName = menuItem.Label;
      setTimeout(() => {
        this.commonService.routeChangeSubscription.next(true);        
      }, 100);
    }
    else {
      this.commonService.activeMenuName = '';
      this.router.navigate(['/']);
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


