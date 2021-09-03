import { Component } from '@angular/core';
import { RouteName } from 'src/utils/enums';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['../../adminTitle.scss']
})
export class BranchesComponent{
  routeName = RouteName;
}
