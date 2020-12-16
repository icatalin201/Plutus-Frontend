import { Transaction } from '../classes/transaction';

export interface FindTransactionsResponse {
    page: number;
    size: number;
    total: number;
    transactions: Transaction[];
}