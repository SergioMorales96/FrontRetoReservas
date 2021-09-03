import { Component } from '@angular/core';
import { RouteName } from '../../../../utils/enums';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent {

  routeName = RouteName;
}
