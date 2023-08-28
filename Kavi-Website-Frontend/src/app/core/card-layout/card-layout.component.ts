import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-card-layout',
  templateUrl: './card-layout.component.html',
  styleUrls: ['./card-layout.component.scss']
})
export class CardLayoutComponent implements OnInit {

  @Input() description: any;
  @Input() title: any;
  @Input() hyperlinkText: any;
  @Input() image: any;
  @Input() layoutType: any;
  @Input() type: any;
  @Input() moduleName: any;
  @Input() slug: any;
  @Input() url:any;
  @Input() location:any;

  constructor() { }

  ngOnInit(): void {
  }

}
