import { ItemType } from './item.type';

export class UpdateItem {
  name: string;
  unitPrice: number;
  vat: number;
  uom: string;
  type: ItemType
}
