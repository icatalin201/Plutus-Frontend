import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/core/services/app.service';
import { HttpService } from 'src/app/core/services/http.service';
import { InvoiceForm } from 'src/app/shared/models/invoice.form';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(
    private httpService: HttpService,
    private appService: AppService
  ) { }

  public getInvoices(page: number, size: number): Observable<any> {
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

  public downloadArchive(): Observable<any> {
    const token = this.appService.getToken()
    const url = `/invoices/archive`
    return this.httpService.getBuffer(url, token)
  }

  public downloadInvoice(id: string): Observable<any> {
    const token = this.appService.getToken()
    const url = `/invoices/${id}/pdf`
    return this.httpService.getBuffer(url, token)
  }

  public collect(id: string): Observable<any> {
    const token = this.appService.getToken()
    const url = `/invoices/cashing?ids=${id}`
    return this.httpService.post(url, null, token)
  }

  public delete(id: string): Observable<any> {
    const token = this.appService.getToken()
    const url = `/invoices/${id}`
    return this.httpService.delete(url, token)
  }

  public upload(file: any): Observable<any> {
    const token = this.appService.getToken()
    const url = `/invoices/file`;
    return this.httpService.post(url, { file }, token)
  }
}
