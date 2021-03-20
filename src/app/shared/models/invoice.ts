import { InvoiceCurrency } from "./invoice.currency";
import { InvoiceLine } from "./invoice.line";
import { InvoiceStatus } from "./invoice.status";
import { Partner } from "./partner";

export interface Invoice {
  id: string;
  name: string;
  customer: Partner;
  date: string;
  dueDate: string;
  subtotal: number;
  taxes: number;
  total: number;
  status: InvoiceStatus;
  lines: InvoiceLine[];
  currency: InvoiceCurrency;
  createdOn: string;
  updatedOn: string;
}