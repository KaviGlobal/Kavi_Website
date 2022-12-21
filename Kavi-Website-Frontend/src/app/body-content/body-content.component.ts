import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BodyContentService } from '../services/body-content.service';
import {NgxTinySliderSettingsInterface} from 'ngx-tiny-slider';
@Component({
  selector: 'app-body-content',
  templateUrl: './body-content.component.html',
  styleUrls: ['./body-content.component.scss']
})
export class BodyContentComponent implements OnInit {
  public searchCriteria!: FormGroup;
  public testHtml!: string;
  public screenheight: number = 0;
  public tinySliderConfig!: NgxTinySliderSettingsInterface;
  @ViewChild("customControl", { static: true }) customControl!: ElementRef;

  @HostListener("window:scroll", [])
  onWindowScroll() {
    console.log("Scrolling!");
  }
  constructor(private formBuilder: FormBuilder,private bodyContent: BodyContentService
  ) { }

  ngOnInit(): void {
    this.screenheight = window.innerHeight;
    this.tinySliderConfig = {
      arrowKeys: true,
      autoWidth: true,
      gutter: 10,
      controlsText: ["<", ">"],
      waitForDom: false,
      controlsContainer: this.customControl.nativeElement //custom controls
    };
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
}
