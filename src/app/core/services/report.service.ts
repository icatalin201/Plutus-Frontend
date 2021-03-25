import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private httpService: HttpService,
    private appService: AppService
  ) { }

  public getYearlyIncomesByMonth(year: number): Observable<any> {
    const token = this.appService.getToken()
    const url = `/data/incomes/${year}/by-month`
    return this.httpService.get(url, token)
  }

  public getYearlyExpensesByMonth(year: number): Observable<any> {
    const token = this.appService.getToken()
    const url = `/data/expenses/${year}/by-month`
    return this.httpService.get(url, token)
  }

  public getYearlyIncomesByPartner(year: number): Observable<any> {
    const token = this.appService.getToken()
    const url = `/data/incomes/${year}/by-partner`
    return this.httpService.get(url, token)
  }

  public getYearlyExpensesByPartner(year: number): Observable<any> {
    const token = this.appService.getToken()
    const url = `/data/expenses/${year}/by-partner`
    return this.httpService.get(url, token)
  }

  public getTotalIncomesByPartner(): Observable<any> {
    const token = this.appService.getToken()
    const url = `/data/incomes/by-partner`
    return this.httpService.get(url, token)
  }

  public getTotalExpensesByPartner(): Observable<any> {
    const token = this.appService.getToken()
    const url = `/data/expenses/by-partner`
    return this.httpService.get(url, token)
  }

  public getTotalIncomesByYear(): Observable<any> {
    const token = this.appService.getToken()
    const url = `/data/incomes/by-year`
    return this.httpService.get(url, token)
  }

  public getTotalExpensesByYear(): Observable<any> {
    const token = this.appService.getToken()
    const url = `/data/expenses/by-year`
    return this.httpService.get(url, token)
  }
}
