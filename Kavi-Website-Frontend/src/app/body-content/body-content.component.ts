import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BodyContentService } from '../services/body-content.service';
import { NgxTinySliderSettingsInterface } from 'ngx-tiny-slider';
// import { MouseEvent } from '@agm/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
declare const google: any;
@Component({
  selector: 'app-body-content',
  templateUrl: './body-content.component.html',
  styleUrls: ['./body-content.component.scss'],
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])
  ]
})
export class BodyContentComponent implements OnInit {
  public renderData: any;
  public searchCriteria!: FormGroup;
  public screenheight: number = 0;
  public tinySliderConfig!: NgxTinySliderSettingsInterface;
  zoom: number = 8;
  lat: number = 51.673858;
  lng: number = 7.815982;
  clientImages: any = [];
  ourCientImages: any = [];
  flip: string = 'inactive';
  @ViewChild('googleMap') googleMapEle!: ElementRef;
  @ViewChild("customControl", { static: true }) customControl!: ElementRef;
  @HostListener("window:scroll", [])
  onWindowScroll() {
    console.log("Scrolling!");
  }
  constructor(private bodyContent: BodyContentService
  ) { }

  ngOnInit(): void {
    this.bodyContent.getHomeContent().subscribe((response: any) => {
      if (response && response.data && response.data.attributes) {
        this.renderData = response.data.attributes;
        console.log(this.renderData);
        this.renderData.Offerings.forEach((element: any) => {
          element.OfferingMedia.Media.data.attributes.height = '100%';
          element.OfferingMedia.Media.data.attributes.width = '100%';
        });

        this.renderData.Blogs.data.forEach((element: any) => {
          element.attributes.Media.data[0].attributes.width = '100%';
          element.attributes.Media.data[0].attributes.height = '100%';
          if (element.attributes.Title === 'Intelligent Augmented Reality') {
            element.attributes['position'] = 'right';
            element.attributes['imagePosition'] = 'left';
          }
          else if (element.attributes.Title === 'Industrial Awakening') {
            element.attributes['position'] = 'right';
            element.attributes['imagePosition'] = 'left';
          }
        });

        // document.getElementById('imageContent')?.style.backgroundImage = `url(${this.renderData.HeroHeader[0].SliderMedia.Media.data.attributes.url})`
        let temp: any = [];
        let items: any = [];
        for (let index = 0; index < this.renderData.OurClientImages.length; index++) {
          if (this.renderData.OurClientImages[index].Order % 4 === 0) {
            items.push(this.renderData.OurClientImages[index]);
            temp.push(items);
            items = [];
          }
          else {
            items.push(this.renderData.OurClientImages[index]);
          }
        }
        this.clientImages = temp;
      }
    })
    this.screenheight = window.innerHeight;
  }

  toggleFlip(index: number) {
    this.renderData.OurClientDetail[index].Flip = (this.renderData.OurClientDetail[index].Flip == 'inactive') ? 'active' : 'inactive'
  }

  ScrollIntoView(elem: string) {
    if (elem) {
      window.document.getElementById(elem)?.scrollIntoView();
    }
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  mapClicked($event: any) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }

  markerDragEnd(m: marker | undefined, $event: any) {
    console.log('dragEnd', m, $event);
  }

  markers: marker[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: 'A',
      draggable: true
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: 'B',
      draggable: false
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: 'C',
      draggable: true
    }
  ]
}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
