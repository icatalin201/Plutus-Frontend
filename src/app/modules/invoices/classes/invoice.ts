import { Partner } from '../../partners/classes/partner';
import { InvoiceCurrency } from './invoice.currency';
import { InvoiceLine } from './invoice.line';
import { InvoiceStatus } from './invoice.status';

export class Invoice {
    id: string;
    createdOn: string;
    updatedOn: string;
    date: string;
    dueDate: string;
    name: string;
    status: InvoiceStatus;
    partner: Partner;
    subtotal: number;
    total: number;
    taxes: number;
    currency: InvoiceCurrency;
    lines: InvoiceLine[];
}
