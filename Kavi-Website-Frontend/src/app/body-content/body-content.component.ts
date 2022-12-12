import { Component, HostListener, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BodyContentService } from '../services/body-content.service';

@Component({
  selector: 'app-body-content',
  templateUrl: './body-content.component.html',
  styleUrls: ['./body-content.component.scss']
})
export class BodyContentComponent implements OnInit {
  public searchCriteria!: FormGroup;
  public testHtml!: string;
  public screenheight: number = 0;

  @HostListener("window:scroll", [])
  onWindowScroll() {
    console.log("Scrolling!");
  }
  constructor(private formBuilder: FormBuilder,private bodyContent: BodyContentService
  ) { }

  ngOnInit(): void {
    this.screenheight = window.innerHeight
    this.bodyContent.getImage().subscribe((data: any) => {

    })
  }

  ngAfterViewInit(): void {

  }

  ScrollIntoView(elem: string) {
    if (elem) {
      window.document.getElementById(elem)?.scrollIntoView();
    }
  }
}
