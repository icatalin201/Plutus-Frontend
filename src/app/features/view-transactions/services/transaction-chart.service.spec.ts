import { TestBed } from '@angular/core/testing';

import { TransactionChartService } from './transaction-chart.service';

describe('TransactionChartService', () => {
  let service: TransactionChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
