import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-collage-view',
  templateUrl: './collage-view.component.html',
  styleUrls: ['./collage-view.component.scss']
})
export class CollageViewComponent implements OnInit {

  @Input() imagePosition: any;
  @Input() image:any;
  @Input() title:any;
  @Input() description:any;
  constructor() { }

  ngOnInit(): void {
  }

}
