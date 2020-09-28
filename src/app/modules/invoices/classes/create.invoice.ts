import { Currency } from 'src/app/classes/currency';
import { CreateInvoiceLineDto } from './create.invoice.line';

export class CreateInvoiceDto {
  partner: number;
  date: Date;
  dueDate: Date;
  currency: Currency;
  lines: CreateInvoiceLineDto[];

  constructor() {
    this.date = new Date();
    this.dueDate = new Date();
    this.currency = Currency.RON;
    this.lines = [];
  }
}
