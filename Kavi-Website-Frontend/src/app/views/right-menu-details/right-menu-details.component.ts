import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { RightMenuService } from '../right-menu/right-menu.service';
import { cloneDeep } from 'lodash';
import { CommonService } from 'src/app/services/common.service';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomPipePipe } from 'src/app/custom-pipe.pipe';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-right-menu-details',
  templateUrl: './right-menu-details.component.html',
  styleUrls: ['./right-menu-details.component.scss']
})
export class RightMenuDetailsComponent implements OnInit {

  public pageType: any = '';
  public pageDetailsName: any = '';
  public viewerData:any=[];
  public pageData: any = [];  
  public pageFullContent: any;
  public authors: any;
  public tags:any;
  public publishDate:any;
  public isDataLoaded: boolean = false;
  public isPeople: boolean = false;
  public recommendationMetaData: any;
  public recommendationData: any = [];
  public relatedTagData: any = [];
  public routerEventSubscription: Subscription | undefined;
  public externalLink: any;  
  public newsMedia: any;
  public authorPost: any;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public commonService: CommonService,
    private rightMenuService: RightMenuService,
    public modalService: NgbModal,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {//    console.log("sss",this.commonService.activeMenuData);
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
//    console.log("this.commonService.activeMenuName",this.commonService.activeMenuName);
      this.pageType = cloneDeep(this.activatedRoute.snapshot.paramMap.get('pageType'));
      this.pageDetailsName = cloneDeep(this.activatedRoute.snapshot.paramMap.get('id'));  

      if (this.pageType && this.pageDetailsName && !this.pageType.includes("SearchTag")) {
        this.commonService.activeMenuName = cloneDeep(this.pageType);
        this.isDataLoaded = false;
    //    console.log("hi from Offerings",this.pageType,this.pageDetailsName);   
        setTimeout(() => { 
          this.pageData = [];          
          this.pageFullContent = '';
          this.authors = [];
          this.recommendationMetaData = [];
//          console.log(this.pageType,this.pageDetailsName,this.commonService.activeMenuName);

          if (this.pageDetailsName && this.pageType != 'people' && this.pageType != 'tag') {
            this.getDetailsData();
          }
          if(this.pageType == 'people'){    
            if(this.pageDetailsName.includes("leadership")) {
              this.getDetailsData();
            } else { 
              this.getAuthorData();
            }
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
  public getUserInfo(){

  }
  public downloadFile(fileUrl:any,fileName:any){   
    this.getUserInfo();
    var req = new XMLHttpRequest();
            req.open("GET", fileUrl, true);
            req.responseType = "blob";
            req.onload = function () {
                //Convert the Byte Data to BLOB object.
                var blob = new Blob([req.response], { type: "application/octetstream" }); 
                //Check the Browser type and download the File.
             
                    var url = window.URL || window.webkitURL;
                    let link = url.createObjectURL(blob);
                    var a = document.createElement("a");
                    a.setAttribute("download", fileName+'.pdf');
                    a.setAttribute("href", link);
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                
            };
            req.send();

  }
  public onClose() {
    this.isPeople = false;
    if(this.modalService.hasOpenModals())
    this.modalService.dismissAll();  
    this.modalService.dismissAll();    
  }
  getAuthorData(){
  this.authorPost = [];
  this.rightMenuService.getPeopleViewer().then((peopleViewerResp: any) => {    
    if (peopleViewerResp.data && peopleViewerResp.data.attributes) {  
        if(peopleViewerResp.data.attributes.BlogContribution)   {
          let menuName = peopleViewerResp.data.attributes.BlogContribution.Label.toLowerCase();           
          this.rightMenuService.getAuthorsPost(this.pageDetailsName,menuName).then((response: any) => {  
            let dataObj:any=[];      
            if (response.data && response.data.length > 0) {
              response.data.forEach((item:any,index:number) =>{
                if(index < peopleViewerResp.data.attributes.BlogContribution.MaxCount ){
                  dataObj.push(item)
                }               
              });
           }
            peopleViewerResp.data.attributes.BlogContribution.Data = dataObj;
            peopleViewerResp.data.attributes.BlogContribution.pageType = menuName;           
          });
          this.authorPost.push(peopleViewerResp.data.attributes.BlogContribution);            
        } 
        if(peopleViewerResp.data.attributes.PublicationContribution) {
          let menuName = peopleViewerResp.data.attributes.PublicationContribution.Label.toLowerCase();           
          this.rightMenuService.getAuthorsPost(this.pageDetailsName,menuName).then((response: any) => {  
            let dataObj:any=[];      
            if (response.data && response.data.length > 0) {
              response.data.forEach((item:any,index:number) =>{
                if(index < peopleViewerResp.data.attributes.PublicationContribution.MaxCount ){
                  dataObj.push(item)
                }               
              });
           }
            peopleViewerResp.data.attributes.PublicationContribution.Data = dataObj;
            peopleViewerResp.data.attributes.PublicationContribution.pageType = menuName;
           
          });
          this.authorPost.push(peopleViewerResp.data.attributes.PublicationContribution);        
        } 
        if(peopleViewerResp.data.attributes.PodcastContribution){
          let menuName = peopleViewerResp.data.attributes.PodcastContribution.Label.toLowerCase();           
          this.rightMenuService.getAuthorsPost(this.pageDetailsName,menuName).then((response: any) => {  
            let dataObj:any=[];      
            if (response.data && response.data.length > 0) {
              response.data.forEach((item:any,index:number) =>{
                if(index < peopleViewerResp.data.attributes.PodcastContribution.MaxCount ){
                  dataObj.push(item)
                }               
              });
           }
            peopleViewerResp.data.attributes.PodcastContribution.Data = dataObj;
            peopleViewerResp.data.attributes.PodcastContribution.pageType = menuName;
           
          });
          this.authorPost.push(peopleViewerResp.data.attributes.PodcastContribution);
          
        }
        if(peopleViewerResp.data.attributes.PresentationContribution){
          let menuName = peopleViewerResp.data.attributes.PresentationContribution.Label.toLowerCase();           
          this.rightMenuService.getAuthorsPost(this.pageDetailsName,menuName).then((response: any) => {  
            let dataObj:any=[];      
            if (response.data && response.data.length > 0) {
              response.data.forEach((item:any,index:number) =>{
                if(index < peopleViewerResp.data.attributes.PresentationContribution.MaxCount ){
                  dataObj.push(item)
                }               
              });
           }
            peopleViewerResp.data.attributes.PresentationContribution.Data = dataObj;
            peopleViewerResp.data.attributes.PresentationContribution.pageType = menuName;
           
          });
          this.authorPost.push(peopleViewerResp.data.attributes.PresentationContribution);
        }
    }    


    });
     
  /*  let menu=[
      'blogs', 'newslist','success-stories','podcasts','publications','presentations'
    ]
    let post:any=[];
    menu.forEach((item: any, index: number) => {       
  //    this.rightMenuService.getAuthorsPost(this.pageDetailsName,this.commonService.activeMenuName).then((response: any) => {
      this.rightMenuService.getAuthorsPost(this.pageDetailsName,item).then((response: any) => {        
        if (response.data && response.data.length > 0) {  
  //        console.log("2222",item,response.data); 
          let obj=[{            
            [item]:response.data
          } ]  
          post.push(obj);              
          }      

        });
        
        
    });   
    this.authorPost = post;*/
    this.rightMenuService.getPeople(this.pageDetailsName).then((response: any) => {
      if (response.data && response.data.length > 0) {
        this.pageData = response.data[0].attributes;
        this.pageFullContent = response.data[0].attributes?.FullContent;        
      }      
      this.isPeople = true;
      this.isDataLoaded = true;
    });
     
  }
  getRelatedDataByTag(tagName:any){
    let menu=['blogs','newslist','success-stories', 'podcasts', 'publications' ,'presentations'];
          let menuTaglist:any=[];
          for(let item of menu) {         
            this.rightMenuService.getRelatedDataByTag(item,tagName).then((response: any) => {
              if(response.data.length > 0){
                response.data[0].attributes.menuType = item;             
//                this.searchTag = true;
                menuTaglist.push(response.data);
              }
            })
          }
  }
  getDetailsData() { //console.log("pageType",this.pageType,this.commonService.activeMenuData.attributes);
    
//    console.log("this.pageType, this.pageDetailsName",this.commonService.activeMenuData?.attributes?.Viewer);
    this.getViewer(this.commonService.activeMenuData?.attributes?.Viewer);
    // this.commonService.menuData.forEach((Menuitem:any) =>{
    //   if(Menuitem.RightMenu){
    //     Menuitem.RightMenu.forEach((item:any) =>{
    //       if(item.attributes.Parameter.type == this.pageType)
    //       console.log("kkk", item.attributes!.Viewer);
    //       this.getViewer(item.attributes!.Viewer);
    //     });
    //   }
    // })
    this.rightMenuService.getDetailsData(this.pageType, this.pageDetailsName, this.commonService.activeMenuData?.attributes?.Parameter?.parameter?.filter).then((response: any) => {
      if (response.data && response.data.length > 0) {
        this.pageData = response.data;        
        this.isPeople = false;
        this.pageFullContent = response.data[0].attributes?.FullContent;
        this.authors = response.data[0].attributes?.Authors;
        this.tags = response.data[0].attributes?.Tags;
        this.publishDate = response.data[0].attributes?.publishedAt;
        this.externalLink = response.data[0].attributes?.ExternalLink;
        this.newsMedia = response.data[0].attributes?.NewsMedia;
        let pageData: any = cloneDeep(response.data[0]);
        if (pageData.attributes && pageData.attributes.Tags && pageData.attributes.Tags.data && pageData.attributes.Tags.data.length > 0) {
          let tagName: any = [];   
          tagName = pageData.attributes.Tags.data ; 
          if (tagName) {           
            this.getRecommendations(tagName,response.data[0].attributes?.Slug);
//            this.getRecommendationsByTag(tagName);
          }
        }
        if(this.pageType == 'podcasts'){         
          this.rightMenuService.getSpeakerList(this.pageType,  pageData[0]?.attributes?.Speakers?.data[0].attributes.Slug).then((response: any) => {
          this.authorPost = response.data;
          });
        }
        if(this.pageType == 'publications' || this.pageType == 'presentations'){
         this.rightMenuService.getAuthorsPresentationsOrPublications(this.pageType, this.authors.data[0].attributes.Slug).then((response: any) => {
            this.authorPost = response.data;
          });
         } 
      }
      this.isDataLoaded = true;
    });
    if(this.pageType == "pages"){
      this.getRelatedDataByTag(this.pageDetailsName);
    }
  }
  getViewer(viewerName:any) {
    this.viewerData = [];
    if(viewerName){
      this.rightMenuService.getViewer(viewerName).then((viewerResp: any) => {
        this.viewerData = viewerResp.data.attributes;    
      });
    }
//    console.log("this.viewerData",this.viewerData)   
  }
  getRecommendations(tagName: any,menuSlug:any) {
    this.recommendationData = [];
    this.rightMenuService.getRecommendationsByTag(this.pageType, tagName,menuSlug).then((response: any) => {
//      console.log("response1",response);
      if (response.data && response.data.length > 0) {
        // this.recommendationData.push(response.data);     
       this.recommendationData=response.data;
      }      
    });  
    console.log("response.data",this.recommendationData,this.viewerData); 
    this.recommendationMetaData =this.viewerData.Recommendations;
  }
  /*
  getRecommendationsByTag(tagName: any) {
    this.rightMenuService.getBlogViewer().then((viewerResp: any) => {
      if (viewerResp && viewerResp.data && viewerResp.data.attributes && viewerResp.data.attributes.Recommendation) {
        // 'data science'
        this.recommendationMetaData = cloneDeep(viewerResp.data.attributes);        
        this.rightMenuService.getRecommendationsByTag(this.pageType, tagName,'menuSlug').then((response: any) => {
          if (response.data && response.data.length > 0) {
            this.recommendationData = response.data;
          }
        });
      }
    });
  }*/
}
