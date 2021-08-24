import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../app.reducer';
import { ReservationsService } from '../../../services/reservations.service';
import { DataResponse } from '../../../interfaces/reservations.interface';


@Component({
  selector: 'app-form-date',
  templateUrl: './form-date.component.html',
  styleUrls: ['./form-date.component.scss'],
})
export class FormDateComponent implements OnInit {

  @Input() submitted!: boolean;
  @Input() formGroupName!: string;

  form!: FormGroup;
  capacity: number = 0;
  endTime!: string;
  startTime!: string;
  hora_i!: string;
  hora_f!: string;
  dateAforo!: string;
  responseAforo!: number | any;
  responseCapacityRoom!: number | any;
  responseAviableRoom!: number | any;
  responseCapacityfloor!: number | any;
  floor!: number;
  reservationId: number = 1;
  isWorkstation!: boolean;



  constructor(
    private rootFormGroup: FormGroupDirective,
    private store: Store<AppState>,
    private reservationService: ReservationsService,

  ) {
  }

  ngOnInit(): void {

    this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
    this.store.select('reservation').subscribe(async (reservation) => {
      this.isWorkstation = reservation.isWorkstation;
      this.endTime = reservation.endTime;
      this.startTime = reservation.startTime;
      this.reservationId = reservation.reservationId;
      this.floor = reservation.floorNumber;


      if (this.endTime && this.form.controls['fecha'].value != "Invalid date") {

        if (!this.isWorkstation) {
          this.responseAviableRoom = (await this.AforoSala())?.data;
          this.responseCapacityRoom = (await this.AforoDisponibilidadSala())?.data;
          this.capacity = this.responseCapacityRoom;
          if (this.responseAviableRoom != null) {
            this.capacity = 0;
          }
        } else {
          this.responseCapacityfloor = (await this.AforoPuesto()).data;
          this.capacity = this.responseCapacityfloor;
        }
      }
    });

  }
  AforoPuesto(): Promise<DataResponse> {

    this.dateAforo = this.form.controls['fecha'].value;
    this.hora_i = "01-01-1970 " + this.startTime.slice(0, 5) + ":00";
    this.hora_f = "01-01-1970 " + this.endTime.slice(0, 5) + ":00";
    return this.reservationService
      .aforoPuestos(this.dateAforo, this.hora_i, this.hora_f, this.floor)
      .toPromise();


  }

  AforoSala(): Promise<DataResponse> {
    this.dateAforo = this.form.controls['fecha'].value;

    this.hora_i = "01-01-1970 " + this.startTime.slice(0, 5) + ":00";
    this.hora_f = "01-01-1970 " + this.endTime.slice(0, 5) + ":00";
    return this.reservationService
      .aforoSalas(this.dateAforo, this.hora_i, this.hora_f, this.floor, this.reservationId)
      .toPromise();
  }

  AforoDisponibilidadSala(): Promise<DataResponse> {
    return this.reservationService
      .cantidadSalas(this.reservationId)
      .toPromise();
  }

}
