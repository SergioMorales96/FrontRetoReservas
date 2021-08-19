import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { MenuItem } from 'primeng/api';
import { RouteFloor, RouteName } from '../../../utils/enums';
import { setDisplay, setSteps } from '../../reservations/reservation.actions';
import { setIsEdit } from '../../reservations/editReservation.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  display!: boolean;
  blocked!: boolean;
  items: MenuItem[];
  routeName = RouteName;
  routeNameFloors = RouteFloor;

  get generateReservationIcon(): string {
    return `assets/images/icons/${this.blocked ? 'minus-gray' : this.display ? 'close-red' : 'plus-blue'}.svg`;
  }

  get myReservationIconCalendar(): string {
    return `assets/images/icons/${this.display ? 'calendar-white' : 'calendar-blue'}.svg`;
  }

  get myReservationIconArrow(): string {
    return `assets/images/icons/${this.display ? 'arrow-right-white' : 'arrow-right-blue'}.svg`;
  }

  changeDisplay(display: boolean){
    this.display = display;
    this.store.dispatch(setDisplay({display : display}))
    if(display == true) {
       this.store.dispatch(setSteps({step : 1}));
       this.store.dispatch(setIsEdit({isEdit : false}))
      }
  }

  ngOnInit(): void {
    this.store.select('reservation').subscribe(
      (reservation) => this.display = reservation.display
    );
    this.store.select('reservation').subscribe(
      (reservation) => this.blocked = reservation.blocked
    );
  }

  constructor(
    private store: Store<AppState>
  ) {
    this.items = [
      {
        label: 'Lista de usuarios',
        routerLink: ''
      },
      {
        label: 'Lista de administración',
        routerLink: 'admin/admins/list'
      },
      {
        label: 'Lista de dominios',
        routerLink: 'admin/domains/list'
      },
      {
        label: 'Lista de pisos',
        routerLink: 'admin/floors/list'
      },
      {
        label: 'Lista de salas',
        routerLink: 'admin/rooms/list'
      },
      {
        label: 'Lista de sucursales',
        routerLink: 'admin/branches/list'
      },
      {
        label: 'Lista de puestos de trabajo',
        routerLink: '/admin/workstations/list'
      },
      {
        label: 'Lista de horarios',
        routerLink: 'admin/schedules/list'
      },
    ];
  }
}
