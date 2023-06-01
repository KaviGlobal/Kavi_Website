import { CUSTOM_ELEMENTS_SCHEMA,Inject, EventEmitter ,Component, Input, Output,OnInit, ViewChild } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { Location} from '@angular/common';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { cloneDeep } from 'lodash';
import { RightMenuComponent} from 'src/app/views/right-menu/right-menu.component';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-right-menu-sidebar',
  templateUrl: './right-menu-sidebar.component.html',
  styleUrls: ['./right-menu-sidebar.component.scss']
})
export class RightMenuSidebarComponent implements OnInit {

  public model: NgbDateStruct |any;
	public date: { year: number; month: number; } | any;
  @Input() data1:any = [];
  @Input() module:any=[];
  @Input() metaViewer:any=[];
  @Output() searchTagName:any= '';
  private history: string[] = []; 
  public routerEventSubscription: Subscription | undefined;
  public showAllTags: boolean=false;
  public showTagsForDimension : string = '';
  constructor(
    private calendar: NgbCalendar,
    private _location: Location,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    public rightPaneDetails: RightMenuComponent
  ) {
    this.router.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      this.history.push(event.urlAfterRedirects);
    }
  }); 
}

  ngOnInit(): void {
    this.model = this.calendar.getToday();    
    let routeConfig: any = this.activatedRoute.routeConfig;
    this.commonService.activeMenuName = this.module;
    
//console.log("routeConfig",routeConfig,cloneDeep(routeConfig.path),this.commonService.activeMenuName);
//    this.commonService.activeMenuName = cloneDeep(routeConfig.path); 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  showAllTagsForDimension(){
    this.showAllTags = true;
//    this.showTagsForDimension = dimension;
  }
  searchTag(searchText:any){    
    this.commonService.activeMenuName = this.module;
//     console.log("searchText",searchText,this.module, this.commonService.activeMenuName)
        this.commonService.activeMenuName = this.module;
        this.router.navigate(['/SearchTag='+searchText]);

  }

  backClicked() {
    console.log("this.location", this._location,this.router.url,this.history);
    this._location.back();
    console.log("this.location1",this.router.url,this.history[0]);
    this._location.path;
 
  }
}
