import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-right-menu-details-card',
  templateUrl: './right-menu-details-card.component.html',
  styleUrls: ['./right-menu-details-card.component.scss']
})
export class RightMenuDetailsCardComponent implements OnInit {

  @Input() title: any;
  @Input() authorDetails: any;
  @Input() cardImage: any;
  @Input() cardContent:any;
  @Input() date:any;
  // public formattedDate: string | null | undefined;

  constructor(
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    // this.formattedDate = this.datePipe.transform(this.date, 'MMMM d, yyyy');
  }

}
