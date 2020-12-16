import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EntityCreatedResponse } from 'src/app/interfaces/entity.created.response';
import { Page } from 'src/app/interfaces/page';
import { HttpService } from 'src/app/services/http.service';
import { UserService } from 'src/app/services/user.service';
import { CreateTransactionRequest } from '../interfaces/create.transaction.request';
import { FindTransactionsResponse } from '../interfaces/find.transactions.response';
import { UpdateTransactionRequest } from '../interfaces/update.transaction.request';

@Injectable()
export class TransactionsService {

  public constructor(
    private httpService: HttpService,
    private userService: UserService
  ) { }

  public create(request: CreateTransactionRequest): Observable<EntityCreatedResponse> {
    const token = this.userService.getToken();
    return this.httpService.post(`/transactions`, request, token);
  }

  public update(request: UpdateTransactionRequest): Observable<any> {
    const token = this.userService.getToken();
    return this.httpService.put(`/transactions`, request, token);
  }

  public upload(request: { transactionsFile: string }): Observable<any> {
    const token = this.userService.getToken();
    return this.httpService.post(`/transactions/import`, request, token);
  }

  public findAll(page: Page): Observable<FindTransactionsResponse> {
    const token = this.userService.getToken();
    return this.httpService.get(`/transactions?page=${page.number}&size=${page.size}`, token);
  }

  public delete(id: string): Observable<any> {
    const token = this.userService.getToken();
    return this.httpService.delete(`/transactions/${id}`, token);
  }

  public markAsDone(ids: string[]): Observable<any> {
    const token = this.userService.getToken();
    let url = '/transactions/done?';
    ids.forEach(id => url = url.concat(`ids=${id}&`))
    return this.httpService.post(url, null, token);
  }

}
