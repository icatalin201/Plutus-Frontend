import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Serial } from 'src/app/shared/models/serial';
import { AppService } from './app.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class SerialService {

  private readonly SERIAL_ID: string = '2e978bc3-115d-4226-90a7-24bd24ef5054';

  constructor(
    private httpService: HttpService,
    private appService: AppService
  ) { }

  public getSerial(): Observable<Serial> {
    const token = this.appService.getToken()
    const url = `/serials/${this.SERIAL_ID}`
    return this.httpService.get(url, token)
  }

  public save(startNumber: number): Observable<any> {
    const token = this.appService.getToken();
    return this.httpService.put(`/serials/${this.SERIAL_ID}`, { startNumber }, token);
  }

}
