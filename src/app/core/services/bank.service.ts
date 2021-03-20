import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bank } from 'src/app/shared/models/bank';
import { AppService } from './app.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(
    private httpService: HttpService,
    private appService: AppService
  ) { }

  public getBanks(): Observable<Bank[]> {
    const token = this.appService.getToken()
    const url = `/banks`
    return this.httpService.get(url, token)
  }
}
