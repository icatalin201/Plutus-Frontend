import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInvoiceLineComponent } from './create-invoice-line.component';

describe('CreateInvoiceLineComponent', () => {
  let component: CreateInvoiceLineComponent;
  let fixture: ComponentFixture<CreateInvoiceLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateInvoiceLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInvoiceLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
