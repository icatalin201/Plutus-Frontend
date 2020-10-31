import { trigger, state, style, transition, animate } from '@angular/animations';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { ConfirmationComponent } from 'src/app/components/confirmation/confirmation.component';
import { AppService } from 'src/app/services/app.service';
import { Item } from './classes/item';
import { CreateItemComponent } from './components/create-item/create-item.component';
import { EditItemComponent } from './components/edit-item/edit-item.component';
import { FindItemsResponse } from './interfaces/find.items.response';
import { ItemService } from './services/item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ItemsComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator)
  public paginator: MatPaginator;
  public columnsToDisplay: string[] = ['code', 'name', 'uom', 'unitPrice', 'vat', 'totalPrice', 'type'];
  public data: Item[] = [];
  public expandedElement: Item | null;
  public dataSize: number = 100;
  public loading: boolean = true;

  public constructor(
    private itemService: ItemService,
    private dialog: MatDialog,
    private appService: AppService,
    private snackbar: MatSnackBar
  ) { }

  public ngOnInit(): void {
    this.appService
      .shouldReload(AppService.RELOAD_ITEMS)
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
          return this.itemService.findAll(page);
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
      .subscribe((res: FindItemsResponse) => {
        this.data = res.items;
        this.dataSize = res.total;
      });
  }

  public edit(item: Item): void {
    this.dialog.open(EditItemComponent, { data: item });
  }

  public delete(item: Item): void {
    const ref = this.dialog
      .open(ConfirmationComponent, 
        { data: 'Are you sure you want to delete this item?' });
    ref.afterClosed()
      .subscribe(
        data => {
          if (data && data.confirm) {
            this.itemService
              .delete(item.id)
              .subscribe(
                res => {
                  this.appService.reloadData(AppService.RELOAD_ITEMS);
                  this.snackbar.open('Item deleted', 'OK', { duration: 3000 })
                }
              );
          }
        }
      )
  }

  public add(): void {
    this.dialog.open(CreateItemComponent);
  }

}
