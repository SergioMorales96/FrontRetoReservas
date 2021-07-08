import { Component } from '@angular/core';
import { Schedule, NombreSucursal } from '../../../interfaces/admin.interfaces';
import { RouteName } from '../../../../../utils/enums';
import { SchedulesService } from '../../../services/schedules.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

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
  //schedules: Schedule[] = [];
  
  schedules: Schedule[] = [
    {
      "idHorario": 1,
      "idSucursal": 1,
      "numeroHoras": 4,
      "nombre": "Tarde",
      "horaFin": "18:00",
      "horaInicio": "14:00",
      "nombreSucursal": NombreSucursal.TorreSigma
    },
    {
      "idHorario": 2,
      "idSucursal": 1,
      "numeroHoras": 4,
      "nombre": "Mañana",
      "horaFin": "13:00",
      "horaInicio": "09:00",
      "nombreSucursal": NombreSucursal.TorreSigma
    },
    {
      "idHorario": 3,
      "idSucursal": 1,
      "numeroHoras": 4,
      "nombre": "Tarde",
      "horaFin": "10:00",
      "horaInicio": "09:00",
      "nombreSucursal": NombreSucursal.TorreSigma
    },
    {
      "idHorario": 4,
      "idSucursal": 1,
      "numeroHoras": 4,
      "nombre": "Tarde",
      "horaFin": "20:00",
      "horaInicio": "19:00",
      "nombreSucursal": NombreSucursal.TorreSigma
    },
    {
      "idHorario": 5,
      "idSucursal": 1,
      "numeroHoras": 4,
      "nombre": "Mañana",
      "horaFin": "10:00",
      "horaInicio": "09:00",
      "nombreSucursal": NombreSucursal.TorreSigma
    },
    {
      "idHorario": 6,
      "idSucursal": 1,
      "numeroHoras": 4,
      "nombre": "Tarde",
      "horaFin": "18:00",
      "horaInicio": "14:00",
      "nombreSucursal": NombreSucursal.TorreSigma
    },
    {
      "idHorario": 7,
      "idSucursal": 1,
      "numeroHoras": 4,
      "nombre": "Tarde",
      "horaFin": "10:00",
      "horaInicio": "09:00",
      "nombreSucursal": NombreSucursal.TorreSigma
    },
    {
      "idHorario": 8,
      "idSucursal": 1,
      "numeroHoras": 4,
      "nombre": "Tarde",
      "horaFin": "18:00",
      "horaInicio": "14:00",
      "nombreSucursal": NombreSucursal.TorreSigma
    },
    {
      "idHorario": 9,
      "idSucursal": 1,
      "numeroHoras": 4,
      "nombre": "Tarde",
      "horaFin": "18:00",
      "horaInicio": "14:00",
      "nombreSucursal": NombreSucursal.TorreSigma
    },
    {
      "idHorario": 10,
      "idSucursal": 1,
      "numeroHoras": 4,
      "nombre": "Tarde",
      "horaFin": "18:00",
      "horaInicio": "14:00",
      "nombreSucursal": NombreSucursal.TorreSigma
    },
    {
      "idHorario": 11,
      "idSucursal": 1,
      "numeroHoras": 4,
      "nombre": "Tarde",
      "horaFin": "18:00",
      "horaInicio": "14:00",
      "nombreSucursal": NombreSucursal.TorreSigma
    }
  ];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private schedulesService: SchedulesService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    //this.getSchedules();
  }

  deleteSchedule(id: number) {
    console.log(id);
    this.confirmationService.confirm({
      message: '¿Estás seguro de eliminar el Horario ' + id + '?',
      header: 'Confirmación de Eliminado',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.schedules = this.schedules.filter(val => val.idHorario !== this.schedules[0].idHorario);
        this.messageService.add({ severity: 'success', summary: 'Exitoso!', detail: 'Horario Eliminado', life: 3000 });
      }
    });
  }

  confirmPosition(position: string) {
    this.position = position;
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.msgs = [{ severity: 'info', summary: 'Confirmado', detail: 'Horario eliminado', life: 3000 }];
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rechazado', detail: 'Lo acabaste de rechazar', life: 3000 }];
      },
      key: "positionDialog"
    });
  }

  getSchedules() {
    this.schedulesService.getSchedules().subscribe(data => {
      this.schedules = data;
      this.schedules.forEach(schedule => schedule.nombreSucursal = NombreSucursal.TorreSigma);
      console.log(`Nombre del primer registro de la tabla: ${this.schedules[0]. nombre}`);
    })
  }
  getSchedule() {

  }
  eraseSchedule() {

  }
  addSchedule() {

  }
  updateSchedule() {

  }
}
