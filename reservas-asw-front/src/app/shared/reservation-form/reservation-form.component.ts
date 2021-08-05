import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { DateValidationType } from '../../../utils/enums';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import {
  setFloorNumber,
  setPeopleNumber,
  setContinue,
  setWorkstation,
  setReservationId,
} from '../reservation.actions';
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
import { JsonpClientBackend } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ViewAdminComponent } from '../../admin/pages/admins/view/view-admin.component';

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
  workstationGroup!: FormGroup;
  dateGroup!: FormGroup;
  assistantGroup!: FormGroup;
  selectedDate!: Date;
  timePeriod!: number;
  startTime!: string;
  endTime!: string;
  emails!: string;
  emailString: string = '';
  reservationType!: string;
  reservationId!: number;

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
  }

  ngOnInit(): void {

    this.reservaForm = this.fb.group({
      //Workstation - Step 1
      puestoInfo: this.fb.group({
        piso: [18, Validators.required],
        reserva: [1, Validators.required],
        personasReserva: [1, Validators.required],
        datosAcompanante: this.fb.array([
          this.fb.group({
            correo: [
              'correousuario@correo.com',
              [
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$'),
              ],
            ],
            miembroOrganizacion: [true, Validators.required],
          })
          
        ]),
        medioTransporte: [null],
        placa: [
          '',
          [
            Validators.maxLength(7),
            Validators.pattern(/^[a-zA-Z]{3}-[0-9]{2}[a-zA-Z0-9]{1}$/),
          ],
        ],
      }),
      //Date - Step 2
      fechaInfo: this.fb.group({
        periodoTiempo: [null, [Validators.required, Validators.min(0.4)]],
        fecha: [null, Validators.required],
      }),
      //Assistant Info - Step 3
      asistenteInfo: this.fb.group({
        nombres: ['NOMBRE APELLIDO', Validators.required],
        identificacion: [123456789, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
        grupoRiesgo: ['No Aplica', Validators.required],
        convivenciaRiesgo: ['No', Validators.required],
        sintomas: ['No', Validators.required],
        descripcion: ['Barrio XXX, Tomo transporte público en..', Validators.required],
      }),
    });

    this.workstationGroup = this.reservaForm.get('puestoInfo') as FormGroup;
    this.dateGroup = this.reservaForm.get('fechaInfo') as FormGroup;
    this.assistantGroup = this.reservaForm.get('asistenteInfo') as FormGroup;    

    this.store.dispatch(setFloorNumber({ floorNumber: this.workstationGroup.controls['piso'].value }));
    this.store.dispatch(setPeopleNumber({ peopleNumber: this.workstationGroup.controls['personasReserva'].value }));
    this.store.dispatch(setReservationId({reservationId: this.workstationGroup.controls['reserva'].value}));

    this.store.select('reservation').subscribe((reservation) => {
      this.selectedDate = reservation.selectedDateSummary;
      const selectedDate = moment(this.selectedDate).format('DD-MM-yyyy');
      this.timePeriod = reservation.timePeriod;
      this.startTime = reservation.startTime;
      this.endTime = reservation.endTime;
      this.reservationId = reservation.reservationId;
  
      this.dateGroup.controls['fecha'].setValue(selectedDate);
      this.dateGroup.controls['periodoTiempo'].setValue(this.timePeriod);
    });
    
  } 

  get transportModeName(): string {

    switch (this.workstationGroup.controls['medioTransporte'].value) {
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

  get peopleData(): FormArray {

    return this.workstationGroup.controls['datosAcompanante'] as FormArray;

  }

  get Emails(){

    for(let i of this.peopleData.controls)
    {
      const a = i.get('correo') as FormControl;
      this.emailString = this.emailString+a.value+',';
    }
    return this.emailString;

  }

  get ReservationType(): string{

    Number(this.workstationGroup.controls['personasReserva'].value) === 1 ? 
    this.reservationType = 'PUESTO' : 
    this.reservationType = 'SALA';

    return this.reservationType;

  }

  getReservationFormValue(): Reservation {
   
    return {
      dia: this.reservaForm.value.fechaInfo.fecha,
      horaInicio: this.startTime,
      horaFin: this.endTime,
      totalHoras:  this.timePeriod,
      dominioTipoVehiculo: this.transportModeName,
      placa: this.reservaForm.value.puestoInfo.placa.replace('-', ''),
      emailUsuario: 'correoJuan@correo.com', // Dato por SESION
      proyecto: 'SEMILLA_2021_2', // no hay opcion de seleccionar proyecto
      idPuestoTrabajo: this.reservaForm.value.puestoInfo.reserva, // Enviar desde 3D
      idRelacion: 1, 
      tipoReserva: this.ReservationType,
      emailsAsistentes: this.Emails
    };

  }
  addReservation() {
    this.reservationService
      .addReservation(this.getReservationFormValue())
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
        if (this.reservaForm.controls.puestoInfo.invalid) return; else this.submitted = false; 
        break;
      case 2:
        if (this.reservaForm.controls.fechaInfo.invalid) return; else this.submitted = false;
        break;
      case 3:
        if (this.reservaForm.controls.asistenteInfo.invalid) return; else this.submitted = false;
        break;
    }

    this.step += 1;

    if (this.step == 4) {    
      this.addReservation();
    }

  }

  previous() {
    this.step = this.step - 1;
  }

  

}
