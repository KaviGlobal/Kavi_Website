import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { Location} from '@angular/common';
import { Router, ActivatedRoute,  NavigationStart, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-right-menu-sidebar',
  templateUrl: './right-menu-sidebar.component.html',
  styleUrls: ['./right-menu-sidebar.component.scss']
})
export class RightMenuSidebarComponent implements OnInit {

  public model: NgbDateStruct |any;
	public date: { year: number; month: number; } | any;
  @Input() data:any = [{attributes:{Title: ""}}];
  private history: string[] = [];

  constructor(
    private calendar: NgbCalendar,
    private _location: Location,
    public router: Router
  ) {
    this.router.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      this.history.push(event.urlAfterRedirects);
    }
  }); 
}

  ngOnInit(): void {
    this.model = this.calendar.getToday();
    
  //   this.router.routeReuseStrategy.shouldReuseRoute = () => false; 
//    console.log("text",this.data);
  }
  backClicked() {
    console.log("this.location", this._location,this.router.url,this.history);
    this._location.back();
    console.log("this.location1",this.router.url,this.history[0]);
    this._location.path;
 
  }
}
