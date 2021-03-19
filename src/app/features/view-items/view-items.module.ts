import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewItemsRoutingModule } from './view-items-routing.module';
import { ViewItemsComponent } from './view-items.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ViewItemsComponent],
  imports: [
    CommonModule,
    ViewItemsRoutingModule,
    SharedModule
  ]
})
export class ViewItemsModule { }
