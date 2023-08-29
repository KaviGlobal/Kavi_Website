import { Component, Inject, EventEmitter,Input,Output,OnInit, ViewChild } from '@angular/core';
import { DatePipe,Location } from '@angular/common';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { cloneDeep } from 'lodash';
@Component({
  selector: 'app-right-menu-details-card',
  templateUrl: './right-menu-details-card.component.html',
  styleUrls: ['./right-menu-details-card.component.scss']
})
export class RightMenuDetailsCardComponent implements OnInit {
  @Input() title: any;
  @Input() authorDetails: any;
  @Input() slug: any;
  @Input() route: any;
  @Input() cardImage: any;
  @Input() cardContent:any;
  @Input() tags:any;
  @Input() date:any;
  @Input() videoUrl:any;
  @Output() searchText:any;

  private history: string[] = [];
  private searchValue:any = '';

  constructor(
    private datePipe: DatePipe,
    private _location: Location,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private commonService: CommonService,
  ) {
    this.router.events.subscribe((event) => {       
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects); 
      }     
    }); 
  }
  ngOnInit(): void {
    let routeConfig: any = this.activatedRoute.routeConfig;
    this.commonService.activeMenuName = cloneDeep(routeConfig.path);
  }  
  searchTag(searchText:any){     
     this.searchValue = searchText; 
     console.log("searchText....",searchText,this.router.routeReuseStrategy.shouldReuseRoute); 
     this.router.navigate(['/SearchTag='+searchText]);   
  }
}
