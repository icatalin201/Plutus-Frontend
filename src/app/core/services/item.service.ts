import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/core/services/app.service';
import { HttpService } from 'src/app/core/services/http.service';
import { ItemForm } from 'src/app/shared/models/item.form';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(
    private httpService: HttpService,
    private appService: AppService
  ) { }

  public getItems(page: number, size: number): Observable<any> {
    const token = this.appService.getToken()
    const url = `/items?page=${page}&size=${size}`
    return this.httpService.get(url, token)
  }

  public create(item: ItemForm): Observable<any> {
    const token = this.appService.getToken()
    const url = `/items`
    return this.httpService.post(url, item, token)
  }

  public update(id: string, item: ItemForm): Observable<any> {
    const token = this.appService.getToken()
    const url = `/items/${id}`
    return this.httpService.put(url, item, token)
  }

  public delete(id: string): Observable<any> {
    const token = this.appService.getToken()
    const url = `/items/${id}`
    return this.httpService.delete(url, token)
  }
}
