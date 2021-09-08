import { Component } from '@angular/core';
import { RouteFloor, RouteName } from '../../../../utils/enums';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['../../adminTitle.scss']
})
export class AdminsComponent {

  routeName = RouteName;
  routeFloor = RouteFloor;
}
