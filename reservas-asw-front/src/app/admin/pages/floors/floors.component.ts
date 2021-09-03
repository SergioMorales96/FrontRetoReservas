import { Component } from '@angular/core';
import { RouteFloor } from '../../../../utils/enums';

@Component({
  selector: 'app-floors',
  templateUrl: './floors.component.html',
  styleUrls: ['../../adminTitle.scss']
})
export class FloorsComponent {
  routeFloor = RouteFloor;

}
