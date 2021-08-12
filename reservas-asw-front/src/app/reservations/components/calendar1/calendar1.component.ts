import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { OnInit } from '@angular/core';
import { setSelectedDate } from 'src/app/reservations/reservation.actions';
import { DatesReservation, ReservationResponse } from 'src/app/admin/interfaces/reservation';
import { ReservationsService } from 'src/app/admin/services/reservation.service';
import { tap } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar1',
  templateUrl: './calendar1.component.html',
  styleUrls: ['./calendar1.component.scss'],
})
export class Calendar1Component implements OnInit {

  private tempDate: Date = new Date();

  currentDate: Date;
  selectedDate: Date;
  invalidDates: Date[] = [];
  invalidTotalDates: number[];
  datesReservation: DatesReservation[];

  constructor(
    private reservationsService: ReservationsService,
    private store: Store<AppState>
  ) {
    this.selectedDate = new Date();
    this.currentDate = new Date();
    this.invalidTotalDates = [];
    this.datesReservation = [];
  }

  ngOnInit(): void {
    this.getReservations(this.getData(this.tempDate));
  }

  getData(datevalue: Date) {
    return {
      startDate: moment(datevalue).startOf('date').format('DD-MM-YYYY'),
      endDate: moment(datevalue).endOf('month').format('DD-MM-YYYY'),
      email: 'correoJuan@correo.com'
    }
  }

  getReservations({ startDate, endDate, email }: { startDate: string, endDate: string, email: string }): void {
    this.reservationsService.getReservations(startDate, endDate, email)
      .pipe(
      )
      .subscribe(
        (ReservationResponse: ReservationResponse) => {
          this.datesReservation = ReservationResponse.data;
          this.datesReservation = this.datesReservation.filter(reservation => reservation.dominioEstado.toUpperCase() === 'R');
          this.updateCalendar();
          console.log('reservas :', this.datesReservation);
        }
      )
  }

  isInvalidTotalDate(day: number): boolean {
    return this.invalidTotalDates.includes(day);
  }

  monthChange(month: number, year: number): void {
    this.invalidTotalDates = [];
    this.invalidDates = [];
    this.tempDate.setMonth(month - 1);
    this.tempDate.setDate(this.obtenerDia(month, year));
    this.tempDate.setFullYear(year);
    this.getReservations(this.getData(this.tempDate));
  }

  obtenerDia(month: number, year: number ): number {
    let dia = 1;
    const actual = new Date ();
    if (month - 1 === actual.getMonth() && year === actual.getFullYear()){
      dia = actual.getDate();
    }
    return dia;
  }

  updateCalendar(): void {
    let i = 0;
    let checked: string[] = [];

    for (const reservation of this.datesReservation) {
      if (!checked.includes(this.datesReservation[i].dia)) {
        checked = this.compareReservations(i, checked);
      }
      i++;
    }
  }

  private compareReservations(i: number = 0, checked: string[]): string[] {
    let flag: boolean = false;
    let iRerservation: DatesReservation = this.datesReservation[i];
    for (let j = 0; j < this.datesReservation.length; j++) {
      let jReservation: DatesReservation = this.datesReservation[j];
      if (j != i) {
        if (jReservation.dia === iRerservation.dia) {
          this.invalidTotalDates.push(parseInt(jReservation.dia));
          checked.push(jReservation.dia);
          flag = true;
        }
      }
    }
    if (!flag) {
      this.invalidTotalDatesDay(iRerservation, checked)
    }
    return checked;
  }

  private invalidTotalDatesDay(rev: DatesReservation, checked: string[]): void {
    this.invalidTotalDates.push(parseInt(rev.dia));
    checked.push(rev.dia);
  }

  setSelectedDate(selectedDate: Date): void {
    this.selectedDate = selectedDate;
    this.store.dispatch(setSelectedDate({ selectedDateSummary: this.selectedDate }));
    console.log(this.selectedDate);
  }
}

