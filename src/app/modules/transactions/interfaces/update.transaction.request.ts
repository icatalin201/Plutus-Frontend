import { Transaction } from '../classes/transaction';
import { UpdateTransactionDto } from '../classes/update.transaction';

export interface UpdateTransactionRequest {
    transaction: UpdateTransactionDto;
}