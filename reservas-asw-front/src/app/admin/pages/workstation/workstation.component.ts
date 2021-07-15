import { Component } from '@angular/core';
import { RouteName } from 'src/utils/enums';

@Component({
  selector: 'app-workstation',
  templateUrl: './workstation.component.html',
  styles: [
  ]
})
export class WorkstationComponent {

  routeName = RouteName;

}
