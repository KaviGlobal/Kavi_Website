import { Component, HostListener, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-body-content',
  templateUrl: './body-content.component.html',
  styleUrls: ['./body-content.component.scss']
})
export class BodyContentComponent implements OnInit {
  public searchCriteria!: FormGroup;
  public testHtml!: string;
  @HostListener("window:scroll", [])
  onWindowScroll() {
    console.log("Scrolling!");
  }
  constructor(private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

  }

  ScrollIntoView(elem: string) {
    // console.log(elem);
    if (elem) {
      window.document.getElementById(elem)?.scrollIntoView();
    }
    // document.querySelector(elem).scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
