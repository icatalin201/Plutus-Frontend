import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from 'src/app/shared/models/country';
import { AppService } from './app.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(
    private httpService: HttpService,
    private appService: AppService
  ) { }

  public getCountries(): Observable<Country[]> {
    const token = this.appService.getToken()
    const url = `/countries`
    return this.httpService.get(url, token)
  }
}
