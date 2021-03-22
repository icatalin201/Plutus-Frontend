export class InvoiceLineForm {
  itemId: string;
  quantity: number = 1;
  vat: number = 0.00;
  unitPrice: number = 0.00;
  uom: string;
  details: string;
}