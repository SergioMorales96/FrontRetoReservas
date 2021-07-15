import { Component, OnInit } from '@angular/core';
import { RouteFloor } from '../../../../utils/enums';

@Component({
  selector: 'app-floors',
  templateUrl: './floors.component.html',
  styles: [
  ]
})
export class FloorsComponent {
  routeFloor = RouteFloor;

}
