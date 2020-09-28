import { Partner } from '../classes/partner';

export interface FindPartnersResponse {
  page: number;
  size: number;
  total: number;
  partners: Partner[];
}
