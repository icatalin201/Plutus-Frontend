import { TransactionType } from "./transaction.type";

export class FilterTransactionDto {
    partnerId: string | null;
    type: TransactionType | null;
    startDate: string | null;
    endDate: string | null
}