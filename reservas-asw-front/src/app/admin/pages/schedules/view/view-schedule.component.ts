import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Schedule, NombreSucursal } from '../../../interfaces/admin.interfaces';
@Component({
  selector: 'app-schedules',
  templateUrl: './view-schedule.component.html',
  styles: [
  ]
})
export class ViewScheduleComponent implements OnInit {
  schedule!: Schedule;

  get viewTitle(): string {
    return this.schedule.nombre ? this.schedule.nombre : 'Ver Horario';
  }

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(({ id }) => {
        if ( id ) {
          console.log( 'Horario id', id );

          this.schedule = {
            idHorario: 1,
            idSucursal:1,
            numeroHoras:2,
            nombre: "Media noche",
            horaFin: "02:00",
            horaInicio: "00:00",
            nombreSucursal:NombreSucursal.TorreSigma
          }
        }
      });
  }

}
