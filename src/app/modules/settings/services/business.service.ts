import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { UserService } from 'src/app/services/user.service';
import { FindBusinessRequest } from '../interfaces/find.business.request';

@Injectable()
export class BusinessService {

  public constructor(
    private httpService: HttpService,
    private userService: UserService
  ) { }

  public find(): Observable<FindBusinessRequest> {
    const token = this.userService.getToken();
    return this.httpService.get(`/users/business`, token);
  }
}
