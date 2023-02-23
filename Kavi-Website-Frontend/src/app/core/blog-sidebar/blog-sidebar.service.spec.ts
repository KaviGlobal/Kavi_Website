import { TestBed } from '@angular/core/testing';

import { BlogSidebarService } from './blog-sidebar.service';

describe('BlogSidebarService', () => {
  let service: BlogSidebarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogSidebarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
