import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightMenuDetailsComponent } from './right-menu-details.component';

describe('RightMenuDetailsComponent', () => {
  let component: RightMenuDetailsComponent;
  let fixture: ComponentFixture<RightMenuDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightMenuDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RightMenuDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
