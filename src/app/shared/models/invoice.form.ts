import { Currency } from './currency';
import { InvoiceLineForm } from './invoice.line.form'

export class InvoiceForm {
  currency: Currency;
  partnerId: string;
  serialId: string = "2e978bc3-115d-4226-90a7-24bd24ef5054";
  date: Date = new Date();
  dueDate: Date;
  lines: InvoiceLineForm[];
}