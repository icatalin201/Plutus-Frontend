import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Item } from 'src/app/shared/models/item';
import { GetItemsService } from './services/get-items.service';

@Component({
  selector: 'app-view-items',
  templateUrl: './view-items.component.html',
  styleUrls: ['./view-items.component.sass']
})
export class ViewItemsComponent implements OnInit {

  public items: Item[] = [];
  public loading: boolean = true;
  public first: number = 0;
  public rows: number = 50;
  public now: string = new Date().toLocaleString();

  constructor(
    private getItemsService: GetItemsService
  ) { }

  ngOnInit(): void {
    this.loadItems()
  }

  public loadItems(): void {
    this.loading = true
    this.getItemsService
      .getItems(this.first, this.rows)
      .pipe(tap(() => this.loading = false))
      .subscribe(res => {
        this.items = res
        this.now = new Date().toLocaleString();
      })
  }

}
