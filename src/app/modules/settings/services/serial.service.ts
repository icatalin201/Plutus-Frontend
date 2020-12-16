import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class SerialService {

  constructor(
    private httpService: HttpService,
    private userService: UserService
  ) { }

  public save(request: { serial: { startNumber: Number } }): Observable<any> {
    const token = this.userService.getToken();
    return this.httpService.put('/serials/2e978bc3-115d-4226-90a7-24bd24ef5054', request, token);
  }
}
