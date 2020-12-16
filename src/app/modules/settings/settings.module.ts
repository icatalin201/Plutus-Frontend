import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BusinessService } from './services/business.service';
import { BusinessComponent } from './components/business/business.component';
import { SerialComponent } from './components/serial/serial.component';
import { SerialService } from './services/serial.service';

@NgModule({
  declarations: [SettingsComponent, BusinessComponent, SerialComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    BusinessService,
    SerialService
  ]
})
export class SettingsModule { }
