import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReservationAction } from 'src/utils/enums';
import { ViewReservationComponent } from '../view-reservation/view-reservation.component';
import { DatesReservation, ReservationResponse } from '../../../../admin/interfaces/reservation';
import { RouteName } from '../../../../../utils/enums';
import { ReservationsService } from '../../../../admin/services/reservation.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.scss']
})
export class EditReservationComponent {

  @Input() currentReservation!: DatesReservation;
  @Output() onAction: EventEmitter<ReservationAction> = new EventEmitter<ReservationAction>();
  
  datesReservation: DatesReservation[] = [];
  routeName = RouteName;
  currentPosition: number = 0;

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
      return 'Marca'
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

  get workStationMedia(): string {
    const asistentsNumber = this.currentReservation.numeroAsistentes;
    if (asistentsNumber > 1) {
      return 'workbench.svg'
    }
    else {
      return 'workstation.svg'
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

  get transportMedia(): string {
    const vehicleType = this.currentReservation.dominioTipoVehiculo;

    switch (vehicleType) {
      case 'B':
        return 'bicycle.svg';
      case 'M':
        return 'bicycle.svg'
      case 'C':
        return 'bicycle.svg'
      default:
        return 'bicycle.svg'
    }

  }


  constructor(
    private reservationsService: ReservationsService

  ) { }

  ngOnInit(): void {

    this.getRervations(this.getData());
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
        (ReservationResponse: ReservationResponse) => this.datesReservation = ReservationResponse.data
      )
  }

  showEditReservation(): void {
    this.onAction.emit(ReservationAction.Edit);
  }

  // showReservation(value: number): void {
  //   this.currentPosition = this.currentPosition + value;
  //   this.onCurrentReservation.emit( this.currentReservation );
  // }

  showReservation1(): void {
    this.onAction.emit( ReservationAction.ViewSummary );
    
  }


}
