import { Partner } from "./partner";
import { TransactionCurrency } from "./transaction.currency";

export interface Transaction {
  id: string;
  date: Date;
  document: string;
  details: string;
  partner: Partner;
  type: string;
  method: string;
  value: number;
  status: string;
  deductible: boolean;
  currency: TransactionCurrency;
  createdOn: Date;
  updatedOn: Date;
}