import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-blog-card-layout',
  templateUrl: './blog-card-layout.component.html',
  styleUrls: ['./blog-card-layout.component.scss']
})
export class BlogCardLayoutComponent implements OnInit {

  @Input() title: any;
  @Input() authorDetails: any;
  @Input() blogImage: any;
  @Input() blogContent:any;
  @Input() date:any;
  // public formattedDate: string | null | undefined;

  constructor(
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    // this.formattedDate = this.datePipe.transform(this.date, 'MMMM d, yyyy');
  }

}
