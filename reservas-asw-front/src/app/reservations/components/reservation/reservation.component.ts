import { Component } from '@angular/core';
import { ReservationAction } from '../../../../utils/enums';
import { DatesReservation } from '../../../admin/interfaces/reservation';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent {

  hasEditing: boolean = false;
  currentReservation!: DatesReservation;

  showComponent( reservationAction: ReservationAction ): void {
    this.hasEditing = reservationAction === ReservationAction.Edit;
  }

}
