import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { BlogService } from '../blog/blog.service';
import { cloneDeep } from 'lodash';
import { CommonService } from 'src/app/services/common.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {

  public blogData: any = [];
  public blogFullContent: any;
  public dataLoad: boolean = false;
  public recommendationMetaData: any;
  public recommendationData: any = [];
  public routerEventSubscription: Subscription|undefined;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public commonService: CommonService,
    private blogService: BlogService,
  ) { }

  ngOnInit(): void {
    let routeConfig: any = this.activatedRoute.routeConfig;
    this.commonService.activeMenuName = cloneDeep(routeConfig.path);
    this.loadBlogData();
    this.routerEventSubscription = this.router.events.subscribe((evt: any) => {
      if ((evt instanceof NavigationEnd)) {
        this.loadBlogData();
      }
    });
  }
  ngOnDestroy(): void {
    if (this.routerEventSubscription) {
      this.routerEventSubscription.unsubscribe();
    }
  }
  public loadBlogData() {
    let ecId = cloneDeep(this.activatedRoute.snapshot.paramMap.get('id'));
    this.dataLoad = false;
    setTimeout(() => {
      this.blogData = [];
      this.blogFullContent = '';
      this.recommendationMetaData = [];
      if (ecId) {
        this.getBlogListData(ecId);
      } 
      this.commonService.pageScrollToTop();     
    }, 50);
  }

  getBlogListData(ecId: string) {
    this.blogService.getBlogView(ecId).then((response: any) => {
      if (response.data && response.data.length > 0) {
        this.blogData = response.data;
        this.blogFullContent = response.data[0].attributes.FullContent;
        let blogData: any = cloneDeep(response.data[0]);
        if (blogData.attributes && blogData.attributes.Tags && blogData.attributes.Tags.data && blogData.attributes.Tags.data.length > 0) {
          let tagName: string = '';
          blogData.attributes.Tags.data.forEach((item: any, index: number) => {
            if (index === 0) {
              tagName = item.attributes.Name;
            }
          });
          if (tagName) {
            this.getBlogViewByTag(tagName);
          }
        }
      }
      this.dataLoad = true;
    });
  }
  getBlogViewByTag(tagName: string) {
    this.blogService.getBlogViewer().then((viewerResp: any) => {
      if (viewerResp && viewerResp.data && viewerResp.data.attributes && viewerResp.data.attributes.Recommendation) {
        // 'data science'
        this.recommendationMetaData = cloneDeep(viewerResp.data.attributes);
        this.blogService.getBlogViewByTag(tagName).then((response: any) => {
          if (response.data && response.data.length > 0) {
            this.recommendationData = response.data;
          }
        });
      }
    });
  }
}
