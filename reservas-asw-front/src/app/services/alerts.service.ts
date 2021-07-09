import { Injectable } from '@angular/core';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { ConfirmDialogProperty } from '../interfaces/app.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(
    private confirmationService: ConfirmationService
  ) { }

  showConfirmDialog(prop: ConfirmDialogProperty): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.confirmationService.confirm({
        message: prop.message,
        header: prop.header,
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          resolve(true);
        },
        reject: (type: ConfirmEventType) => {
          reject(false);
        }
      });
    });

  }
}

