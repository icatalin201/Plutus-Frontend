import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public static RELOAD_ITEMS: number = 0;
  public static RELOAD_INVOICES: number = 1;
  public static RELOAD_PARTNERS: number = 2;
  public static RELOAD_TRANSACTIONS: number = 3;

  private events = [
    new EventEmitter<boolean>(),
    new EventEmitter<boolean>(),
    new EventEmitter<boolean>(),
    new EventEmitter<boolean>()
  ];

  public constructor() { }

  public reloadData(type: number): void {
    const eventEmitter: EventEmitter<boolean> = this.events[type];
    eventEmitter.emit(true);
  }

  public shouldReload(type: number): Observable<boolean> {
    return this.events[type];
  }
}
