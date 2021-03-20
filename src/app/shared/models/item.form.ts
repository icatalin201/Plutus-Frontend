import { ItemType } from "./item.type";

export class ItemForm {
  name: string;
  code: string;
  description: string;
  unitPrice: number = 0.00;
  vat: number = 0.00;
  type: ItemType;
  uom: string;
}