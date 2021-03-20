import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewPartnersRoutingModule } from './view-partners-routing.module';
import { ViewPartnersComponent } from './view-partners.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ViewPartnersComponent],
  imports: [
    CommonModule,
    ViewPartnersRoutingModule,
    SharedModule
  ],
})
export class ViewPartnersModule { }
