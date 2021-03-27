import { InvoiceCurrency } from "./invoice.currency";
import { InvoiceLine } from "./invoice.line";
import { Partner } from "./partner";

export interface Invoice {
  id: string;
  name: string;
  customer: Partner;
  date: Date;
  dueDate: Date;
  subtotal: number;
  taxes: number;
  total: number;
  status: string;
  lines: InvoiceLine[];
  currency: InvoiceCurrency;
  createdOn: string;
  updatedOn: string;
}