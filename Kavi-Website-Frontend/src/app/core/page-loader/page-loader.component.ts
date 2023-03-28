import { Component, OnInit,OnChanges, Input, SimpleChanges } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd,NavigationError,NavigationCancel,NavigationBehaviorOptions } from '@angular/router';
import { Subscription } from 'rxjs';
import { cloneDeep } from 'lodash';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
@Component({
  selector: 'app-page-loader',
  templateUrl: './page-loader.component.html',
  styleUrls: ['./page-loader.component.scss']
})
export class PageLoaderComponent implements OnInit {   
  public routeChangeSubscription: Subscription | undefined;
  public previousUrl: any = '';
  public currentUrl: any = '';  
  private getMenuItem: Subscription | undefined;
  public menuData: any = [];
  constructor(private router: Router,
    public commonService: CommonService,
    private activatedRoute: ActivatedRoute) {
   
    } 
 
  ngOnInit(): void { 
  //  this.routePath = cloneDeep(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getMenuItem = this.commonService.getMenuItem.subscribe((menuItem: any) => {
      this.menuData = cloneDeep(this.commonService.menuData);  
    });
  }
    ngAfterViewInit(){   
      this.menuData = cloneDeep(this.commonService.menuData);    
      this.router.events.subscribe(
        (event) => {  //count=count+1;           
          if (event instanceof NavigationStart) {
            this.previousUrl = this.currentUrl;
          }
          else if(event instanceof NavigationEnd){                     
              this.currentUrl = event.url;                             
          }
/*     
          if(this.previousUrl.length ==0 && this.currentUrl=='/blog'){          
          let url=this.currentUrl;
          this.commonService.activeMenuName = "Blog";
          setTimeout(() => {
            this.commonService.routeChangeSubscription.next(true);        
          }, 100);
        }*/

        if(this.menuData.RightMenu){
          if(this.previousUrl.length == 0){          
            this.menuData.RightMenu.forEach((menuLink: any) => {
              if (menuLink){
                if(this.currentUrl == "/"+menuLink.Url){
                  this.commonService.activeMenuName = menuLink.Label;
                  setTimeout(() => {
                    this.commonService.routeChangeSubscription.next(true);        
                  }, 100);
                }
              }
              else {
            this.commonService.activeMenuName = '';
            this.router.navigate(['/']);
          }
            });          
          }
      }
         
      }); 
 
  }


  ngOnDestroy() {
    if (this.routeChangeSubscription) {
      this.routeChangeSubscription.unsubscribe();
    } 
  }
}
