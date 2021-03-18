import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    CardModule,
    InputTextModule,
    ButtonModule,
    MessagesModule,
    MessageModule,
    ToastModule
  ],
})
export class SharedModule { }
