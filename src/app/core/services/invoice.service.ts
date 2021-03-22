import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/core/services/app.service';
import { HttpService } from 'src/app/core/services/http.service';
import { Invoice } from 'src/app/shared/models/invoice';
import { InvoiceForm } from 'src/app/shared/models/invoice.form';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(
    private httpService: HttpService,
    private appService: AppService
  ) { }

  public getInvoices(page: number, size: number): Observable<Invoice[]> {
    const token = this.appService.getToken()
    const url = `/invoices?page=${page}&size=${size}`
    return this.httpService.get(url, token)
  }

  public create(invoice: InvoiceForm): Observable<any> {
    const token = this.appService.getToken()
    const url = `/invoices`
    return this.httpService.post(url, invoice, token)
  }

  public update(id: string, invoice: InvoiceForm): Observable<any> {
    const token = this.appService.getToken()
    const url = `/invoices/${id}`
    return this.httpService.put(url, invoice, token)
  }

  public delete(id: string): Observable<any> {
    const token = this.appService.getToken()
    const url = `/invoices/${id}`
    return this.httpService.delete(url, token)
  }
}
