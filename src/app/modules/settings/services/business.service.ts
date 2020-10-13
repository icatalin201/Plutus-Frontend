import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { UserService } from 'src/app/services/user.service';
import { FindBusinessRequest } from '../interfaces/find.business.request';
import { UpdateBusinessRequest } from '../interfaces/update.business.request';

@Injectable()
export class BusinessService {

  public constructor(
    private httpService: HttpService,
    private userService: UserService
  ) { }

  public save(request: UpdateBusinessRequest): Observable<any> {
    const token = this.userService.getToken();
    const id = this.userService.getId();
    return this.httpService.put(`/users/${id}/business`, request, token);
  }

  public find(): Observable<FindBusinessRequest> {
    const token = this.userService.getToken();
    const id = this.userService.getId();
    return this.httpService.get(`/users/${id}/business`, token);
  }
}
