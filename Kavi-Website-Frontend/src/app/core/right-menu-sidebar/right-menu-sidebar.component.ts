import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-right-menu-sidebar',
  templateUrl: './right-menu-sidebar.component.html',
  styleUrls: ['./right-menu-sidebar.component.scss']
})
export class RightMenuSidebarComponent implements OnInit {

  public model: NgbDateStruct |any;
	public date: { year: number; month: number; } | any;
  @Input() data:any = [{attributes:{Title: ""}}];

  constructor(
    private calendar: NgbCalendar
  ) { }

  ngOnInit(): void {
    this.model = this.calendar.getToday();
  }

}
