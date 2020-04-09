import { TestBed } from '@angular/core/testing';

import { PayingService } from './paying.service';

describe('PayingService', () => {
  let service: PayingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
