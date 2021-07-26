import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouteName, RouteFloor } from '../../../utils/enums';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  display: boolean = false;

  selectButton(activate: boolean):void {
    this.display = activate;
  }

}