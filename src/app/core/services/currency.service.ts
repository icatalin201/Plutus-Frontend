import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  public readonly RON: string = 'RON';
  public readonly EUR: string = 'EUR';
  public readonly USD: string = 'USD';

  constructor() { }

  public getCurrencies(): string[] {
    return [ this.EUR, this.RON, this.USD ]
  }

  public formatWithDefaultCurrency(value: number): string {
    return this.formatWithCurrency(value, this.RON);
  }

  public formatWithCurrency(value: number, currency: string): string {
    return new Intl.NumberFormat('RO', { style: 'currency', currency }).format(value)
  }
}
