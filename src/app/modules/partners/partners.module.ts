import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnersRoutingModule } from './partners-routing.module';
import { PartnersComponent } from './partners.component';
import { PartnerService } from './services/partner.service';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [PartnersComponent],
  imports: [
    CommonModule,
    PartnersRoutingModule,
    MaterialModule
  ],
  providers: [
    PartnerService
  ]
})
export class PartnersModule { }
