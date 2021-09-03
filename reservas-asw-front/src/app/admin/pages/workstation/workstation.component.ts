import { Component } from '@angular/core';
import { RouteName } from 'src/utils/enums';

@Component({
  selector: 'app-workstation',
  templateUrl: './workstation.component.html',
  styleUrls: ['../../adminTitle.scss']
})
export class WorkstationComponent {

  routeName = RouteName;

}
