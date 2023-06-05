import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public isServiceloading: boolean = false;
  public isloading: boolean = false;

  public activeMenuName: string = '';
  
  public getMenuItem = new Subject();
  public routeChangeSubscription = new Subject();
  public menuData: any = {};
  public activeMenuData: any = {};
  constructor() { }

  public checkValidAuth() {
    return new Promise<any>((resolve, reject) => {
      resolve(true);
    });
  }

  public pageScrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
