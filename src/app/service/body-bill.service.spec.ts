import { TestBed } from '@angular/core/testing';

import { BodyBillService } from './body-bill.service';

describe('BodyBillService', () => {
  let service: BodyBillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BodyBillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
