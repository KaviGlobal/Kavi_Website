import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { HeaderService } from './header.service';
import { cloneDeep } from 'lodash';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() backgroundColor: any;
  @Input() backgroundImage: string = '../../../../assets/Images/Group 2007.png';
  @Output() blogClicked = new EventEmitter<void>();

  public menuData: any = [];
  public dataLoad: boolean = false;
  public leftMenuCardOne: any = [];
  public leftMenuCardTwo: any = [];
  public rightMenuCard1: any = [];
  
  public showMenu: boolean = false;

  constructor(
    public router: Router,
    public commonService: CommonService,
    public headerService: HeaderService
  ) { }

  ngOnInit(): void {
    // if (this.backgroundColor) {
    //   this.backgroundImage = "";
    // }
    this.getMenuList();
    if (false) {
      this.leftMenuCardOne = [
        {
          "id": 9,
          "Label": "About Us",
          "Title": "About Us",
          "Styles": "White",
          "Card": "Card1",
          "SubSections": [
          ]
        },
        {
          "id": 7,
          "Label": "Contact Us",
          "Title": "Contact Us",
          "Styles": "White",
          "Card": "Card1",
          "SubSections": [

          ]
        },
        {
          "id": 8,
          "Label": "Careers",
          "Title": "Careers",
          "Styles": "White",
          "Card": "Card1",
          "SubSections": [

          ]
        },
        {
          "id": 10,
          "Label": "Services",
          "Title": "Services",
          "Styles": "Orange",
          "Card": "Card1",
          "SubSections": [
            {
              "id": 4,
              "Label": "Strategy & RoadMap",
              "Title": "Strategy & RoadMap",
              "ContentLink": "https://kavi-strapi-app.azurewebsites.net/api/offerings?populate=deep,20"
            },
            {
              "id": 5,
              "Label": "Enterprise Data Platform",
              "Title": "Enterprise Data Platform",
              "ContentLink": null
            },
            {
              "id": 6,
              "Label": "Business Intelligence",
              "Title": "Business Intelligence",
              "ContentLink": null
            },
            {
              "id": 7,
              "Label": "Data Science",
              "Title": "Data Scienceq",
              "ContentLink": null
            },
            {
              "id": 8,
              "Label": "Product Development",
              "Title": "Product Development",
              "ContentLink": null
            },
            {
              "id": 9,
              "Label": "Optimization",
              "Title": "Optimization",
              "ContentLink": null
            },
            {
              "id": 10,
              "Label": "Internet of Things",
              "Title": "Internet of Things",
              "ContentLink": null
            },
            {
              "id": 12,
              "Label": "Cloud",
              "Title": "Cloud",
              "ContentLink": null
            },
            {
              "id": 11,
              "Label": "Managed Services",
              "Title": "Managed Services",
              "ContentLink": null
            }
          ]
        },
      ];
      this.leftMenuCardTwo = [

        {
          "id": 12,
          "Label": "Solutions",
          "Title": "Solutions",
          "Styles": "Orange",
          "Card": "Card2",
          "SubSections": [
            {
              "id": 13,
              "Label": "Enterprise Solutions",
              "Title": "Enterprise Solutions",
              "ContentLink": "https://kavi-strapi-app.azurewebsites.net/api/offerings?populate=deep,20"
            },
            {
              "id": 14,
              "Label": "Industry Solutions",
              "Title": "Industry Solutions",
              "ContentLink": "https://kavi-strapi-app.azurewebsites.net/api/offerings?populate=deep,20"
            },
            {
              "id": 15,
              "Label": "Functional Analysis",
              "Title": "Functional Analysis",
              "ContentLink": "https://kavi-strapi-app.azurewebsites.net/api/offerings?populate=deep,20"
            },
            {
              "id": 16,
              "Label": "AI Accelerators",
              "Title": "AI Accelerators",
              "ContentLink": "https://kavi-strapi-app.azurewebsites.net/api/offerings?populate=deep,20"
            }
          ]
        },
        {
          "id": 11,
          "Label": "Kavi Labs",
          "Title": "Kavi Labs",
          "Styles": "Orange",
          "Card": "Card2",
          "SubSections": [
            {
              "id": 17,
              "Label": "Enterprise AI ",
              "Title": "Enterprise AI",
              "ContentLink": "https://kavi-strapi-app.azurewebsites.net/api/offerings?populate=deep,20"
            },
            {
              "id": 18,
              "Label": "Innovation",
              "Title": "Innovation",
              "ContentLink": "https://kavi-strapi-app.azurewebsites.net/api/offerings?populate=deep,20"
            },
            {
              "id": 19,
              "Label": "Research",
              "Title": "Research",
              "ContentLink": "https://kavi-strapi-app.azurewebsites.net/api/offerings?populate=deep,20"
            }
          ]
        },
        {
          "id": 13,
          "Label": "Software",
          "Title": "Software",
          "Styles": "Orange",
          "Card": "Card2",
          "SubSections": [
            {
              "id": 20,
              "Label": "Data Engineering & Science",
              "Title": "Data Engineering & Science",
              "ContentLink": "https://kavi-strapi-app.azurewebsites.net/api/offerings?populate=deep,20"
            },
            {
              "id": 21,
              "Label": "AI Anamoly Deteciton",
              "Title": "AI Anamoly Detection",
              "ContentLink": "https://kavi-strapi-app.azurewebsites.net/api/offerings?populate=deep,20"
            },
            {
              "id": 22,
              "Label": "Data Labeling",
              "Title": "Data Labeling",
              "ContentLink": "https://kavi-strapi-app.azurewebsites.net/api/offerings?populate=deep,20"
            }
          ]
        }
      ];
    }

  }

  public makeMenuActive(menuItem?: any) {
    this.showMenu = false;
    if (menuItem) {
      this.commonService.activeMenuName = menuItem.Label;
    }
    else {
      this.commonService.activeMenuName = '';
      this.router.navigate(['/']);
    }
    // if (menuItem.Title === 'Blog') {
    //   this.isHome = true;
    //   this.blogClicked.emit();
    //   this.showMenu = !this.showMenu;
    // }
  }

  toggleDiv() {
    this.showMenu = !this.showMenu;
  }

  public getMenuList() {
    this.headerService.getMenuList().then((response: any) => {
      console.log('response: ', response);
      let array: any = []
      if (response && response.data && response.data.attributes) {
        this.menuData = cloneDeep(response.data.attributes);
        let LeftMenu: any = cloneDeep(response.data.attributes.LeftMenu);
        this.leftMenuCardOne = LeftMenu.filter((element: any) => element.Card === 'Card1');
        this.leftMenuCardTwo = LeftMenu.filter((element: any) => element.Card === 'Card2');
        console.log('leftMenuCardOne: ', this.leftMenuCardOne);
        console.log('leftMenuCardTwo: ', this.leftMenuCardTwo);
        console.log('menuData: ', this.menuData);
      }
    });
  }


}


