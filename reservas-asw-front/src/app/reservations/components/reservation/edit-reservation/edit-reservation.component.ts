import { AlertsService } from '../../../../services/cancelReservation.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatesReservation, ReservationResponse, DatesReservationClass } from '../../../../admin/interfaces/reservation';
import { ReservationAction } from 'src/utils/enums';
import { ReservationsService } from '../../../../admin/services/reservation.service';
import { RouteName } from '../../../../../utils/enums';
import { tap } from 'rxjs/operators';
import { ToastsService } from '../../../../services/toasts.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { setEditReservation, setReservationList } from '../../../../shared/reservation.actions';

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.scss']
})
export class EditReservationComponent {

  currentReservation!: DatesReservation ;  
  datesReservationList: DatesReservation[]=[];
  datesReservation: DatesReservation[] = [];
  currentPosition: number = 0;
  routeName = RouteName;
  usersMap = {
    '=0': 'No hay personas',
    '=1': '1 persona',
    'other': '# personas',
  };

  get brandOrPlate(): string {
    const typeDomainVehicle = this.currentReservation?.dominioTipoVehiculo

    if(typeDomainVehicle === 'M' || typeDomainVehicle === 'C'){
      return 'Placa'
    }
    else if(typeDomainVehicle === 'B'){
      return 'N/A'
    }
    else {
      return 'No se registró vehiculo'
    }
  }

  get reservationDate(): string {
    const date = this.currentReservation?.dia?.split('-');
    return `${date[0]}/${date[1]}/${date[2]}`;
  }

  get salaOrJob(): string {
    return this.currentReservation.idSala
      ? this.currentReservation.nombreSala
      : this.currentReservation.nombrePuesTrabajo;
  }

  get transportMedia(): string {
    const vehicleType = this.currentReservation.dominioTipoVehiculo;
    switch (vehicleType) {
      case 'B':
        return 'assets/images/icons/bicycle.svg';
      case 'M':
        return 'assets/images/icons/motorcycle.svg';
      case 'C':
        return 'assets/images/icons/car.svg';
      default:
        return ' ';
    }
  }

  get typeVehicle(): string {
    const vehicleType = this.currentReservation.dominioTipoVehiculo;
    switch (vehicleType) {
      case 'B':
        return 'Bicicleta';
      case 'M':
        return 'Moto'
      case 'C':
        return 'Carro'
      default:
        return 'N/A'
    }
  }

  get workStationMedia(): string {
    const asistentsNumber = this.currentReservation.numeroAsistentes;
    if (asistentsNumber > 1) {
      return 'workbench.svg'
    }
    else {
      return 'workstation.svg'
    }
  }

  constructor(
    private cancelReservationService: AlertsService,
    private reservationsService: ReservationsService,
    private toastService: ToastsService,
    private store :Store<AppState>

  ) { }

  ngOnInit(): void {
    this.getRervations(this.getData());
    this.store
      .select('reservation')
      .subscribe( reservation =>{
        this.currentReservation = reservation.reservation || new DatesReservationClass();
        this.datesReservationList = reservation.reservationList;
      })  
  }

  getData() {
    return {
      startDate: '01-08-2021',
      endDate: '14-08-2021',
      // startDate: moment().format('DD-MM-YYYY'),
      // endDate: moment().add(1, 'w').format('DD-MM-YYYY'),
      email: 'correoJuan@correo.com'
    }
  }

  getRervations({ startDate, endDate, email }: { startDate: string, endDate: string, email: string }): void {
    this.reservationsService.getReservations(startDate, endDate, email)
      .pipe(
        tap(console.log)
      )
      .subscribe(
        (ReservationResponse: ReservationResponse) => this.datesReservation = ReservationResponse.data
      )
  }


  cancelReservation():void{
    this.cancelReservationService.showConfirmDialog({
      message: '¿Desea cancelar la reserva, esta acción no se podrá revertir?',
      header: 'Cancelar reserva',
    })
      .then(resp => {
        if (resp) {
          this.reservationsService.cancelReservation(this.currentReservation.numeroReserva)
            .subscribe(
              (reservationReponse: ReservationResponse) => {
                this.datesReservationList = this.datesReservationList.filter((datesReservation: DatesReservation) => datesReservation.numeroReserva !== this.currentReservation.numeroReserva);
                this.toastService.showToastSuccess({ summary: 'Reserva cancelada', detail: 'La reserva ha sido cancelada correctamente.' });
                this.store.dispatch(setReservationList({reservationList:this.datesReservationList}))
                this.showReservation1();
              }
            ); 


        } else {
          return;
        }
      })
    .catch(console.log);
  }

  showReservation(value: number): void {
    this.currentPosition = this.currentPosition + value;
  }

  showReservation1(): void {
    this.store.dispatch(setEditReservation({isEditReservation: false}));   
  }
}
function deleteReservation(arg0: { reservationList: DatesReservation[]; }): any {
  throw new Error('Function not implemented.');
}

