import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnersRoutingModule } from './partners-routing.module';
import { PartnersComponent } from './partners.component';
import { PartnerService } from './services/partner.service';


@NgModule({
  declarations: [PartnersComponent],
  imports: [
    CommonModule,
    PartnersRoutingModule,
  ],
  providers: [
    PartnerService
  ]
})
export class PartnersModule { }
