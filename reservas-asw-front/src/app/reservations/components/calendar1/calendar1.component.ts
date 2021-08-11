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

  currentDate: Date;
  selectedDate: Date;
  invalidDates: Date[] = []; 
  invalidTotalDates: number[];
  datesReservations: string[];
  stringDate: string;
  datesReservations2: number[];
  stringDate2: string;
  dateDate: Date[];

  datesReservation: DatesReservation[];

  get diasparapintar(): Date [] {
    const diasparapint = this.dateDate;
    return diasparapint;
  }

  constructor(
    private reservationsService: ReservationsService,
    private store: Store<AppState>
  ) {
    this.selectedDate = new Date();
    this.currentDate = new Date();
    this.invalidTotalDates = [];
    this.dateDate = [];
    this.datesReservations = [];
    this.stringDate = '';
    this.datesReservations2 = [];
    this.stringDate2 = '';
    this.datesReservation = [];
  }

  ngOnInit(): void {
    this.getReservations(this.getData());
  }

  getReservations({ startDate, endDate, email }: { startDate: string, endDate: string, email: string }): void {
    this.reservationsService.getReservations(startDate, endDate, email)
      .pipe(
        tap(console.log)
      )
      .subscribe(
        (ReservationResponse: ReservationResponse) => {
          this.datesReservation = ReservationResponse.data;
          this.datesReservation = this.datesReservation.filter(reservation => reservation.dominioEstado.toUpperCase() === 'R');
          this.getarray();
        }
      )
  }

  getData() {
    return {
      startDate: moment().format('DD-MM-YYYY'),
      endDate: moment().endOf('month').format('DD-MM-YYYY'),
      email: 'correoJuan@correo.com'
    }
  }

  getarray(): void {
    // console.log('prueba1.0: ', this.datesReservation);
    for (let i in this.datesReservation) {
      const dia = this.datesReservation[i].dia;
      const date = dia.split('-');
      this.stringDate = `${date[2]}/${date[1]}/${date[0]}`;
      this.stringDate2 = `${date[0]}`;
      this.datesReservations2.push(parseInt(this.stringDate2));
      this.datesReservations.push(this.stringDate);
    }
    for (let x in this.datesReservations) {
      const dia2 = this.datesReservations[x];
      this.dateDate.push(new Date(dia2));
    }
    // this.invalidDates = this.dateDate;
    console.log('Fechas en strings: ', this.datesReservations);
    console.log('Dias en numbers: ', this.datesReservations2);
    console.log('Fechas en fechas: ', this.dateDate);
  }

  isInvalidTotalDate(day: number): boolean {
    this.invalidTotalDates = this.datesReservations2;
    return this.invalidTotalDates.includes(day);
  }

  // monthChange(month: number, year: number): void {
  //   this.invalidTotalDates = [];
  //   this.invalidDates = [];
  // }

  setSelectedDate(selectedDate: Date): void {
    this.selectedDate = selectedDate;
    this.store.dispatch(setSelectedDate({ selectedDateSummary: this.selectedDate }));
    console.log(this.selectedDate);
  }
}

