import { Component, Input, OnInit, ViewChild } from '@angular/core';
// import { BlogService } from './blog.service';
import { NgbDateStruct, NgbCalendar, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-blog-sidebar',
  templateUrl: './blog-sidebar.component.html',
  styleUrls: ['./blog-sidebar.component.scss']
})
export class BlogSidebarComponent implements OnInit {

  public model: NgbDateStruct |any;
	public date: { year: number; month: number; } | any;
  @Input() data:any = [{attributes:{Title: ""}}];

  constructor(
    // private blogService: BlogService,
    private calendar: NgbCalendar
  ) { }

  ngOnInit(): void {
    this.model = this.calendar.getToday();
  }

}
