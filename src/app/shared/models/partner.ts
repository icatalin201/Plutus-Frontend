import { Bank } from 'src/app/shared/models/bank';
import { Country } from 'src/app/shared/models/country';
import { BusinessType } from './business.type';
import { PartnerType } from './partner.type';

export interface Partner {
  id: string;
  name: string;
  email: string;
  type: PartnerType;
  phone: string;
  vat: string;
  commercialRegistry: string;
  address: string;
  termInDays: number;
  bankAccount: string;
  bank: Bank;
  country: Country;
  businessType: BusinessType;
  createdOn: string;
  updatedOn: string;
}