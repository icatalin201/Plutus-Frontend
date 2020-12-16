export class CreateInvoiceLineDto {
  itemId: number;
  details: string;
  quantity: number;
  vat: number;
  unitPrice: number;
  uom: string;
}
