import { Component } from '@angular/core';
import { RouteName } from 'src/utils/enums';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styles: [
  ]
})
export class BranchesComponent{
  routeName = RouteName;
}
