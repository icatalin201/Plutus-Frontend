import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterTransactionsComponent } from './filter-transactions.component';

describe('FilterTransactionsComponent', () => {
  let component: FilterTransactionsComponent;
  let fixture: ComponentFixture<FilterTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
