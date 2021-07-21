import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ReservationAction, RouteName } from '../../../../../utils/enums';
import { DatesReservation, ReservationResponse } from '../../../../admin/interfaces/reservation';
import { ReservationsService } from '../../../../admin/services/reservation.service';
import * as moment from 'moment';

@Component({
  selector: 'app-view-reservation',
  templateUrl: './view-reservation.component.html',
  styleUrls: ['./view-reservation.component.scss']
})
export class ViewReservationComponent implements OnInit {

  datesReservation: DatesReservation[] = [];
  routeName = RouteName;

  get reservationDate(): string {
    const date = this.datesReservation[this.currentPosition]?.dia?.split('-');

    return `${ date[0] }/${ date[1] }/${ date[2] }`;
  }

  get transportMedia(): string {
    return true ? 'bicycle.svg' : 'bicycle.svg';
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
      endDate: '13-07-2021',
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


  @Output() onAction: EventEmitter<ReservationAction> = new EventEmitter<ReservationAction>();



  currentPosition: number = 0;

  get canShowPreview(): boolean {
    return this.currentPosition - 1 >= 0;
  }

  get canShowNext(): boolean {
    return this.datesReservation.length - 1 > this.currentPosition;
  }

  showEditReservation(): void {
    this.onAction.emit(ReservationAction.Edit);
  }

  showReservation(value: number): void {
    this.currentPosition = this.currentPosition + value;

  }


}
