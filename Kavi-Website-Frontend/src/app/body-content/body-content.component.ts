import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-body-content',
  templateUrl: './body-content.component.html',
  styleUrls: ['./body-content.component.scss']
})
export class BodyContentComponent implements OnInit {
  public searchCriteria!: FormGroup;
  public testHtml!: string;
  constructor(private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {

    // this.searchCriteria = this.formBuilder.group({
    //   // equipmentNumber: "",
    //   equipmentDescription: "",
    // });
    this.testHtml = '<h3 class="montserrat-semi-bold">Kavi Global</h3>'

  }

}
