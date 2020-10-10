export class CreateInvoiceLineDto {
  itemId: number;
  quantity: number;
  vat: number;
  price: number;
  uom: string;
}
