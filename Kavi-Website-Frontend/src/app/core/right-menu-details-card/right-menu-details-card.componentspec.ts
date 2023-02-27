import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightMenuDetailsCardComponent } from './right-menu-details-card.component';

describe('RightMenuDetailsCardComponent', () => {
  let component: RightMenuDetailsCardComponent;
  let fixture: ComponentFixture<RightMenuDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightMenuDetailsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RightMenuDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
