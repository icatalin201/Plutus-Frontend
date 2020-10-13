import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { MaterialModule } from '../material/material.module';
import { CreateBusinessComponent } from './components/create-business/create-business.component';
import { CreateSerialComponent } from './components/create-serial/create-serial.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BusinessService } from './services/business.service';

@NgModule({
  declarations: [SettingsComponent, CreateBusinessComponent, CreateSerialComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    BusinessService
  ]
})
export class SettingsModule { }
