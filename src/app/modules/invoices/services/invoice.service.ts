import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FindInvoicesResponse } from '../interfaces/find.invoices.response';
import { CreateInvoiceRequest } from '../interfaces/create.invoice.request';
import { EntityCreatedResponse } from 'src/app/interfaces/entity.created.response';
import { Page } from 'src/app/interfaces/page';
import { HttpService } from 'src/app/services/http.service';
import { UserService } from 'src/app/services/user.service';

@Injectable()
export class InvoiceService {

  public constructor(
    private httpService: HttpService,
    private userService: UserService
  ) { }

  public findAll(page: Page): Observable<FindInvoicesResponse> {
    const token = this.userService.getToken();
    return this.httpService.get(`/invoices?page=${page.number}&size=${page.size}`, token);
  }

  public create(request: CreateInvoiceRequest): Observable<EntityCreatedResponse> {
    const token = this.userService.getToken();
    return this.httpService.post(`/invoices`, request, token);
  }

  public activate(id: string): Observable<any> {
    const token = this.userService.getToken();
    return this.httpService.post(`/invoices/${id}/command/ACTIVATE`, null, token);
  }

  public markAsDone(id: string): Observable<any> {
    const token = this.userService.getToken();
    return this.httpService.post(`/invoices/${id}/command/COMPLETE`, null, token);
  }

  public cancel(id: string): Observable<any> {
    const token = this.userService.getToken();
    return this.httpService.post(`/invoices/${id}/command/CANCEL`, null, token);
  }

  public print(id: string): Observable<any> {
    const token = this.userService.getToken();
    return this.httpService.getBuffer(`/invoices/pdf/${id}`, token);
  }
}
