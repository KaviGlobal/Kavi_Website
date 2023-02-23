import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-serviceloader',
  templateUrl: './serviceloader.component.html',
  styleUrls: ['./serviceloader.component.scss']
})
export class ServiceloaderComponent implements OnInit {

  constructor(
    public commonService: CommonService,
  ) { }

  ngOnInit(): void {
  }

}
