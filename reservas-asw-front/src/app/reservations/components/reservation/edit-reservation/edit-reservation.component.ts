import { AlertsService } from '../../../../services/cancelReservation.service';
import { AppState } from 'src/app/app.reducer';
import { Component} from '@angular/core';
import { DatesReservation, ReservationResponse, DatesReservationClass } from '../../../../admin/interfaces/reservation';
import { ReservationsService } from '../../../../admin/services/reservation.service';
import { RouteName } from '../../../../../utils/enums';
import { setEditReservation, setReservation, setReservationList, setSteps, setDisplay } from '../../../reservation.actions';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { ToastsService } from '../../../../services/toasts.service';
import * as moment from 'moment';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.scss']
})
export class EditReservationComponent {

  currentPosition: number = 0;
  currentReservation!: DatesReservation ;  
  datesReservationList: DatesReservation[]=[];
  datesReservation: DatesReservation[] = [];
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
    private store :Store<AppState>,
    private router: Router
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
      startDate: moment().format('DD-MM-YYYY'),
      endDate: moment().endOf('month').format('DD-MM-YYYY'),
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

  sendStep(step: number): void{     
    this.store.dispatch( setSteps({step: step}) ); 
    this.router.navigate(["admin/addReservation"]);
    this.store.dispatch(setReservation({reservation: this.currentReservation}));
    this.store.dispatch(setDisplay({display: true}));
  }
   
}
function deleteReservation(arg0: { reservationList: DatesReservation[]; }): any {
  throw new Error('Function not implemented.');
}

