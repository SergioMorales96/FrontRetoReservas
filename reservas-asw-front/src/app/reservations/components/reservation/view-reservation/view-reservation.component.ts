import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { DatesReservation, ReservationResponse, DataUsersBlock } from '../../../../admin/interfaces/reservation';
import { ReservationAction, RouteName } from '../../../../../utils/enums';
import { ReservationsService } from '../../../../admin/services/reservation.service';
import { tap } from 'rxjs/operators';
import * as moment from 'moment';
@Component({
  selector: 'app-view-reservation',
  templateUrl: './view-reservation.component.html',
  styleUrls: ['./view-reservation.component.scss']
})
export class ViewReservationComponent implements OnInit {

  @Output() onAction: EventEmitter<ReservationAction> = new EventEmitter<ReservationAction>();
  @Output() onCurrentReservation: EventEmitter<DatesReservation> = new EventEmitter<DatesReservation>();

  datesReservation: DatesReservation[];
  currentPosition: number;
  counterDays: number;
  routeName = RouteName;
  lockedUsersReservation: DataUsersBlock[];
  lockedUser: DataUsersBlock | undefined;
  usersMap = {
    '=0': 'No hay personas',
    '=1': '1 persona',
    'other': '# personas',
  };
  remainingDays: number;

  get brandOrPlate(): string {
    const typeDomainVehicle = this.currentReservation?.dominioTipoVehiculo

    if (typeDomainVehicle === 'M' || typeDomainVehicle === 'C') {
      return 'Placa'
    }
    else if (typeDomainVehicle === 'B') {
      return 'N/A'
    }
    else {
      return 'No se registró vehiculo'
    }
  }

  get canShowNext(): boolean {
    return this.datesReservation.length - 1 > this.currentPosition;
  }

  get canShowPreview(): boolean {
    return this.currentPosition - 1 >= 0;
  }

  get currentReservation(): DatesReservation {
    return this.datesReservation[this.currentPosition];
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
        return 'bicycle.svg';
      case 'M':
        return 'motorcycle.svg'
      case 'C':
        return 'car.svg'
      default:
        return 'N/A'
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
        return 'No se registro vehiculo'
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

  get showReservations(): boolean {
    return !this.lockedUser;
  }

  constructor(
    private reservationsService: ReservationsService
  ) {
    this.lockedUsersReservation = [];
    this.datesReservation = [];
    this.currentPosition = 0;
    this.counterDays = 0;
    this.remainingDays = 0;
  }

  ngOnInit(): void {
    this.getRervations(this.getData());
    this.getLockedUsers();
  }

  getData() {
    return {
      startDate: '11-07-2021',
      endDate: '14-07-2021',
      // startDate: moment().format('DD-MM-YYYY'),
      // endDate: moment().add(1, 'w').format('DD-MM-YYYY'),
      email: 'user6@asesoftware.com'
    }
  }

  getRervations({ startDate, endDate, email }: { startDate: string, endDate: string, email: string }): void {
    this.reservationsService.getReservations(startDate, endDate, email)
      .pipe(
        tap(console.log)
      )
      .subscribe(
        (ReservationResponse: ReservationResponse) => {
          this.datesReservation = ReservationResponse.data;
          this.datesReservation = this.datesReservation.filter(reservation => reservation.dominioEstado.toUpperCase() === 'R')
          console.log(this.datesReservation);

          this.onCurrentReservation.emit(this.currentReservation);
        }
      )
  }

  getCounterDays( dateLocked: string ): number {
    console.log({dateLocked});
    
    const startDate = moment();
    const endDate = moment( dateLocked );
    console.log({startDate});
    console.log({endDate});
    console.log(endDate.diff( startDate, 'days' ));
    
    return endDate.diff( startDate, 'days' );
  }


  getLockedUsers() {
    this.reservationsService.getLockedUsers()
      .subscribe(response => {
        this.lockedUsersReservation = this.transformLockedUsers( response.data );
        console.log(this.lockedUsersReservation);
        
        this.lockedUser = this.lockedUsersReservation.find( user => user.email === this.getData().email && user.remainingDays > 0);
        console.log(this.lockedUser);
      });

  }

  transformLockedUsers( users: DataUsersBlock[] ): DataUsersBlock[] {
    return users.map(d => ({ 
      ...d, 
      bloqueadoHasta: '07/31/2021',
      remainingDays: this.getCounterDays( '07/31/2021' )
    }));
  }


  showEditReservation(): void {
    this.onAction.emit(ReservationAction.Edit);
  }

  showReservation(value: number): void {
    this.currentPosition = this.currentPosition + value;
    this.onCurrentReservation.emit(this.currentReservation);
  }
}
