import { Item } from '../classes/item';

export interface FindItemsResponse {
  page: number;
  size: number;
  total: number;
  items: Item[];
}
