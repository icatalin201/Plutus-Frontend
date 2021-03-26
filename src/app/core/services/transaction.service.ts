import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionForm } from 'src/app/shared/models/transaction.form';
import { AppService } from './app.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    private httpService: HttpService,
    private appService: AppService
  ) { }

  public getTransactions(page: number, size: number): Observable<any> {
    const token = this.appService.getToken()
    const url = `/transactions?page=${page}&size=${size}`
    return this.httpService.get(url, token)
  }

  public create(transaction: TransactionForm): Observable<any> {
    const token = this.appService.getToken()
    const url = `/transactions`
    return this.httpService.post(url, transaction, token)
  }

  public update(id: string, transaction: TransactionForm): Observable<any> {
    const token = this.appService.getToken()
    const url = `/transactions/${id}`
    return this.httpService.put(url, transaction, token)
  }

  public download(year: string): Observable<any> {
    const token = this.appService.getToken()
    const url = `/transactions/document/${year}`
    return this.httpService.getBuffer(url, token)
  }

  public delete(id: string): Observable<any> {
    const token = this.appService.getToken()
    const url = `/transactions/${id}`
    return this.httpService.delete(url, token)
  }
}
