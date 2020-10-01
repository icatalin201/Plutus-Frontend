import { Currency } from 'src/app/classes/currency';
import { CreateInvoiceLineDto } from './create.invoice.line';

export class CreateInvoiceDto {
  partner: number;
  date: string;
  dueDate: string;
  currency: Currency;
  lines: CreateInvoiceLineDto[];

  constructor() {
    this.date = new Date().toISOString();
    this.dueDate = new Date().toISOString();
    this.currency = Currency.RON;
    this.lines = [];
  }
}
