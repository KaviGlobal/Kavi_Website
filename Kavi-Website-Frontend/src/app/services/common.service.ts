import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public isServiceloading: boolean = false;
  public isloading: boolean = false;

  public activeMenuName: string = '';

  constructor() { }

  public checkValidAuth() {
    return new Promise<any>((resolve, reject) => {
      resolve(true);
    });
  }
}
