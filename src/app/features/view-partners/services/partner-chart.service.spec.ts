import { TestBed } from '@angular/core/testing';

import { PartnerChartService } from './partner-chart.service';

describe('PartnerChartService', () => {
  let service: PartnerChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartnerChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
