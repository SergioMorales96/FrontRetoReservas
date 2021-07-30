import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { DateValidationType } from '../../../utils/enums';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { setFloorNumber, setPeopleNumber, setWorkstation,setContinue, setSymptoms, setSteps, setReservationId } from '../reservation.actions';
import {
  Reservation,
  ReservationResponse,
} from 'src/app/reservations/interfaces/reservations.interface';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ReservationsService } from 'src/app/reservations/services/reservations.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { ToastsService } from 'src/app/services/toasts.service';
import * as moment from 'moment';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss'],
})
export class ReservationFormComponent implements OnInit {
  reservaForm!: FormGroup;
  step: number;
  submitted: boolean;
  numPersonas!: number;
  meanOfTransportStr!: string;
  public floorId!: number;
  public numberPersons!: number;
  public validationType!: DateValidationType;
  workstationInfo!: FormGroup;
  dateInfo!: FormGroup;
  assistantInfo!: FormGroup;
  selectedDate!: Date | string;
  timePeriod!: number;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private store: Store<AppState>,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private reservationService: ReservationsService,
    private router: Router,
    private toastService: ToastsService,
    private alertsService: AlertsService
  ) {
    this.step = 1;
    this.submitted = false;
    this.store.dispatch( setSteps({step: this.step}) );
  }

  ngOnInit(): void {
    this.reservaForm = this.fb.group({
      //Puesto - Step 1
      puestoInfo: this.fb.group({
        piso: [18, Validators.required],
        reserva: [1, Validators.required],
        personasReserva: [1, Validators.required],
        datosAcompanante: this.fb.array([]),
        medioTransporte: [null],
        placa: [
          '',
          [
            Validators.maxLength(7),
            Validators.pattern(/^[a-zA-Z]{3}-[0-9]{2}[a-zA-Z0-9]{1}$/),
          ],
        ],
      }),
      //Fecha - Step 2
      fechaInfo: this.fb.group({
        periodoTiempo: [null],
        fecha: [null,Validators.required],
      }),
      //Fecha - Step 3
      asistenteInfo: this.fb.group({
        nombres: ['', Validators.required],
        identificacion: ['', Validators.required],
        grupoRiesgo: ['No Aplica', Validators.required],
        convivenciaRiesgo: ['No', Validators.required],
        sintomas: ['No', Validators.required],
        descripcion: ['', Validators.required],
      }),
    });
    //console.log(this.reservaForm.get('personasReserva')?.value);
    this.store.dispatch( setFloorNumber({ floorNumber: 18}) );
    this.store.dispatch( setPeopleNumber({ peopleNumber: 1}) );
    this.store.dispatch( setSymptoms({ symptoms: 'No'}) );

  
    this.workstationInfo = this.reservaForm.get('puestoInfo') as FormGroup;
    this.dateInfo = this.reservaForm.get('fechaInfo') as FormGroup;
    this.assistantInfo = this.reservaForm.get('asistenteInfo') as FormGroup;

    this.store.dispatch(setFloorNumber({ floorNumber: 18 }));
    this.store.dispatch(setPeopleNumber({ peopleNumber: 1 }));
    this.store.dispatch(
      setReservationId({
        reservationId: this.workstationInfo.controls['reserva'].value,
      })
    );

    this.store.select('reservation').subscribe((reservation) => {
      this.selectedDate = reservation.selectedDateSummary;
      const selectedDate = moment(this.selectedDate).format('DD-MM-yyyy');
      this.timePeriod = reservation.timePeriod;

      this.dateInfo.controls['fecha'].setValue(selectedDate);
      this.dateInfo.controls['periodoTiempo'].setValue(this.timePeriod);
    });
    
  }

  get transportModeName(): string {
    switch (this.workstationInfo.controls['medioTransporte'].value) {
      case DateValidationType.ParkingAvailabilityPerBicycle:
        return 'B';
      case DateValidationType.ParkingAvailabilityPerCar:
        return 'C';
      case DateValidationType.ParkingAvailabilityPerMotorcycle:
        return 'M';
      default:
        return 'NA';
    }
  }

  

  reservation: Reservation = {
    dia: '11-01-0020',
    horaInicio: '8:00',
    horaFin: '10:00',
    totalHoras: 8,
    dominioTipoVehiculo: 'M',
    placa: 'ATA004',
    emailUsuario: 'correo@correo.com',
    proyecto: 'SEMILLA_2021_2',
    idPuestoTrabajo: 5,
    idRelacion: 1,
    tipoReserva: 'PUESTO',
    emailsAsistentes: 'prueba@gmail.com, con@con.con, testeoeo@asw.xx',
  };

  addReservation(reservation: Reservation) {
    this.reservationService
      .addReservation(reservation)
      .subscribe((reservationResponse: ReservationResponse) => {
        if (reservationResponse.status === `OK`) {
          this.alertsService
            .showConfirmDialog({
              message: `Se ha realizado la reserva con éxito, recuerda que si no se cumplen las reservas, existirá una penalización para poder realizar futuras reservas.`,
              header: 'Creación de reserva ',
            })
            .then((resp) => {
              if (resp)
                this.toastService.showToastSuccess({
                  summary: 'Reserva creada',
                  detail: `Se creó la reserva exitosamente`,
                });
              else {
                return;
              }
            })
            .catch(console.log);
        } else if (reservationResponse.status === `INTERNAL_SERVER_ERROR`) {
          this.alertsService
            .showConfirmDialog({
              message: `Ups... No fue posible crear la reserva :(`,
              header: 'Error en la creación de la reserva ',
            })
            .then((resp) => {
              if (resp)
                this.toastService.showToastDanger({
                  summary: 'Reserva NO creada',
                  detail: `No se pudo crear la reserva`,
                });
              else {
                return;
              }
            });
        }
      });
  }

  submit() {
    this.submitted = true;
    this.store.dispatch(setContinue({ continuar: true }));
    switch (this.step) {
      case 1:
        if (this.reservaForm.controls.puestoInfo.invalid) {
          return;
        } else {
          this.submitted = false;
        }
        break;
      case 2:
        if (this.reservaForm.controls.fechaInfo.invalid) {
          return;
        } else this.submitted = false;
        break;
      case 3:
        if (this.reservaForm.controls.asistenteInfo.invalid) {
          return;
        } else {
          this.submitted = false;
        }
        break;
    }
    this.step += 1;    
    this.store.dispatch( setSteps({step: this.step}) );
    
    /*if (this.reservaForm.controls.puestoInfo.invalid && this.step == 1){
      return;
    }
    if (this.reservaForm.controls.fechaInfo.invalid && this.step == 2) {
      return;
    }
    this.step = this.step + 1;
    console.log(this.step);*/

    if (this.step == 4) {
      this.addReservation(this.reservation);
    }
  }

  previous() {
    this.step = this.step - 1;
    this.store.dispatch( setSteps({step: this.step}) );
  }

  /*next() {
  this.step = this.step + 1;
}*/
}
