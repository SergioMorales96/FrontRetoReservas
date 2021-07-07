import { Component } from '@angular/core';
import { Schedule, DominioEstado, NombreSucursal } from '../../../interfaces/admin.interfaces';
import { RouteName } from '../../../../../utils/enums';

@Component({
  selector: 'app-list',
  templateUrl: './list-schedule.component.html',
  styles: [
  ]
})
export class ListScheduleComponent  {
  routeName = RouteName;
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
    
  ) {

  }

  deleteSchedule( id: number ): void {
    console.log( id );
  }

}
