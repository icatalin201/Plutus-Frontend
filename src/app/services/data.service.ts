import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FindBanksResponse } from '../interfaces/find.banks.response';
import { FindCountriesResponse } from '../interfaces/find.countries.response';
import { FindSerialResponse } from '../interfaces/find.serial.response';
import { HttpService } from './http.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly APP_NAME: string = 'Plutus Finance';

  public constructor(
    private httpService: HttpService,
    private userService: UserService
  ) { }

  public getAppName(): string {
    return this.APP_NAME;
  }

  public findBanks(): Observable<FindBanksResponse> {
    const token = this.userService.getToken();
    return this.httpService.get('/banks', token);
  }

  public findCountries(): Observable<FindCountriesResponse> {
    const token = this.userService.getToken();
    return this.httpService.get('/countries', token);
  }

  public findSerial(): Observable<FindSerialResponse> {
    const token = this.userService.getToken();
    return this.httpService.get('/serials/2e978bc3-115d-4226-90a7-24bd24ef5054', token);
  }
}
