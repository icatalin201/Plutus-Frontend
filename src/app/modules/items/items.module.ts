import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemsRoutingModule } from './items-routing.module';
import { ItemsComponent } from './items.component';
import { ItemService } from './services/item.service';


@NgModule({
  declarations: [ItemsComponent],
  imports: [
    CommonModule,
    ItemsRoutingModule
  ],
  providers: [
    ItemService
  ]
})
export class ItemsModule { }
