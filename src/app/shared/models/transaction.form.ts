import { Currency } from "./currency";
import { TransactionMethod } from "./transaction.method";
import { TransactionType } from "./transaction.type";

export class TransactionForm {
  date: Date = new Date();
  document: string;
  details: string;
  partnerId: string;
  type: TransactionType = TransactionType.INCOME;
  method: TransactionMethod = TransactionMethod.BANK;
  value: number = 0.00;
  currency: Currency = Currency.USD;
  deductible: boolean;
}