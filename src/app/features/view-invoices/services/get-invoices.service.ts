import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/core/services/app.service';
import { HttpService } from 'src/app/core/services/http.service';
import { Invoice } from 'src/app/shared/models/invoice';

@Injectable()
export class GetInvoicesService {

  constructor(
    private httpService: HttpService,
    private appService: AppService
  ) { }

  public getInvoices(page: number, size: number): Observable<Invoice[]> {
    const token = this.appService.getToken()
    const url = `/invoices?page=${page}&size=${size}`
    return this.httpService.get(url, token)
  }
}
