import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styles: [
  ]
})
export class CalendarComponent implements OnInit {

  value: Date = new Date;

  constructor() { }

  ngOnInit(): void {
  }

}
