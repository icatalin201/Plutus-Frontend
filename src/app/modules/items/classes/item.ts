import { ItemType } from './item.type';

export class Item {
  id: string;
  name: string;
  description: string;
  unitPrice: number;
  vat: number;
  code: string;
  totalPrice: number;
  type: ItemType;
  uom: string;
  createdOn: string;
  updatedOn: string;

  constructor() {
    this.unitPrice = 0;
    this.vat = 0;
    this.totalPrice = 0;
  }
}
