import { Component, OnInit } from '@angular/core';
import { RouteName } from '../../../../utils/enums';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styles: [
  ]
})
export class SchedulesComponent  {
  routeName = RouteName;
}
