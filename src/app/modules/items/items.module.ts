import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemsRoutingModule } from './items-routing.module';
import { ItemsComponent } from './items.component';
import { ItemService } from './services/item.service';
import { MaterialModule } from '../material/material.module';
import { CreateItemComponent } from './components/create-item/create-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditItemComponent } from './components/edit-item/edit-item.component';


@NgModule({
  declarations: [
    ItemsComponent, 
    CreateItemComponent, 
    EditItemComponent
  ],
  imports: [
    CommonModule,
    ItemsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    ItemService
  ]
})
export class ItemsModule { }
