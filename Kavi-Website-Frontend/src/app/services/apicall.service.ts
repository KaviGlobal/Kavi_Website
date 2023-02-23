import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from './common.service';
// import * as cloneDeep from 'lodash/cloneDeep';
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  public url : any = environment.apiDetails.apiUrl;
  constructor(
    private http: HttpClient,
    private commonService: CommonService,
  ) { }

  public apiCall(endpoint: string, method: string, payload: any, isBackground: any) {
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
          if (method == "get" || method == "delete") {
            if (method == "get") {
              this.http.get(url, options).subscribe(resp => {
                if (!isBackground) {
                  this.commonService.isServiceloading = false;
                }
                resolve(resp);
              },
                (error) => {
                  this.bindErrMsg(error, isBackground);
                  console.log(error,"error");
                  resolve(false);
                });
            }
            if (method == "delete") {
              this.http.delete(url, options).subscribe(resp => {
                if (!isBackground) {
                  this.commonService.isServiceloading = false;
                }
                resolve(resp);
              },
                (error) => {
                  this.bindErrMsg(error, isBackground);
                  resolve(false);
                });
            }
          }
          else if (method == "post" || method == "put") {
            var payloadString = JSON.stringify(payload);
            if (method == "post") {
              this.http.post(url, payloadString, options).subscribe(resp => {
                resolve(resp);
                if (!isBackground) {
                  this.commonService.isServiceloading = false;
                }
              },
                (error) => {
                  this.bindErrMsg(error, isBackground);
                  resolve(false);
                });
            }
            else if (method == "put") {
              this.http.put(url, payloadString, options).subscribe(resp => {
                resolve(resp);
                if (!isBackground) {
                  this.commonService.isServiceloading = false;
                }
              },
                (error) => {
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
