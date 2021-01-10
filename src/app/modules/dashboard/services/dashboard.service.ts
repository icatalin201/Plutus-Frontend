import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { UserService } from 'src/app/services/user.service';
import { DashboardResponse } from '../interfaces/dashboard.response';

@Injectable()
export class DashboardService {

  public constructor(
    private httpService: HttpService,
    private userService: UserService
  ) { }

  public fetchStatistics(): Observable<DashboardResponse> {
    const token = this.userService.getToken();
    return this.httpService.get('/dashboard', token);
  }
}
