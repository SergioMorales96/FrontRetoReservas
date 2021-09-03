import { Component } from '@angular/core';
import { RouteName } from '../../../../utils/enums';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['../../adminTitle.scss']
})
export class RoomsComponent {
  routeName = RouteName;
}
