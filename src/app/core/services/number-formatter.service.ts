import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NumberFormatterService {

  constructor() { }

  public formatWithCurrency(value: number, currency: string): string {
    return new Intl.NumberFormat('RO', { style: 'currency', currency }).format(value)
  }
}
