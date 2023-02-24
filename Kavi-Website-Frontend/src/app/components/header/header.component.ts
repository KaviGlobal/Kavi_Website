import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { HeaderService } from './header.service';
import { cloneDeep } from 'lodash';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

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
    public headerService: HeaderService
  ) { }

  ngOnInit(): void {
    this.getMenuList();
  }
  @HostListener('window:scroll', ['$event'])
  doSomething(event: any) {
    console.log('event: ', event);
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    console.log('documentElement: ', document.documentElement.scrollTop);
    console.log('offsetHeight: ', document.documentElement.offsetHeight);
    console.log('pos: ', pos);
    if (pos > document.documentElement.offsetHeight) {
      this.isScroll = true;
    }
    else {
      this.isScroll = false;
    }
  }

  public makeMenuActive(menuItem?: any) {
    this.showMenu = false;
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
  }

  public getMenuList() {
    this.headerService.getMenuList().then((response: any) => {
      console.log('response: ', response);
      if (response && response.data && response.data.attributes) {
        this.menuData = cloneDeep(response.data.attributes);
        let LeftMenu: any = cloneDeep(response.data.attributes.LeftMenu);
        this.leftMenuCardOne = LeftMenu.filter((element: any) => element.Card === 'Card1');
        this.leftMenuCardTwo = LeftMenu.filter((element: any) => element.Card === 'Card2');
      }
    });
  }


}


