import { Invoice } from '../classes/invoice';

export interface FindInvoicesResponse {
  page: number;
  size: number;
  total: number;
  invoices: Invoice[];
}
