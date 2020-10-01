import { ItemType } from './item.type';

export class CreateItem {
  name: string;
  unitPrice: number;
  vat: number;
  uom: string;
  code: string;
  description: string;
  type: ItemType
}
