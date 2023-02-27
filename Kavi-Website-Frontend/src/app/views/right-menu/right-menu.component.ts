import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { cloneDeep } from 'lodash';
import { Subscription } from 'rxjs';
import { RightMenuService } from './right-menu.service';

@Component({
  selector: 'app-right-menu',
  templateUrl: './right-menu.component.html',
  styleUrls: ['./right-menu.component.scss'],
})

export class RightMenuComponent implements OnInit {

  public routePath: any = '';
  public activeMenuItem: any = {};
  public pageData: any = [];
  public isDataLoaded: boolean = false;
  public routeChangeSubscription: Subscription | undefined;
  private getMenuItem: Subscription | undefined;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public commonService: CommonService,
    private rightMenuService: RightMenuService,
  ) { }

  ngOnInit(): void {
    this.getMenuItem = this.commonService.getMenuItem.subscribe((menuItem: any) => {
      this.loadPageData();
    });    
    this.routeChangeSubscription = this.commonService.routeChangeSubscription.subscribe((menuItem: any) => {
      this.loadPageData();
    });
  }
  ngOnDestroy(): void {
    if (this.routeChangeSubscription) {
      this.routeChangeSubscription.unsubscribe();
    }
    if (this.getMenuItem) {
      this.getMenuItem.unsubscribe();
    }
  }
  public getActiveMenu() {
    if (this.commonService.menuData && this.commonService.menuData.RightMenu && this.commonService.menuData.RightMenu.length > 0) {
      this.commonService.menuData.RightMenu.forEach((item: any) => {
        if (item.Url === this.routePath) {
          this.activeMenuItem = cloneDeep(item);
        }
      })
    }
  }

  loadPageData() {
    this.routePath = cloneDeep(this.activatedRoute.snapshot.paramMap.get('id'));
    this.commonService.pageScrollToTop();
    if (this.routePath) {
      this.getActiveMenu();
      this.commonService.activeMenuName = cloneDeep(this.routePath);
      this.isDataLoaded = false;
      this.pageData = [];
      if (this.activeMenuItem && this.activeMenuItem.ContentLink) {
        this.rightMenuService.getRightMenuPageData(this.activeMenuItem.ContentLink).then((response: any) => {
          if (response.data && response.data.length > 0) {
            this.pageData = response.data;
            let tags: any = [];
            this.pageData.forEach((item: any) => {
              if (item.attributes && item.attributes.Tags && item.attributes.Tags.data && item.attributes.Tags.data.length > 0) {
                tags.push(item);
              }
            });
          }
          this.isDataLoaded = true;
        });
      }
      else {
        this.isDataLoaded = true;
      }
    }
    else {
      this.router.navigate(['']);
    }
  }


}
