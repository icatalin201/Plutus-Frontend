import { TransactionMethod } from './transaction.method';
import { TransactionType } from './transaction.type';

export class UpdateTransactionDto {
    date: string;
    document: string;
    details: string;
    value: number;
    partnerId: number;
    type: TransactionType;
    method: TransactionMethod;
}