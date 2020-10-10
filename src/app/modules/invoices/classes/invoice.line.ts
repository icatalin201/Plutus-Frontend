import { Item } from '../../items/classes/item';

export class InvoiceLine {
    id: string;
    createdOn: string;
    updatedOn: string;
    item: Item;
    quantity: number;
    subtotal: number;
    total: number;
    unitPrice: number;
    uom: string;
    vat: number;
}