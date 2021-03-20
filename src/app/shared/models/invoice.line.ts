import { InvoiceCurrency } from "./invoice.currency";
import { Item } from "./item";

export interface InvoiceLine {
  id: string;
  item: Item;
  uom: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  vat: number;
  total: number;
  currency: InvoiceCurrency;
  createdOn: string;
  updatedOn: string;
}