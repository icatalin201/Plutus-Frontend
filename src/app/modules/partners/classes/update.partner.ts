import { PartnerType } from './partner.type';

export class UpdatePartnerDto {
  firstName: string;
  lastName: string;
  email: string;
  type: PartnerType;
  phone: string;
}
