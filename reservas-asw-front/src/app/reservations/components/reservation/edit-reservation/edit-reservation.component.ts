
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatesReservation } from 'src/app/admin/interfaces/reservation';
import { ReservationAction, RouteName } from 'src/utils/enums';
import { ViewReservationComponent } from '../view-reservation/view-reservation.component';

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.scss']
})
export class EditReservationComponent  {

  @Output() onAction: EventEmitter<ReservationAction> = new EventEmitter<ReservationAction>(); 
  
}
 