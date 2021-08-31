import { Component, OnInit } from '@angular/core';
import { DateValidationType } from '../../../../utils/enums';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dateValidationType = DateValidationType;

  constructor() { }

  ngOnInit(): void {
  }

  validateDayCapacity(hasCapacity: boolean): void {

  }
  validateAvailabilityMotorcycle(availabilityMotocycle: boolean): void {

  }

  validateParkingAvailabilityPerCar(hasAvailabilityPerCar: boolean): void {
    
  }

}
