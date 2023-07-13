import { Component, Inject, EventEmitter,Input,Output,OnInit, ViewChild } from '@angular/core';
import { DatePipe,Location } from '@angular/common';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { cloneDeep } from 'lodash';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RightMenuDetailsComponent} from 'src/app/views/right-menu-details/right-menu-details.component';
@Component({
  selector: 'app-detail-viewer-right-pane',
  templateUrl: './detail-viewer-right-pane.component.html',
  styleUrls: ['./detail-viewer-right-pane.component.scss']
})
export class DetailViewerRightPaneComponent implements OnInit {
  @Input() title: any;
  @Input() authorDetails: any;
 // @Input() cardImage: any;
 // @Input() cardContent:any;
  @Input() tags:any;
  @Input() publishDate:any;
  @Input() externalLink:any;
  @Input() newsMedia:any;
  @Input() podcasts:any;
  @Input() clients:any;
  @Input() conference:any;
  @Input() publisher:any;
  @Input() moduleName:any;  
  @Input() authorPost:any;
  //@Input() videoUrl:any;
  //@Output() searchText:any;

  private history: string[] = [];
 // private searchValue:any = '';
//  @Output() searchTagText:any;
  // public formattedDate: string | null | undefined;

  constructor(
    private datePipe: DatePipe,
    private _location: Location,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    public modalService: NgbModal,
    public rightPaneDetails:RightMenuDetailsComponent
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
  }  
  searchAuthor(authorName:any){  
    this.router.navigate(['/people/'+ authorName]);
  }
  searchTag(searchText:any){   
    this.commonService.activeMenuName = this.moduleName;
    this.router.navigate(['/SearchTag='+searchText]);

  }
}