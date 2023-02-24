import { Component, OnInit, Input } from '@angular/core';
import { BlogService } from './blog.service';
import { NgbDateStruct, NgbCalendar, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
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
  
  public isBlog: any = false;
  public dataLoad: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    public commonService: CommonService,
    private blogService: BlogService,
    private calendar: NgbCalendar
  ) { }

  ngOnInit(): void {
    let routeConfig: any = this.activatedRoute.routeConfig;
    console.log(routeConfig.path);
    this.commonService.activeMenuName = cloneDeep(routeConfig.path);
    this.getBlogListData();
    this.commonService.pageScrollToTop();
  }

  getBlogListData() {
    this.blogService.getBlogList().then((response: any) => {
      console.log('response: ', response);
      this.blogData = response.data;
      console.log(this.blogData[0].attributes.FullContent, "data")
      this.dataLoad = response.data ? true : false;
    });
  }
  public viewBlog(blog: any) {
    if (blog == 'Identify Suspicious Transactions') {
      this.isBlog = !this.isBlog;
    }
  }


}
