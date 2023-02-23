import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeLayoutComponent } from './subscribe-layout.component';

describe('SubscribeLayoutComponent', () => {
  let component: SubscribeLayoutComponent;
  let fixture: ComponentFixture<SubscribeLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscribeLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribeLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
