import { TestBed } from '@angular/core/testing';

import { NumberFormatterService } from './number-formatter.service';

describe('NumberFormatterService', () => {
  let service: NumberFormatterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumberFormatterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
