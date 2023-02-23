import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../blog/blog.service';
import { cloneDeep } from 'lodash';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {

  public blogData: any = [];
  public dataLoad: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    public commonService: CommonService,
    private blogService: BlogService,
  ) { }

  ngOnInit(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    console.log(this.activatedRoute.routeConfig);
    let routeConfig: any = this.activatedRoute.routeConfig;
    this.commonService.activeMenuName = cloneDeep(routeConfig.path);
    let ecId = cloneDeep(this.activatedRoute.snapshot.paramMap.get('id'));
    console.log('ecId: ', ecId);
    if (ecId) {
      this.getBlogListData(ecId);
    }
  }

  getBlogListData(ecId: string) {
    // this.blogService.getBlogList().then((response: any) => {
    //   console.log('getBlogList: ', response);
    //   this.dataLoad = true;
    //   this.blogData = response.data;
    //   // console.log(this.blogData[0].attributes.FullContent, "data");
    //   this.dataLoad = response.data ? true : false;
    // });
    this.blogService.getBlogView(ecId).then((response: any) => {
      console.log('response: ', response);
      if (response.data && response.data.length > 0) {
        this.blogData = response.data;
        // // console.log(this.blogData[0].attributes.FullContent, "data")
        // // this.dataLoad = response.data ? true : false;
      }
      this.dataLoad = true;
    });
  }
}
