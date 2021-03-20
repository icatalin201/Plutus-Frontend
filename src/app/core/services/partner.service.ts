import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/core/services/app.service';
import { HttpService } from 'src/app/core/services/http.service';
import { Partner } from 'src/app/shared/models/partner';

@Injectable()
export class PartnerService {

  constructor(
    private httpService: HttpService,
    private appService: AppService
  ) { }

  public getPartners(page: number, size: number): Observable<Partner[]> {
    const token = this.appService.getToken()
    const url = `/partners?page=${page}&size=${size}`
    return this.httpService.get(url, token)
  }
}
