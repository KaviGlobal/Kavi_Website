import { TestBed } from '@angular/core/testing';

import { VerticalCardService } from './vertical-card.service';

describe('VerticalCardService', () => {
  let service: VerticalCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerticalCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
