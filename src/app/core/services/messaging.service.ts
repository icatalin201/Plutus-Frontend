import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  constructor(
    private messageService: MessageService
  ) { }

  public sendError(
    title: string, 
    message: string
  ): void {
    this.messageService.add({
      key: 'info', 
      severity: 'error', 
      summary: title, 
      detail: message
    });
  }

  public sendInfo(
    title: string, 
    message: string
  ): void {
    this.messageService.add({
      key: 'info', 
      severity: 'info', 
      summary: title, 
      detail: message
    });
  }

  public sendWarn(
    title: string, 
    message: string
  ): void {
    this.messageService.add({
      key: 'info', 
      severity: 'warn', 
      summary: title, 
      detail: message
    });
  }

  public sendSuccess(
    title: string, 
    message: string
  ): void {
    this.messageService.add({
      key: 'info', 
      severity: 'success', 
      summary: title, 
      detail: message
    });
  }
}
