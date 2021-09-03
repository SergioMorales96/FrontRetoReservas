import { Component, OnInit } from '@angular/core';
import { RouteName } from '../../../../utils/enums';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['../../adminTitle.scss']
})
export class SchedulesComponent {
  routeName = RouteName;
}
