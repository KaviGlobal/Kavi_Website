import { Component, OnInit,Input } from '@angular/core';
import { BlogService } from '../blog/blog.service';

@Component({
  selector: 'app-blog-viewer',
  templateUrl: './blog-viewer.component.html',
  styleUrls: ['./blog-viewer.component.scss']
})
export class BlogViewerComponent implements OnInit {

  public blogData:any = [];
  public dataLoad:any;

  constructor(
    public blogService:BlogService
  ) { }

  ngOnInit(): void {
  }

  getBlogListData(){
    this.blogService.getBlogList().then((response: any) =>{
      this.blogData = response.data;
      console.log(this.blogData[0].attributes.FullContent,"data")
      this.dataLoad = response.data ? true : false;
    });
  }

}
