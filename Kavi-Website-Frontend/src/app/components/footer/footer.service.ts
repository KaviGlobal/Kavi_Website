import { Injectable } from '@angular/core';
import appConfig from '../../../assets/config/appconfig.json';
import { ApiCallService } from '../../services/apicall.service';

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  constructor(
    private apicallService: ApiCallService,
  ) { }

}
