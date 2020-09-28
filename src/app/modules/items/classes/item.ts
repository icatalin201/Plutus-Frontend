import { ItemType } from './item.type';

export class Item {
  id: number;
  name: string;
  unitPrice: number;
  vat: number;
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
