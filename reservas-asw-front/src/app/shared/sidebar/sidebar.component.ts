import { Component } from '@angular/core';
import { setDisplay } from '../../reservations/reservation.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
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

  constructor(
    private store: Store<AppState>
  ) {
    this.display = true;
    this.blocked = false;
    this.items = [
      {
        label: 'Lista de usuarios',
        routerLink: ''
      },
    ];
  }

  changeDisplay(display: boolean){
    this.display = display;
    this.store.dispatch(setDisplay({ display : this.display }));
  }

}
