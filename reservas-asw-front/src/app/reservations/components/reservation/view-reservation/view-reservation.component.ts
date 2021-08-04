import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { DatesReservation, ReservationResponse, DataUsersBlock } from '../../../../admin/interfaces/reservation';
import { ReservationAction, RouteName } from '../../../../../utils/enums';
import { ReservationsService } from '../../../../admin/services/reservation.service';
import { tap } from 'rxjs/operators';
import * as moment from 'moment';

import {  Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { setReservation, setReservationList, setEditReservation } from '../../../../shared/reservation.actions';
@Component({
  selector: 'app-view-reservation',
  templateUrl: './view-reservation.component.html',
  styleUrls: ['./view-reservation.component.scss']
})
export class ViewReservationComponent implements OnInit {
  
  datesReservation: DatesReservation[] ;
  currentPosition: number;
  counterDays: number;
  dataUser: DataUsersBlock | undefined;
  dataUsersBlock: DataUsersBlock[];
  remainingDays: number;
  routeName = RouteName;
  usersMap = {
    '=0': 'No hay personas',
    '=1': '1 persona',
    'other': '# personas',
  };
  prueba!: boolean;
  datesRList!: DatesReservation[];

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

  get showReservations(): boolean {
    return !this.dataUser;
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
    private reservationsService: ReservationsService,
    private store :Store<AppState>
  ) {   
    this.dataUsersBlock = [];
    this.datesReservation = [];
    this.currentPosition = 0;
    this.counterDays = 0;
    this.remainingDays = 0;
 
  }

  ngOnInit(): void {
    this.store
    .select('reservation')
    .subscribe( reservation =>{
      this.datesReservation = reservation.reservationList;
      if(this.datesReservation.length == 0 ){
        this.getReservations(this.getData());
      }
    })    
    this.getLockedUsers();
  }

  getCounterDays( dateLocked: string ): number {
    const startDate = moment( ).format('MM-DD-YYYY');
    const endDate = moment(dateLocked);
    return endDate.diff( startDate, 'days' );
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
  
  getLockedUsers() {
    this.reservationsService.getLockedUsers()
      .subscribe(response => {
        this.dataUsersBlock = this.transformLockedUsers( response.data );
        this.dataUser = this.dataUsersBlock.find( user => user.email === this.getData().email && user.remainingDays > 0);
      });

  }
  
  getReservations({ startDate, endDate, email }: { startDate: string, endDate: string, email: string }): void {
    this.reservationsService.getReservations(startDate, endDate, email)
      .pipe(
        tap(console.log)
      )
      .subscribe(
        (ReservationResponse: ReservationResponse) => {
          this.datesReservation = ReservationResponse.data;
          this.datesReservation = this.datesReservation.filter(reservation => reservation.dominioEstado.toUpperCase() === 'R')
          this.store.dispatch(setReservationList({reservationList: this.datesReservation}));
        }
      )
  }

  showEditReservation(): void {    
    this.store.dispatch(setReservation({reservation: this.currentReservation}));   
    this.store.dispatch(setEditReservation({isEditReservation: true}));
  }

  showReservation(value: number): void {
    this.currentPosition = this.currentPosition + value;
  }

  transformLockedUsers( users: DataUsersBlock[] ): DataUsersBlock[] {
    return users.map(d => ({ 
      ...d, 
      remainingDays: this.getCounterDays( moment(d.bloqueadoHasta).format('DD-MM-YYYY') )
    }));
  }  
}
