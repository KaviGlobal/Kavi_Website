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
  @Input() cardImage: any;
  @Input() cardContent:any;
  @Input() tags:any;
  @Input() date:any;
  @Input() videoUrl:any;
  @Output() searchText:any;

  private history: string[] = [];
  private searchValue:any = '';
//  @Output() searchTagText:any;
  // public formattedDate: string | null | undefined;

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
//        console.log("event",event,event.url,(event.url).split('%3D')[1]);  
  //      this.router.navigate(['/SearchTag=SAS']);      
      }     
    }); 
  }
  ngOnInit(): void {
    let routeConfig: any = this.activatedRoute.routeConfig;
    this.commonService.activeMenuName = cloneDeep(routeConfig.path);
    // this.formattedDate = this.datePipe.transform(this.date, 'MMMM d, yyyy');
//    let routeConfig: any = this.activatedRoute.routeConfig;
//    console.log("routeConfig",routeConfig);
 //   this.commonService.activeMenuName = cloneDeep(routeConfig.path);
  }  
  searchTag(searchText:any){     
     this.searchValue = searchText; 
     console.log("searchText....",searchText,this.router.routeReuseStrategy.shouldReuseRoute); 
//     this.router.routeReuseStrategy.shouldReuseRoute = () => false;    
     this.router.navigate(['/SearchTag='+searchText]);   
    
//    this.router.navigate(['/SearchTag='+searchText]);  
   //
   
//    this.router.navigate(['/'+searchText]);    
     /*    
     setTimeout(() => {
      this.commonService.routeChangeSubscription.next(true);        
      this.router.navigate(['/'+searchText]);     
    }, 100);

        */
  }
}
