import { TestBed } from '@angular/core/testing';

import { BlogCardLayoutService } from './blog-card-layout.service';

describe('BlogCardLayoutService', () => {
  let service: BlogCardLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogCardLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
