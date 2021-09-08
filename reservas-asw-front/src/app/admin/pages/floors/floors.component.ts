import { Component } from '@angular/core';
import { RouteFloor, RouteName } from '../../../../utils/enums';

@Component({
  selector: 'app-floors',
  templateUrl: './floors.component.html',
  styleUrls: ['../../adminTitle.scss']
})
export class FloorsComponent {
  routeFloor = RouteFloor;
  routeName = RouteName;
}
