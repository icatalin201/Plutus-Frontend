import { TestBed } from '@angular/core/testing';

import { GetInvoicesService } from './get-invoices.service';

describe('GetInvoicesService', () => {
  let service: GetInvoicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetInvoicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
