import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightMenuSidebarComponent } from './right-menu-sidebar.component';

describe('RightMenuSidebarComponent', () => {
  let component: RightMenuSidebarComponent;
  let fixture: ComponentFixture<RightMenuSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightMenuSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RightMenuSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
