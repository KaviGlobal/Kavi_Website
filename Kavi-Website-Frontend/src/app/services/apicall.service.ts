import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from './common.service';
import {environment} from '../../environments/environment'
import { cloneDeep } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  public url : any = environment.apiDetails.apiUrl;
  public customUrl : any = environment.apiDetails.apiCustomUrl;
  constructor(
    private http: HttpClient,
    private commonService: CommonService,
  ) { }

  public apiCall(apiUrl: string, endpoint: string, method: string, payload: any, isBackground: any) {
    return new Promise<any>((resolve, reject) => {
      this.commonService.checkValidAuth().then((auth_resp: any) => {
        if (auth_resp) {
          if (!isBackground) {
            this.commonService.isServiceloading = true;
          }
          var options = {
            headers: {
              'Content-Type': 'application/json',
              // 'Authorization': "Bearer" + " " + this.commonService.getToken(),
            }
          }
          var url = this.url + endpoint;
          if (apiUrl) {
            url = cloneDeep(apiUrl);
          }
          if (method == "get" || method == "delete") {
            if (method == "get") {
              this.http.get(url, options).subscribe((resp: any) => {
                if (!isBackground) {
                  this.commonService.isServiceloading = false;
                }
                resolve(resp);
              },
                (error: any) => {
                  this.bindErrMsg(error, isBackground);
                  console.log(error,"error");
                  resolve(false);
                });
            }
            if (method == "delete") {
              this.http.delete(url, options).subscribe((resp: any) => {
                if (!isBackground) {
                  this.commonService.isServiceloading = false;
                }
                resolve(resp);
              },
                (error: any) => {
                  this.bindErrMsg(error, isBackground);
                  resolve(false);
                });
            }
          }
          else if (method == "post" || method == "put") {
            var payloadString = JSON.stringify(payload);
            if (method == "post") {
              this.http.post(url, payloadString, options).subscribe((resp: any) => {
                resolve(resp);
                if (!isBackground) {
                  this.commonService.isServiceloading = false;
                }
              },
                (error: any) => {
                  this.bindErrMsg(error, isBackground);
                  resolve(false);
                });
            }
            else if (method == "put") {
              this.http.put(url, payloadString, options).subscribe((resp: any) => {
                resolve(resp);
                if (!isBackground) {
                  this.commonService.isServiceloading = false;
                }
              },
                (error: any) => {
                  this.bindErrMsg(error, isBackground);
                  resolve(false);
                });
            }
          }
          else {
            if (!isBackground) {
              this.commonService.isServiceloading = false;
            }
            resolve(false);
          }
        }
        else {
          // this.commonService.openalertMsg('error', "Your session Expired.");
          resolve(false);
        }
      })
    })
  }

  public apiCustomCall(apiUrl: string, endpoint: string, method: string, payload: any, isBackground: any) {
    return new Promise<any>((resolve, reject) => {
      this.commonService.checkValidAuth().then((auth_resp: any) => {
        if (auth_resp) {
          if (!isBackground) {
            this.commonService.isServiceloading = true;
          }
          var options = {
            headers: {
              'Content-Type': 'application/json',
              // 'Authorization': "Bearer" + " " + this.commonService.getToken(),
            }
          }
          var url = this.customUrl + endpoint;
          if (apiUrl) {
            url = cloneDeep(apiUrl);
          }
          if (method == "get" || method == "delete") {
            if (method == "get") {
              this.http.get(url, options).subscribe((resp: any) => {
                if (!isBackground) {
                  this.commonService.isServiceloading = false;
                }
                resolve(resp);
              },
                (error: any) => {
                  this.bindErrMsg(error, isBackground);
                  console.log(error,"error");
                  resolve(false);
                });
            }
            if (method == "delete") {
              this.http.delete(url, options).subscribe((resp: any) => {
                if (!isBackground) {
                  this.commonService.isServiceloading = false;
                }
                resolve(resp);
              },
                (error: any) => {
                  this.bindErrMsg(error, isBackground);
                  resolve(false);
                });
            }
          }
          else if (method == "post" || method == "put") {
            var payloadString = JSON.stringify(payload);
            if (method == "post") {
              this.http.post(url, payloadString, options).subscribe((resp: any) => {
                resolve(resp);
                if (!isBackground) {
                  this.commonService.isServiceloading = false;
                }
              },
                (error: any) => {
                  this.bindErrMsg(error, isBackground);
                  resolve(false);
                });
            }
            else if (method == "put") {
              this.http.put(url, payloadString, options).subscribe((resp: any) => {
                resolve(resp);
                if (!isBackground) {
                  this.commonService.isServiceloading = false;
                }
              },
                (error: any) => {
                  this.bindErrMsg(error, isBackground);
                  resolve(false);
                });
            }
          }
          else {
            if (!isBackground) {
              this.commonService.isServiceloading = false;
            }
            resolve(false);
          }
        }
        else {
          // this.commonService.openalertMsg('error', "Your session Expired.");
          resolve(false);
        }
      })
    })
  }

  public bindErrMsg(msg: any, isBackground: any) {
    
  }


}
