import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly APP_NAME: string = 'Plutus Finance';

  public getAppName(): string {
    return this.APP_NAME;
  }
}
