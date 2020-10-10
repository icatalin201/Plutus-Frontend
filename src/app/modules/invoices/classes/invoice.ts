import { Currency } from 'src/app/classes/currency';
import { Partner } from '../../partners/classes/partner';
import { InvoiceLine } from './invoice.line';
import { InvoiceStatus } from './invoice.status';

export class Invoice {
    id: string;
    createdOn: string;
    updatedOn: string;
    date: string;
    dueDate: string;
    currency: Currency;
    name: string;
    status: InvoiceStatus;
    partner: Partner;
    subtotal: number;
    total: number;
    taxes: number;
    lines: InvoiceLine[];
}
