import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnersRoutingModule } from './partners-routing.module';
import { PartnersComponent } from './partners.component';
import { PartnerService } from './services/partner.service';
import { MaterialModule } from '../material/material.module';
import { CreatePartnerComponent } from './components/create-partner/create-partner.component';
import { EditPartnerComponent } from './components/edit-partner/edit-partner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PartnersComponent, CreatePartnerComponent, EditPartnerComponent],
  imports: [
    CommonModule,
    PartnersRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    PartnerService
  ]
})
export class PartnersModule { }
