import { getLocaleMonthNames } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { DateValidationType } from 'src/utils/enums';
import { ReservationsService } from '../../services/reservations.service';
import { DataResponse } from '../../interfaces/reservations.interface';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @Input() dateValidationType: DateValidationType = DateValidationType.DayCapacity;
  @Input() selectedFloor!: number;
  @Output() onDayCapacity: EventEmitter<boolean> = new EventEmitter<boolean>();
  selectedDate: Date = new Date();
  dateValue: Date = new Date;

  constructor(
    private reservationService: ReservationsService
  ) { }

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











  setSelectedDate(selectedDate: Date): void {
    this.selectedDate = selectedDate;
    this.callMethodPerDateValidationType();
    console.log(selectedDate);
  }

  callMethodPerDateValidationType(): void {
    console.log(this.dateValidationType);
    switch (this.dateValidationType) {
      case DateValidationType.DayCapacity:
        console.log('Entrando case capacity')
        this.getCapacity();//
        break;
      case DateValidationType.ParkingAvailabilityPerBicycle:
        break;
      case DateValidationType.ParkingAvailabilityPerCar:
        break;
      case DateValidationType.ParkingAvailabilityPerMotorcycle:
        break;
      default:
        break;
    }
  }

  getCapacity(): void {
    if (!this.selectedFloor) { return; }//toast
    const selectedDate = moment(this.selectedDate).format('DD-MM-yyyy');
    this.reservationService.getCapacity(selectedDate, this.selectedFloor)
      .subscribe(
        (dataResponse: DataResponse) => {
          console.log(dataResponse);
          this.validateDayCapacity(dataResponse.data);
        });
  }

  validateDayCapacity(data : number | any): void {
    if (data > 0) {
      this.onDayCapacity.emit(true);
    }
    else {
      this.onDayCapacity.emit(false);
      //toast
    }
  }

}
