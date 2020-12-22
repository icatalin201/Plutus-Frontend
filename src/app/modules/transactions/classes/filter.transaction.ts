import { TransactionType } from "./transaction.type";

export class FilterTransactionDto {
    partnerId: string;
    type: TransactionType | null;
    startDate: string;
    endDate: string
}