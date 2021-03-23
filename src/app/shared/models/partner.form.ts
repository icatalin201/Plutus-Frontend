import { BusinessType } from "./business.type";
import { PartnerType } from "./partner.type";

export class PartnerForm {
  name: string;
  email: string;
  type: PartnerType = PartnerType.CLIENT;
  phone: string;
  vat: string;
  commercialRegistry: string;
  address: string;
  termInDays: number;
  bankAccount: string;
  bankId: string;
  countryCode: string;
  businessType: BusinessType = BusinessType.INDIVIDUAL;
}