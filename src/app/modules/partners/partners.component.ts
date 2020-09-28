import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { of } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { Partner } from './classes/partner';
import { FindPartnersResponse } from './interfaces/find.partners.response';
import { PartnerService } from './services/partner.service';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator)
  public paginator: MatPaginator;
  public displayedColumns: string[] = ['id', 'name', 'email'];
  public data: Partner[] = [];
  public dataSize: number = 100;
  public loading: boolean = true;

  public constructor(
    private partnerService: PartnerService
  ) { }

  public ngOnInit(): void { }

  public ngAfterViewInit(): void {
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.loading = true;
          const page = {
            number: this.paginator.pageIndex,
            size: this.paginator.pageSize
          };
          return this.partnerService.findAll(page);
        }),
        map((data) => {
          this.loading = false;
          return data;
        }),
        catchError((error) => {
          console.error(error);
          this.loading = false;
          return of({});
        })
      )
      .subscribe((res: FindPartnersResponse) => {
        this.data = res.partners;
        this.dataSize = res.size;
      });
  }

}
