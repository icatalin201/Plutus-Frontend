import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Observable } from 'rxjs';
import { Page } from 'src/app/interfaces/page';
import { UserService } from 'src/app/services/user.service';
import { EntityCreatedResponse } from 'src/app/interfaces/entity.created.response';
import { CreateItemRequest } from '../interfaces/create.item.request';
import { UpdateItemRequest } from '../interfaces/update.item.request';
import { FindItemsResponse } from '../interfaces/find.items.response';
import { FindItemResponse } from '../interfaces/find.item.response';

@Injectable()
export class ItemService {

  public constructor(
    private httpService: HttpService,
    private userService: UserService
  ) { }

  public findAll(page: Page): Observable<FindItemsResponse> {
    const token = this.userService.getLoggedUser().token;
    return this.httpService.get(`/items?page=${page.number}&size=${page.size}`, token);
  }

  public findById(id: number): Observable<FindItemResponse> {
    const token = this.userService.getLoggedUser().token;
    return this.httpService.get(`/items/${id}`, token);
  }

  public create(item: CreateItemRequest): Observable<EntityCreatedResponse> {
    const token = this.userService.getLoggedUser().token;
    return this.httpService.post('/items', item, token);
  }

  public update(id: number, item: UpdateItemRequest): Observable<any> {
    const token = this.userService.getLoggedUser().token;
    return this.httpService.put(`/items/${id}`, item, token);
  }

  public delete(id: number): Observable<any> {
    const token = this.userService.getLoggedUser().token;
    return this.httpService.delete(`/items/${id}`, token);
  }

}
