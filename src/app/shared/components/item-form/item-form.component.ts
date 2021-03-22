import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemService } from 'src/app/core/services/item.service';
import { MessagingService } from 'src/app/core/services/messaging.service';
import { Item } from '../../models/item';
import { ItemForm } from '../../models/item.form';
import { ItemType } from '../../models/item.type';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.sass']
})
export class ItemFormComponent implements OnInit {

  public item: ItemForm = new ItemForm();
  public loading: boolean = false;

  public types: any[] = [
    { 'name': 'Produs', 'value': ItemType.PRODUCT },
    { 'name': 'Serviciu', 'value': ItemType.SERVICE }
  ];

  @Input()
  public existingItem: Item;

  @Output()
  public closed: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private itemService: ItemService,
    private messagingService: MessagingService
  ) { }

  ngOnInit(): void {
    if (this.existingItem) {
      this.useExistingItem(this.existingItem)
    }
  }

  public cancel(): void {
    this.closed.emit(false);
  }

  public save(): void {
    this.loading = true;
    var observable: Observable<any>;
    if (this.existingItem) {
      observable = this.itemService
        .update(this.existingItem.id, this.item);
    } else {
      observable = this.itemService
        .create(this.item);
    }
    observable.subscribe(
      res => {
        this.loading = false
        this.messagingService.sendSuccess('Succes', 
          `${this.item.name} a fost salvat!`);
        this.closed.emit(true);
      },
      err => {
        this.loading = false
        this.messagingService.sendError('Eroare', 
          `A aparut o eroare!`);
      }
    )
  }

  private useExistingItem(item: Item): void {
    this.item.code = item.code;
    this.item.name = item.name;
    this.item.uom = item.uom;
    this.item.vat = item.vat;
    this.item.unitPrice = item.unitPrice;
    this.item.type = item.type;
    this.item.description = item.description;
  }

}
