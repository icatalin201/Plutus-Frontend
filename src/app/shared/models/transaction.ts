import { Partner } from "./partner";
import { TransactionCurrency } from "./transaction.currency";
import { TransactionStatus } from "./transaction.status";

export interface Transaction {
  id: string;
  date: Date;
  document: string;
  details: string;
  partner: Partner;
  type: string;
  method: string;
  value: number;
  status: TransactionStatus;
  deductible: boolean;
  currency: TransactionCurrency;
  createdOn: Date;
  updatedOn: Date;
}