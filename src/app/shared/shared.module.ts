import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import * as shared from './components';
import * as prime from './prime';

import { ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [
    ...shared.components,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ...prime.modules
  ],
  exports: [
    ...prime.modules,
    ...shared.components,
    FormsModule
  ],
  providers: [
    ConfirmationService
  ]
})
export class SharedModule { }
