import { Bank } from 'src/app/classes/bank';
import { Country } from 'src/app/classes/country';
import { BusinessType } from './business.type';
import { PartnerType } from './partner.type';

export class Partner {
  id: string;
  name: string;
  email: string;
  type: PartnerType;
  businessType: BusinessType;
  phone: string;
  vat: string;
  bank: Bank;
  commercialRegistry: string;
  address: string;
  termInDays: number;
  bankAccount: string;
  country: Country;
  createdOn: string;
  updatedOn: string;
}
