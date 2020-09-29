import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Observable } from 'rxjs';
import { RegisterRequest } from '../interfaces/register.request';

@Injectable()
export class RegisterService {

  public constructor(
    private httpService: HttpService
  ) { }

  public register(request: RegisterRequest): Observable<any> {
    return this.httpService.post('/register', request);
  }
}
