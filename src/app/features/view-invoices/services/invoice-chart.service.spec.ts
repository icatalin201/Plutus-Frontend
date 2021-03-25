import { TestBed } from '@angular/core/testing';

import { InvoiceChartService } from './invoice-chart.service';

describe('InvoiceChartService', () => {
  let service: InvoiceChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
