import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { SidebarModule } from 'primeng/sidebar';
import { MenubarModule } from 'primeng/menubar';
import { RippleModule } from 'primeng/ripple';
import { ProgressBarModule } from 'primeng/progressbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';

import * as shared from './components';
import { ConfirmationService } from 'primeng/api';
import { PartnerFormComponent } from './components/partner-form/partner-form.component';

const primeModules = [
  CardModule,
  InputTextModule,
  ButtonModule,
  MessagesModule,
  MessageModule,
  ToastModule,
  ToolbarModule,
  SidebarModule,
  MenubarModule,
  RippleModule,
  ProgressBarModule,
  ConfirmDialogModule,
  ChartModule,
  TableModule,
  ContextMenuModule,
  DialogModule
];

@NgModule({
  declarations: [
    ...shared.components,
    PartnerFormComponent
  ],
  imports: [
    CommonModule,
    ...primeModules
  ],
  exports: [
    ...primeModules,
    ...shared.components
  ],
  providers: [
    ConfirmationService
  ]
})
export class SharedModule { }
