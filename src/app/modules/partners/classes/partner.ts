import { PartnerType } from './partner.type';

export class Partner {
  id: number;
  name: string;
  email: string;
  type: PartnerType;
  phone: string;
  createdOn: string;
  updatedOn: string;
}
