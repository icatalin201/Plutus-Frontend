import { Currency } from "./currency";

export interface InvoiceCurrency {
  value: Currency;
  rate: number;
  subtotal: number;
  total: number
}