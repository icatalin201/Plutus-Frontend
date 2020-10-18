import { trigger, state, style, transition, animate } from '@angular/animations';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { ConfirmationComponent } from 'src/app/components/confirmation/confirmation.component';
import { AppService } from 'src/app/services/app.service';
import { Partner } from './classes/partner';
import { CreatePartnerComponent } from './components/create-partner/create-partner.component';
import { EditPartnerComponent } from './components/edit-partner/edit-partner.component';
import { FindPartnersResponse } from './interfaces/find.partners.response';
import { PartnerService } from './services/partner.service';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PartnersComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator)
  public paginator: MatPaginator;
  public columnsToDisplay: string[] = ['id', 'name', 'email'];
  public data: Partner[] = [];
  public dataSize: number = 100;
  public loading: boolean = true;
  public expandedElement: Partner | null;

  public constructor(
    private partnerService: PartnerService,
    private dialog: MatDialog,
    private appService: AppService,
    private snackbar: MatSnackBar
  ) { }

  public ngOnInit(): void {
    this.appService
      .shouldReload(AppService.RELOAD_PARTNERS)
      .subscribe(
        reload => {
          this.paginator.page.emit();
        }
      )
  }

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
        this.dataSize = res.total;
      });
  }

  public edit(partner: Partner): void {
    this.dialog.open(EditPartnerComponent, { data: partner });
  }

  public delete(partner: Partner): void {
    const ref = this.dialog
      .open(ConfirmationComponent, 
        { data: 'Are you sure you want to delete this partner?' });
    ref.afterClosed()
      .subscribe(
        data => {
          if (data && data.delete) {
            this.partnerService
              .delete(partner.id)
              .subscribe(
                res => {
                  this.appService.reloadData(AppService.RELOAD_PARTNERS);
                  this.snackbar.open('Partner deleted', 'OK', { duration: 3000 })
                }
              );
          }
        }
      )
  }

  public add(): void {
    this.dialog.open(CreatePartnerComponent);
  }

}
