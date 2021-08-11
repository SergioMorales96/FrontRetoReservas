import { Component } from '@angular/core';
import { Reservation } from '../../interfaces/reservations.interface';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { OnInit } from '@angular/core';
import { setSelectedDate } from 'src/app/reservations/reservation.actions';
import { DatesReservation } from 'src/app/admin/interfaces/reservation';
import { radToDeg } from 'three/src/math/MathUtils';

@Component({
  selector: 'app-calendar1',
  templateUrl: './calendar1.component.html',
  styleUrls: ['./calendar1.component.scss'],
})
export class Calendar1Component implements OnInit {

  currentDate: Date;
  selectedDate: Date;
  invalidDates: Date[];
  invalidTotalDates: number[];
  allReservations!: DatesReservation[];


  constructor(
    private store: Store<AppState>
  ) {
    this.selectedDate = new Date();
    this.currentDate = new Date();
    this.invalidDates = [];
    this.invalidTotalDates = []
  }

  ngOnInit(): void {
    this.store
      .select('reservation')
      .subscribe(reservation => {
        this.allReservations = reservation.reservationList;
        console.log('datooos: ', this.allReservations);
      });
    this.llenarPrueba();
    this.store
      .select('reservation')
      .subscribe(reservation => { this.allReservations = reservation.dates });
  }

  llenarPrueba() {
    this.store
      .select('reservation')
      .subscribe(reservation => {
        this.allReservations = reservation.reservationList;
      });
    for (let i in this.allReservations) {
    }
  }

  isInvalidTotalDate(day: number): boolean {
    return this.invalidTotalDates.includes(day);
  }

  monthChange(month: number, year: number): void {
    this.invalidTotalDates = [];
    this.invalidDates = [];
  }

  private invalidTotalDatesDay(rev: Reservation, checked: string[]): void {
    this.invalidTotalDates.push(parseInt(rev.dia));
    checked.push(rev.dia);
  }

  setSelectedDate(selectedDate: Date): void {
    this.selectedDate = selectedDate;
    this.store.dispatch(setSelectedDate({ selectedDateSummary: this.selectedDate }));
    console.log(this.selectedDate);
    this.llenarPrueba();
  }
}

