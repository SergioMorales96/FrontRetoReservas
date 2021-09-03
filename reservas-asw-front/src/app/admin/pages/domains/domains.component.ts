import { Component } from '@angular/core';
import { RouteName } from '../../../../utils/enums';

@Component({
  selector: 'app-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['../../adminTitle.scss']
})
export class DomainsComponent {
  routeName = RouteName;
}
