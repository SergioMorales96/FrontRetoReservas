import { Component, EventEmitter, Output } from '@angular/core';
import { ReservationAction } from 'src/utils/enums';

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.scss']
})
export class EditReservationComponent {

  @Output() onAction: EventEmitter<ReservationAction> = new EventEmitter<ReservationAction>(); 

  showReservation(): void {
    this.onAction.emit( ReservationAction.ViewSummary );
  }

}
