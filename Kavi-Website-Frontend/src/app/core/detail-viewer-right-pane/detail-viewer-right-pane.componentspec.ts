import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailViewerRightPaneComponent } from './detail-viewer-right-pane.component';

describe('DetailViewerRightPaneComponent', () => {
  let component: DetailViewerRightPaneComponent;
  let fixture: ComponentFixture<DetailViewerRightPaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailViewerRightPaneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailViewerRightPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
