import { Component, OnInit } from '@angular/core';

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
    invalidDates: Date[] = [new Date("07/7/2021"), new Date("07/08/2021")];
    //Las fechas en esta lista colorean la mitad de abajo de los días en el calendario
    afterNoon: number[] = [5, 10, 15, 20, 25, 30];
    //Las fechas en esta lista colorean la mitad de arriba de los días en el calendario
    morning: number[] = [6, 11, 16, 26];
    //Las fechas en esta lista colorean el día completo de los días en el calendario
    complete: number[] = [7, 8];
  
  
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

}
