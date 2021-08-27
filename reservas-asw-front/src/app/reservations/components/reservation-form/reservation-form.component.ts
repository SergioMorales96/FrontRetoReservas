import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { DateValidationType, RouteName } from '../../../../utils/enums';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { setFloorNumber, setContinue, setSteps, setReservationId, setPeopleNumber, setIsEditingReservation, setSelectedDate, setDisplay } from '../../reservation.actions';
import {
  Reservation,
  ReservationResponse,
} from 'src/app/reservations/interfaces/reservations.interface';
import { ReservationsService } from 'src/app/reservations/services/reservations.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { ToastsService } from 'src/app/services/toasts.service';
import * as moment from 'moment';
import { DatesReservation } from 'src/app/admin/interfaces/reservation';
import { DataResponse } from '../../interfaces/reservations.interface';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss'],
})
export class ReservationFormComponent implements OnInit {
  reservaForm!: FormGroup;
  step!: number;
  submitted: boolean;
  isEdit!: boolean;
  numPersonas!: number;
  meanOfTransportStr!: string;
  public floorId!: number;
  public numberPersons!: number;
  public validationType!: DateValidationType;
  workstationGroup!: FormGroup;
  dateGroup!: FormGroup;
  assistantGroup!: FormGroup;
  workstationInfo!: FormGroup;
  dateInfo!: FormGroup;
  assistantInfo!: FormGroup;
  selectedDate!: Date | string;
  timePeriod!: number;
  startTime!: string;
  endTime!: string;
  emails!: string;
  emailString: string = '';
  reservationType!: string;
  reservationId!: number;
  IsWorkstation!: boolean;
  routeName = RouteName;
  currentReservation!: DatesReservation | null;
  valueFloor!: number | undefined;
  @Output() view = new EventEmitter<number>();
  display: boolean = true;
  

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private reservationService: ReservationsService,
    private toastService: ToastsService,
    private alertsService: AlertsService,

  ) {
    this.submitted = false;
  }

  ngOnInit(): void {

    this.store.dispatch(setIsEditingReservation({isEditingReservation : true}));

    this.store.select('reservation').subscribe((reservation) => {
      
      this.step=reservation.step;    
      this.currentReservation = reservation.reservation;   
       
    });

    this.store.select('editReservation').subscribe((editReservation) => {

      this.isEdit = editReservation.isEdit;

    });

    this.store.dispatch(setSteps({ step: this.step }));

    this.reservaForm = this.fb.group({
      //Workstation - Step 1
      puestoInfo: this.fb.group({
        piso: [18, Validators.required],
        reserva: [0, [Validators.required,Validators.min(1)]],
        personasReserva: [1, Validators.required],
        datosAcompanante: this.fb.array([
          this.fb.group({
            correo: [
              'correoUsuario@correo.com',
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
            Validators.pattern(/^[a-zA-Z]{3}[0-9]{2}[a-zA-Z0-9]{1}$/),
          ],
        ],
      }),
      //Date - Step 2
      fechaInfo: this.fb.group({
        periodoTiempo: ['', [Validators.required, Validators.min(0.4)]],
        fecha: [null, [Validators.required, Validators.pattern(/^(0[1-9]|[1-2][0-9]|3[0-1])\-(0[1-9]|1[0-2])\-[0-9]{4}$/)]],
      }),
      //Assistant Info - Step 3
      asistenteInfo: this.fb.group({
        nombres: ['JUAN JOSE ARANGO', Validators.required],
        identificacion: [1098123456, [Validators.required, Validators.min(1), Validators.minLength(8), Validators.maxLength(8)]],
        //grupoRiesgo: ['No Aplica', Validators.required],
        //convivenciaRiesgo: ['No', Validators.required],
        sintomas: ['No', Validators.required],
        descripcion: [,],
      }),
    });

    this.workstationGroup = this.reservaForm.get('puestoInfo') as FormGroup;
    this.dateGroup = this.reservaForm.get('fechaInfo') as FormGroup;
    this.assistantGroup = this.reservaForm.get('asistenteInfo') as FormGroup;    
   

    this.store.select('reservation').subscribe((reservation) => {

      this.selectedDate = reservation.selectedDateSummary;
      const selectedDate = moment(this.selectedDate).format('DD-MM-yyyy');
      this.timePeriod = reservation.timePeriod;
      this.startTime = reservation.startTime;
      this.endTime = reservation.endTime;
      this.reservationId = reservation.reservationId;
      this.workstationGroup.controls['personasReserva'].setValue(reservation.peopleNumber);
      this.dateGroup.controls['fecha'].setValue(selectedDate);
      Number(this.timePeriod != 0) ? this.dateGroup.controls['periodoTiempo'].setValue(this.timePeriod) : 0
      Number(this.reservationId != 0) ? this.workstationGroup.controls['reserva'].setValue(this.reservationId): 0;
      
      this.editValues(this.isEdit, this.currentReservation); 
      this.isEdit = false;
      this.step=reservation.step;     
       
    });

    this.store.dispatch(setFloorNumber({ floorNumber: this.workstationGroup.controls['piso'].value }));
    //this.store.dispatch(setPeopleNumber({ peopleNumber : this.workstationGroup.controls['personasReserva'].value }));
  } 

  ngOnDestroy(): void{
    this.store.dispatch(setIsEditingReservation({isEditingReservation : false}))
  }

  editValues(editValues: boolean, currentReservation?: DatesReservation | null):any{
   
    if(editValues){
      this.workstationGroup.controls['piso'].setValue(currentReservation?.numeroPiso);
      this.workstationGroup.controls['reserva'].setValue(currentReservation?.idPuestoTrabajo ? currentReservation?.idPuestoTrabajo : currentReservation?.idSala);
      this.workstationGroup.controls['personasReserva'].setValue(currentReservation?.numeroAsistentes == 0 ? 1 : currentReservation?.numeroAsistentes);
      //this.workstationGroup.controls['datosAcompanante'].setValue(currentReservation?.);
      this.workstationGroup.controls['medioTransporte'].setValue(this.getTransportModeNumber(currentReservation?.dominioTipoVehiculo));
      this.workstationGroup.controls['placa'].setValue(currentReservation?.placa);  
      this.dateGroup.controls['periodoTiempo'].setValue(currentReservation?.totalHoras);  
      this.dateGroup.controls['fecha'].setValue(currentReservation?.dia); 
    } 

}


getTransportModeNumber(transportDomain: string | undefined): number | null {

  switch (transportDomain) {
    case 'B':
      return DateValidationType.ParkingAvailabilityPerBicycle;
    case 'C':
      return DateValidationType.ParkingAvailabilityPerCar;
    case 'M':
      return DateValidationType.ParkingAvailabilityPerMotorcycle;
    default:
      return null;  
  }

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

  get Emails() {

    for (let i of this.peopleData.controls) {
      const a = i.get('correo') as FormControl;
      this.emailString = this.emailString + a.value + ',';
    }
    return this.emailString;

  }

  get ReservationType(): string {

    Number(this.workstationGroup.controls['personasReserva'].value) === 1 ?
      this.reservationType = 'PUESTO' :
      this.reservationType = 'SALA';

    return this.reservationType;

  }

  getReservationFormValue(): Reservation {

    return {
      id: this.currentReservation?.numeroReserva,
      dia: this.reservaForm.value.fechaInfo.fecha,
      horaInicio: this.startTime,
      horaFin: this.endTime,
      totalHoras: this.timePeriod,
      dominioTipoVehiculo: this.transportModeName,
      placa: String(this.reservaForm.value.puestoInfo.placa).toUpperCase(),
      emailUsuario: 'correoUsuario@correo.com', // Dato por SESION
      proyecto: 'SEMILLA_2021_2', // no hay opcion de seleccionar proyecto
      idRelacion: this.reservaForm.value.puestoInfo.reserva,
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

  editReservation() {   
    this.reservationService
      .editReservation(this.getReservationFormValue())
      .subscribe((reservationResponse: ReservationResponse) => {
        if (reservationResponse.status === `OK`) {
          this.alertsService
            .showConfirmDialog({
              message: `Se ha editado la reserva con éxito, recuerda que si no se cumplen las reservas, existirá una penalización para poder realizar futuras reservas.`,
              header: 'Edición de reserva ',
            })
            .then((resp) => {
              if (resp)
                this.toastService.showToastSuccess({
                  summary: 'Reserva editada',
                  detail: `Se editó la reserva exitosamente`,
                });
              else {
                return;
              }
            })
            .catch(console.log);
        } else if (reservationResponse.status === `INTERNAL_SERVER_ERROR`) {
          this.alertsService
            .showConfirmDialog({
              message: `Ups... No fue posible editar la reserva :(`,
              header: 'Error en la edición de la reserva ',
            })
            .then((resp) => {
              if (resp)
                this.toastService.showToastDanger({
                  summary: 'Reserva NO editada',
                  detail: `No se pudo editar la reserva`,
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
        if ((this.reservaForm.controls.puestoInfo.invalid) || 
        ((this.workstationGroup.controls['medioTransporte'].value == 1 && this.workstationGroup.controls['placa'].value == '')
        ||  (this.workstationGroup.controls['medioTransporte'].value == 2 && this.workstationGroup.controls['placa'].value == ''))) 
           return;
           else this.submitted = false; 
        break;
      case 2:
        if (this.reservaForm.controls.fechaInfo.invalid) return; else this.submitted = false;
        break;
      case 3:
        if (this.reservaForm.controls.asistenteInfo.invalid) return; else this.submitted = false;
        break;
    }
    this.step += 1;
    this.store.dispatch(setSteps({ step: this.step }));

    if (this.step == 4) {   
      this.currentReservation?.numeroReserva ? this.editReservation() : this.addReservation();    
      this.store.dispatch( setSteps({step: 1}) ); 
      this.store.dispatch( setIsEditingReservation({isEditingReservation: false}) );
    }

  }

  previous() {

    this.step = this.step - 1;
    this.store.dispatch(setSteps({ step: this.step }));
    if (this.step === 1) {
      this.dateGroup.controls['fecha'].setValue('Invalid date');
      let clearDate = new Date('Invalid date');
      this.store.dispatch(setSelectedDate({ selectedDateSummary: clearDate }));
    }
  }

  changeFormDisplay(display: boolean): void {
    this.display = display;
    this.store.dispatch(setDisplay({ display: this.display }));
  }

}