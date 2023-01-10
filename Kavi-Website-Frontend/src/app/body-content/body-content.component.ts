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
      }
    })

    this.screenheight = window.innerHeight;
    this.ourCientImages.push({
      title: "Strategy",
      link: 'assets/strategy.png',
      flip: 'inactive',
      description: 'Don’t settle just for the “What”. Also, demand the Blueprint on “How”.'
    });
    this.ourCientImages.push({
      title: "Consulting",
      link: 'assets/consulting.png',
      flip: 'inactive',
      description: 'Focus on solutions & Outcomes, not the ongoing head count.'
    });
    this.ourCientImages.push({
      title: "R&D",
      link: 'assets/R&D.png',
      flip: 'inactive',
      description: 'Drive Innovation; Optimize Cost.'
    });
    this.ourCientImages.push({
      title: "full_spectrum",
      link: 'assets/full_spectrum.png',
      flip: 'inactive',
      description: 'Full-suite of Data Analytics capabilities.'
    });
    let images = [];
    for (let index = 1; index < 5; index++) {
      // console.log(`assets/client_images/${index}.png`)
      images.push(`assets/client_images/${index}.png`);
    }
    this.clientImages.push(images);
    console.log(this.clientImages);
  }

  toggleFlip(index: number) {
    console.log(this.ourCientImages[index].flip)
    this.ourCientImages[index].flip = (this.ourCientImages[index].flip == 'inactive') ? 'active' : 'inactive'
    // this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
    console.log(this.ourCientImages)

  }

  ngAfterViewInit(): void {

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
