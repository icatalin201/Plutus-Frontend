import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { LoginRequest } from '../interfaces/login.request';
import { LoginResponse } from '../interfaces/login.response';

@Injectable()
export class LoginService {

  public constructor(
    private httpService: HttpService
  ) { }

  public login(request: LoginRequest): Observable<LoginResponse> {
    console.log(request);
    return this.httpService.post("/login", request);
  }
}
