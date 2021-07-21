import { Component, Output, EventEmitter } from '@angular/core';
import { ReservationAction } from '../../../../../utils/enums';
import { DatesReservation } from '../../../../admin/interfaces/reservation';


@Component({
  selector: 'app-view-reservation',
  templateUrl: './view-reservation.component.html',
  styleUrls: ['./view-reservation.component.scss']
})
export class ViewReservationComponent {

  datesReservation: DatesReservation[]= [
    {     
      "dia": '12-07-2021',
      "horaInicio": '09:00',
      "horaFin": '11:00',
      "dominioTipoVehiculo": 'C',
      "placa": 'AAA003',
      "nombreSala": "SALA 1",
      "nombrePuesTrabajo": null,
      "numeroAsistentes": 4,
      "idPiso": 1

    }

  ]
  
  
  

  @Output() onAction: EventEmitter<ReservationAction> = new EventEmitter<ReservationAction>(); 

  
  
  currentPosition: number = 0;

  get canShowPreview(): boolean {
    return this.currentPosition - 1 >= 0;
  }
  
  get canShowNext(): boolean {
    return this.datesReservation.length - 1 > this.currentPosition;
  }

  showEditReservation(): void {
    this.onAction.emit( ReservationAction.Edit );
  }

  showReservation( value: number ): void {
    this.currentPosition = this.currentPosition + value;

  }


}
