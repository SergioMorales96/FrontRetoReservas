import { Component, OnInit } from '@angular/core';
import { DateValidationType } from '../../../../utils/enums';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  dateValidationType = DateValidationType;

  constructor() { }

  ngOnInit(): void {
  }

  validateDayCapacity( hasCapacity: boolean ): void {
    console.log( hasCapacity );
  }

  validateParkingAvailabilityPerCar( hasAvailabilityPerCar: boolean ): void {
    console.log( hasAvailabilityPerCar );
  }

}
