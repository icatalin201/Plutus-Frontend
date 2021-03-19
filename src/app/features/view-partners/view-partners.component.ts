import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Partner } from './models/partner';
import { PartnerService } from './services/partner.service';

@Component({
  selector: 'app-view-partners',
  templateUrl: './view-partners.component.html',
  styleUrls: ['./view-partners.component.sass']
})
export class ViewPartnersComponent implements OnInit {

  public partners: Partner[] = [];
  public loading: boolean = true;
  public first: number = 0;
  public rows: number = 50;

  constructor(
    private partnerService: PartnerService
  ) { }

  ngOnInit(): void {
    this.partnerService
      .getPartners(this.first, this.rows)
      .pipe(tap(() => this.loading = false))
      .subscribe(res => this.partners = res)
  }

}
