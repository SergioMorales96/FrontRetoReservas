import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  display: boolean;
  blocked: boolean;
  items: MenuItem[];

  get generateReservationIcon(): string {
    return `assets/images/icons/${this.blocked ? 'minus-gray' : this.display ? 'close-red' : 'plus-blue'}.svg`;
  }

  get myReservationIconCalendar(): string {
    return `assets/images/icons/${this.display ? 'calendar-white' : 'calendar-blue'}.svg`;
  }

  get myReservationIconArrow(): string {
    return `assets/images/icons/${this.display ? 'arrow-right-white' : 'arrow-right-blue'}.svg`;
  }

  constructor() {
    this.display = false;
    this.blocked = true;
    this.items = [
      {
        label: 'Lista de usuarios',
        routerLink: ''
      },
    ];
  }

}
