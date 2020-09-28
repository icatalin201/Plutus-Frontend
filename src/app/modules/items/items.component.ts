import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { of } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { Item } from './classes/item';
import { FindItemsResponse } from './interfaces/find.items.response';
import { ItemService } from './services/item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator)
  public paginator: MatPaginator;
  public displayedColumns: string[] = ['id', 'name', 'unitPrice'];
  public data: Item[] = [];
  public dataSize: number = 100;
  public loading: boolean = true;

  public constructor(
    private itemService: ItemService
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
        this.dataSize = res.size;
      });
  }

}
