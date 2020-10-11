export class CreateInvoiceLineDto {
  itemId: number;
  quantity: number;
  vat: number;
  unitPrice: number;
  uom: string;
}
