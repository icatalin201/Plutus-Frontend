import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/core/services/app.service';
import { HttpService } from 'src/app/core/services/http.service';
import { Item } from 'src/app/shared/models/item';

@Injectable()
export class GetItemsService {

  constructor(
    private httpService: HttpService,
    private appService: AppService
  ) { }

  public getItems(page: number, size: number): Observable<Item[]> {
    const token = this.appService.getToken()
    const url = `/items?page=${page}&size=${size}`
    return this.httpService.get(url, token)
  }
}
