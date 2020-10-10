import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { UserService } from 'src/app/services/user.service';
import { Page } from 'src/app/interfaces/page';
import { Observable } from 'rxjs';
import { EntityCreatedResponse } from 'src/app/interfaces/entity.created.response';
import { FindPartnersResponse } from '../interfaces/find.partners.response';
import { FindPartnerResponse } from '../interfaces/find.partner.response';
import { CreatePartnerRequest } from '../interfaces/create.partner.request';
import { UpdatePartnerRequest } from '../interfaces/update.partner.request';

@Injectable()
export class PartnerService {

  public constructor(
    private httpService: HttpService,
    private userService: UserService
  ) { }

  public findAll(page: Page): Observable<FindPartnersResponse> {
    const token = this.userService.getToken();
    return this.httpService.get(`/partners?page=${page.number}&size=${page.size}`, token);
  }

  public findById(id: string): Observable<FindPartnerResponse> {
    const token = this.userService.getToken();
    return this.httpService.get(`/partners/${id}`, token);
  }

  public create(partner: CreatePartnerRequest): Observable<EntityCreatedResponse> {
    const token = this.userService.getToken();
    return this.httpService.post('/partners', partner, token);
  }

  public update(id: string, partner: UpdatePartnerRequest): Observable<any> {
    const token = this.userService.getToken();
    return this.httpService.put(`/partners/${id}`, partner, token);
  }

  public delete(id: string): Observable<any> {
    const token = this.userService.getToken();
    return this.httpService.delete(`/partners/${id}`, token);
  }

}