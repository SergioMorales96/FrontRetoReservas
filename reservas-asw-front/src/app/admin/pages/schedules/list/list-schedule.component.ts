import { Component } from '@angular/core';
import { Schedule, NombreSucursal, ScheduleResponse, SchedulesResponse } from '../../../interfaces/schedule.interfaces';
import { RouteName } from '../../../../../utils/enums';
import { SchedulesService } from '../../../services/schedules.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

import { AlertsService } from '../../../../services/alerts.service';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
  selector: 'app-list',
  templateUrl: './list-schedule.component.html',
  styleUrls: ['./list-schedule.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ListScheduleComponent {
  routeName = RouteName;
  msgs: Message[] = [];
  position: string = "";
  schedules: Schedule[] = [];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private schedulesService: SchedulesService,
    private alertsService: AlertsService,
    private toastService: ToastsService
  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getSchedules();
  }

  deleteSchedule(id: number) {
    this.eraseSchedule(id);
  }

  getSchedules() {
    this.schedulesService.getSchedules()
      .subscribe(
        (schedulesResponse: SchedulesResponse) => this.schedules = schedulesResponse.data
      );
  }

  eraseSchedule(id: number): void {
    this.alertsService.showConfirmDialog({
      message: `¿Desea eliminar el horario No. ${id}? ¡Esta acción no se podrá revertir!`,
      header: 'Eliminar horario',
    })
      .then(resp => {
        if (resp) {
          this.schedulesService.deleteSchedule(id)
            .subscribe(
              (scheduleResponse: ScheduleResponse) => {
                this.schedules = this.schedules.filter((schedule: Schedule) =>
                  schedule.idHorario !== id);
                this.toastService.showToastSuccess({ summary: 'Horario eliminado', detail: 'El horario ha sido eliminado correctamente.' });
              }
            );
        } else {
          return;
        }
      })
      .catch(console.log);
  }
}
