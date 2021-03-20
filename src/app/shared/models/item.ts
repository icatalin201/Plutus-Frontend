import { ItemType } from "./item.type";

export interface Item {
  id: string;
  name: string;
  code: string;
  description: string;
  unitPrice: number;
  vat: number;
  totalPrice: number;
  type: ItemType;
  uom: string;
  createdOn: string;
  updatedOn: string;
}