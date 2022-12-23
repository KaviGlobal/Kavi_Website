import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BodyContentService } from '../services/body-content.service';
import { NgxTinySliderSettingsInterface } from 'ngx-tiny-slider';
// import { MouseEvent } from '@agm/core';

declare const google: any;

@Component({
  selector: 'app-body-content',
  templateUrl: './body-content.component.html',
  styleUrls: ['./body-content.component.scss']
})
export class BodyContentComponent implements OnInit {
  public searchCriteria!: FormGroup;
  public screenheight: number = 0;
  public tinySliderConfig!: NgxTinySliderSettingsInterface;
  zoom: number = 8;
  lat: number = 51.673858;
  lng: number = 7.815982;
  @ViewChild('googleMap') googleMapEle!: ElementRef;
  @ViewChild("customControl", { static: true }) customControl!: ElementRef;

  @HostListener("window:scroll", [])
  onWindowScroll() {
    console.log("Scrolling!");
  }
  constructor(private formBuilder: FormBuilder, private bodyContent: BodyContentService
  ) { }

  ngOnInit(): void {
    this.screenheight = window.innerHeight;
    // this.tinySliderConfig = {
    //   arrowKeys: true,
    //   autoWidth: true,
    //   gutter: 10,
    //   controlsText: ["<", ">"],
    //   waitForDom: false,
    //   controlsContainer: this.customControl.nativeElement //custom controls
    // };
    // this.bodyContent.getImage().subscribe((data: any) => {

    // })
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
