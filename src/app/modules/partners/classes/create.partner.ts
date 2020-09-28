import { PartnerType } from './partner.type';

export class CreatePartnerDto {
  firstName: string;
  lastName: string;
  email: string;
  type: PartnerType;
  phone: string;
}
