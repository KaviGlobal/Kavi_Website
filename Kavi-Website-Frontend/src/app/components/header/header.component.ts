import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  HostListener, Inject
} from '@angular/core';
import { HeaderService } from './header.service';
import { cloneDeep } from 'lodash';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() logoImage: string = '';

  public menuData: any = [];
  public dataLoad: boolean = false;
  public leftMenuCardOne: any = [];
  public leftMenuCardTwo: any = [];
  public rightMenuCard1: any = [];

  public showMenu: boolean = false;
  public isScroll: boolean = false;

  constructor(
    public router: Router,
    public commonService: CommonService,
    public headerService: HeaderService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    this.getMenuList();
    this.document.body.classList.remove('hide-scroll');
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

  public makeMenuActive(menuItem?: any) {
    this.showMenu = false;
    this.document.body.classList.remove('hide-scroll');
    if (menuItem) {
      this.commonService.activeMenuName = menuItem.Label;
    }
    else {
      this.commonService.activeMenuName = '';
      this.router.navigate(['/']);
    }
  }

  toggleDiv() {
    this.showMenu = !this.showMenu;
    this.document.body.classList.remove('hide-scroll');
    if(this.showMenu) {
      this.document.body.classList.add('hide-scroll');
    }
  }

  public getMenuList() {
    this.headerService.getMenuList().then((response: any) => {
      if (response && response.data && response.data.attributes) {
        this.menuData = cloneDeep(response.data.attributes);
        let LeftMenu: any = cloneDeep(response.data.attributes.LeftMenu);
        this.leftMenuCardOne = LeftMenu.filter((element: any) => element.Card === 'Card1');
        this.leftMenuCardTwo = LeftMenu.filter((element: any) => element.Card === 'Card2');
      }
    });
  }


}


