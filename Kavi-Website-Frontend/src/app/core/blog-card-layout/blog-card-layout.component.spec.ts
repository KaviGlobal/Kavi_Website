import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogCardLayoutComponent } from './blog-card-layout.component';

describe('BlogCardLayoutComponent', () => {
  let component: BlogCardLayoutComponent;
  let fixture: ComponentFixture<BlogCardLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogCardLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogCardLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
