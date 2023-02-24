import { Component, OnInit, Input } from '@angular/core';
import { BlogService } from './blog.service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})

export class BlogComponent implements OnInit {

  public blogData: any = [];
  public dataLoad: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    public commonService: CommonService,
    private blogService: BlogService,
  ) { }

  ngOnInit(): void {
    let routeConfig: any = this.activatedRoute.routeConfig;
    this.commonService.activeMenuName = cloneDeep(routeConfig.path);
    this.getBlogListData();
    this.commonService.pageScrollToTop();
  }

  getBlogListData() {
    this.blogService.getBlogList().then((response: any) => {
      if (response.data && response.data.length > 0) {
        this.blogData = response.data;
      }
      this.dataLoad = true;
    });
  }


}
