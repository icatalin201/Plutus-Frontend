import { Partner } from '../../partners/classes/partner';
import { TransactionMethod } from './transaction.method';
import { TransactionStatus } from './transaction.status';
import { TransactionType } from './transaction.type';

export class Transaction {
    id: string;
    date: string;
    document: string;
    details: string;
    value: number;
    partner: Partner;
    type: TransactionType;
    method: TransactionMethod;
    createdOn: string;
    updatedOn: string;
    status: TransactionStatus;
    deductible: boolean
}