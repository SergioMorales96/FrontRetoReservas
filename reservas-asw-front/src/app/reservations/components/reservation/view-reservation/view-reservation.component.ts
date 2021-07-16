import { Component, Output, EventEmitter } from '@angular/core';
import { ReservationAction } from '../../../../../utils/enums';

@Component({
  selector: 'app-view-reservation',
  templateUrl: './view-reservation.component.html',
  styleUrls: ['./view-reservation.component.scss']
})
export class ViewReservationComponent {

  @Output() onAction: EventEmitter<ReservationAction> = new EventEmitter<ReservationAction>(); 

  reservations: string[] = ['Uno', 'Dos', 'Tres', 'Cuatro'];
  currentPosition: number = 0;

  get canShowPreview(): boolean {
    return this.currentPosition - 1 >= 0;
  }
  
  get canShowNext(): boolean {
    return this.reservations.length - 1 > this.currentPosition;
  }

  showEditReservation(): void {
    this.onAction.emit( ReservationAction.Edit );
  }

  showReservation( value: number ): void {
    this.currentPosition = this.currentPosition + value;

  }

}
