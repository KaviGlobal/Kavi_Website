import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { RightMenuService } from '../right-menu/right-menu.service';
import { cloneDeep } from 'lodash';
import { CommonService } from 'src/app/services/common.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-right-menu-details',
  templateUrl: './right-menu-details.component.html',
  styleUrls: ['./right-menu-details.component.scss']
})
export class RightMenuDetailsComponent implements OnInit {

  public pageType: any = '';
  public pageDetailsName: any = '';

  public pageData: any = [];
  public pageFullContent: any;
  public isDataLoaded: boolean = false;
  public recommendationMetaData: any;
  public recommendationData: any = [];
  public routerEventSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public commonService: CommonService,
    private rightMenuService: RightMenuService,
  ) { }

  ngOnInit(): void {    
    this.loadPageData();
    this.routerEventSubscription = this.router.events.subscribe((evt: any) => {
      if ((evt instanceof NavigationEnd)) {
        this.loadPageData();
      }
    });
  }
  ngOnDestroy(): void {
    if (this.routerEventSubscription) {
      this.routerEventSubscription.unsubscribe();
    }
  }
  public loadPageData() {
    this.pageType = cloneDeep(this.activatedRoute.snapshot.paramMap.get('pageType'));
    this.pageDetailsName = cloneDeep(this.activatedRoute.snapshot.paramMap.get('id'));    
    //console.log("gggg",)
    if (this.pageType && this.pageDetailsName) {
      this.commonService.activeMenuName = cloneDeep(this.pageType);
      this.isDataLoaded = false;
  //    console.log("hi from Offerings",this.pageType,this.pageDetailsName);   
      setTimeout(() => {
        this.pageData = [];
        this.pageFullContent = '';
        this.recommendationMetaData = [];
        if (this.pageDetailsName) {          
          this.getDetailsData();
        }
        else {
          this.isDataLoaded = true;
        }
        this.commonService.pageScrollToTop();
      }, 50);
    }
    else {
      // this.router.navigate(['']);
    }
  }


  getDetailsData() {
    this.rightMenuService.getDetailsData(this.pageType, this.pageDetailsName).then((response: any) => {
      if (response.data && response.data.length > 0) {
        this.pageData = response.data;
        this.pageFullContent = response.data[0].attributes?.FullContent;
        let pageData: any = cloneDeep(response.data[0]);        
        if (pageData.attributes && pageData.attributes.Tags && pageData.attributes.Tags.data && pageData.attributes.Tags.data.length > 0) {
//          let tagName: string = '';       
          let tagName: any = [];          
          pageData.attributes.Tags.data.forEach((item: any, index: number) => {
            tagName.push(item.attributes.Name)
          });          
          if (tagName) {
            this.getRecommendationsByTag(tagName);
          }
        }
      }
      this.isDataLoaded = true;
    });
  }
  getRecommendationsByTag(tagName: any) {
    this.rightMenuService.getBlogViewer().then((viewerResp: any) => {
      if (viewerResp && viewerResp.data && viewerResp.data.attributes && viewerResp.data.attributes.Recommendation) {
        // 'data science'
        this.recommendationMetaData = cloneDeep(viewerResp.data.attributes);        
        this.rightMenuService.getRecommendationsByTag(this.pageType, tagName).then((response: any) => {
          if (response.data && response.data.length > 0) {
            this.recommendationData = response.data;       
           
          }
        });
      }
    });
  }
}
