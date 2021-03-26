import { Component, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MenuItem } from 'primeng/api';
import { tap } from 'rxjs/operators';
import { ItemService } from 'src/app/core/services/item.service';
import { MessagingService } from 'src/app/core/services/messaging.service';
import { Item } from 'src/app/shared/models/item';

@Component({
  selector: 'app-view-items',
  templateUrl: './view-items.component.html',
  styleUrls: ['./view-items.component.sass']
})
export class ViewItemsComponent implements OnInit {

  public items: Item[] = [];
  public loading: boolean = true;
  public selectedItem: Item = null;
  public showCreateItem: boolean = false;
  public totalRecords: number = 0;
  public currentPage: number = 0;
  public pageSize: number = 50;
  public menuItems: MenuItem[] = [
    { 
      label: 'Creeaza item', 
      icon: 'pi pi-fw pi-plus', 
      command: () => this.showCreateItem = true
    },
  ];
  public contextMenuItems: MenuItem[] = [
    {
      label: 'Editeaza', 
      icon: 'pi pi-fw pi-pencil', 
      command: () => this.editItem(this.selectedItem)
    },
    {
      label: 'Sterge', 
      icon: 'pi pi-fw pi-times', 
      command: () => this.deleteItem(this.selectedItem)
    }
  ];

  constructor(
    private itemService: ItemService,
    private confirmationService: ConfirmationService,
    private messagingService: MessagingService
  ) { }

  ngOnInit(): void { }

  public fetchData(event: LazyLoadEvent): void {
    this.currentPage = event.first / this.pageSize;
    this.loadItems()
  }

  public loadItems(): void {
    this.loading = true
    this.itemService
      .getItems(this.currentPage, this.pageSize)
      .pipe(tap(() => this.loading = false))
      .subscribe(res => {
        this.items = res.items;
        this.totalRecords = res.totalRecords;
      })
  }

  public editItem(item: Item): void {
    this.selectedItem = item;
    this.showCreateItem = true;
  }

  public deleteItem(item: Item): void {
    this.confirmationService.confirm({
      message: `Esti sigur ca vrei sa stergi item-ul ${item.name}?`,
      header: 'Confirmare',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.itemService
          .delete(item.id)
          .subscribe(
            res => {
              this.items = this.items.filter((i) => i.id !== item.id);
              this.messagingService
                .sendSuccess('Item sters', `${item.name}`);
              this.selectedItem = null;
            },
            err => {
              this.messagingService
                .sendError('Eroare', `${item.name} nu a fost sters`);
              this.selectedItem = null;
            }
          )
      }
    })
  }

  public onCloseItemDialog(result: boolean): void {
    if (result) {
      this.loadItems();
    }
    this.selectedItem = null;
    this.showCreateItem = false;
  }

}
