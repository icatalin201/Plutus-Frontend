import { Bank } from 'src/app/shared/models/bank';
import { Country } from 'src/app/shared/models/country';

export interface Partner {
  id: string;
  name: string;
  email: string;
  type: string;
  phone: string;
  vat: string;
  commercialRegistry: string;
  address: string;
  termInDays: number;
  bankAccount: string;
  bank: Bank;
  country: Country;
  businessType: string;
  createdOn: string;
  updatedOn: string;
}