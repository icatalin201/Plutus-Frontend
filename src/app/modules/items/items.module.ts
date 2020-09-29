import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemsRoutingModule } from './items-routing.module';
import { ItemsComponent } from './items.component';
import { ItemService } from './services/item.service';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [ItemsComponent],
  imports: [
    CommonModule,
    ItemsRoutingModule,
    MaterialModule
  ],
  providers: [
    ItemService
  ]
})
export class ItemsModule { }
