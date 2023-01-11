import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollageViewComponent } from './collage-view.component';

describe('CollageViewComponent', () => {
  let component: CollageViewComponent;
  let fixture: ComponentFixture<CollageViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollageViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
