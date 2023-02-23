import { TestBed } from '@angular/core/testing';

import { SubscribeLayoutService } from './subscribe-layout.service';

describe('SubscribeLayoutService', () => {
  let service: SubscribeLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscribeLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
