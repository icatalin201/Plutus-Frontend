import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/core/services/app.service';
import { HttpService } from 'src/app/core/services/http.service';
import { PartnerForm } from 'src/app/shared/models/partner.form';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  constructor(
    private httpService: HttpService,
    private appService: AppService
  ) { }

  public getPartners(page: number, size: number): Observable<any> {
    const token = this.appService.getToken()
    const url = `/partners?page=${page}&size=${size}`
    return this.httpService.get(url, token)
  }

  public create(partner: PartnerForm): Observable<any> {
    const token = this.appService.getToken()
    const url = `/partners`
    return this.httpService.post(url, partner, token)
  }

  public update(id: string, partner: PartnerForm): Observable<any> {
    const token = this.appService.getToken()
    const url = `/partners/${id}`
    return this.httpService.put(url, partner, token)
  }

  public delete(id: string): Observable<any> {
    const token = this.appService.getToken()
    const url = `/partners/${id}`
    return this.httpService.delete(url, token)
  }
}
