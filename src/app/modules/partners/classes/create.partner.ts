import { BusinessType } from './business.type';
import { PartnerType } from './partner.type';

export class CreatePartnerDto {
  name: string;
  email: string;
  type: PartnerType;
  businessType: BusinessType;
  countryCode: string;
  bankId: string;
  phone: string;
  address: string;
  vat: string;
  bankAccount: string;
  commercialRegistry: string;
  termInDays: number;
}
