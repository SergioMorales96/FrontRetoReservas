import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastProperty, ToastSeverity } from '../interfaces/app.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ToastsService {

  constructor(
    private messageService: MessageService
  ) { }

  showToastSuccess(prop: ToastProperty): void {
    this.messageService.add({
      severity: ToastSeverity.success,
      summary: prop.summary, 
      detail: prop.detail,
    });
  }

  showToastInfo(prop: ToastProperty): void {
    this.messageService.add({
      severity: ToastSeverity.info,
      summary: prop.summary, 
      detail: prop.detail,
    });
  }

  showToastWarning(prop: ToastProperty): void {
    this.messageService.add({
      severity: ToastSeverity.warn,
      summary: prop.summary, 
      detail: prop.detail,
    });
  }

  showToastDanger(prop: ToastProperty): void {
    this.messageService.add({
      severity: ToastSeverity.error,
      summary: prop.summary, 
      detail: prop.detail,
    });
  }
}
