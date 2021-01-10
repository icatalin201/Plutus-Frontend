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

  public print(ids: string[]): Observable<any> {
    const token = this.userService.getToken();
    let url = '/invoices/pdf?';
    ids.forEach(id => url = url.concat(`ids=${id}&`))
    return this.httpService.getBuffer(url, token);
  }

  public collect(ids: string[]): Observable<any> {
    const token = this.userService.getToken();
    let url = '/invoices/cashing?';
    ids.forEach(id => url = url.concat(`ids=${id}&`))
    return this.httpService.post(url, null, token);
  }
}
