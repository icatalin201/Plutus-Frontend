import { ItemType } from './item.type';

export class CreateItem {
  name: string;
  unitPrice: number;
  vat: number;
  uom: string;
  type: ItemType
}
