import { getLocaleMonthNames } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  dateValue: Date = new Date;

  constructor() { }

  ngOnInit(): void {
  }

  //Las fechas en esta lista desactivan los días en el calendario
  invalidDates: Date[] = [new Date("07/30/2021"), new Date("07/31/2021")];
  //Las fechas en esta lista colorean la mitad de arriba de los días en el calendario
  morning: number[] = [5, 6, 7, 8, 9, 10, 11];
  //Las fechas en esta lista colorean la mitad de abajo de los días en el calendario
  afterNoon: number[] = [19, 20, 21, 22, 23, 24, 25];
  //Las fechas en esta lista colorean el día completo de los días en el calendario
  complete: number[] = [1, 2, 3, 4];

  morningDates: Date[] = [new Date('07/07/2021'), new Date('07/08/2021'), new Date('07/09/2021'), new Date('07/10/2021')];

  afterNoonM(day: number): boolean {
    return this.afterNoon.includes(day);
  }

  morningM(day: number): boolean {
    return this.morning.includes(day);
  }

  completeM(day: number): boolean {
    return this.complete.includes(day);
  }

  monthChange(month: number): void {
    this.complete = [];
    this.morning = [];
    this.afterNoon = [];

    console.log(month);
  }

  // completeDate(value: number): string {
  //   return value > 9 ? `${value}` : `0${value}`;
  // }

  // morningDatesM(date: any): boolean {
  //   const month = date.month + 1;
  //   const selectedDate = `${date.year}-${this.completeDate(month)}-${this.completeDate(date.day)}`;

  //   return this.morningDates
  //     .map(date => moment(date).format('yyyy-MM-dd'))
  //     .includes(selectedDate);
  // }

}
