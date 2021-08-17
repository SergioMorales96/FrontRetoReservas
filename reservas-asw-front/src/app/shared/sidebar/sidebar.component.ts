import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { MenuItem } from 'primeng/api';
import { RouteFloor, RouteName } from '../../../utils/enums';
import { setDisplay } from '../../reservations/reservation.actions';
import { GridHelper } from 'three';

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
  }

  ngOnInit(): void {
    this.store.select('reservation').subscribe(
      (reservation) => 
      {
        this.display = reservation.display;
        const line = document.getElementById('line_shade');
        if (this.display) {
          if (line) {
            line.style.display = 'flex';
          }
        } else {
          if (line) {
            line.style.display = 'none';
          }
        }
      }
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
        routerLink: '',
        icon: 'pi pi-check'
      },
      {
        label: 'Lista de administración',
        routerLink: 'admin/admins/list',
        icon: 'pi pi-check'
      },
      {
        label: 'Lista de dominios',
        routerLink: 'admin/domains/list',
        icon: 'pi pi-check'
      },
      {
        label: 'Lista de pisos',
        routerLink: 'admin/floors/list',
        icon: 'pi pi-check'
      },
      {
        label: 'Lista de salas',
        routerLink: 'admin/rooms/list',
        icon: 'pi pi-check'
      },
      {
        label: 'Lista de sucursales',
        routerLink: 'admin/branches/list',
        icon: 'pi pi-check'
      },
      {
        label: 'Lista de puestos de trabajo',
        routerLink: '/admin/workstations/list',
        icon: 'pi pi-check'
      },
      {
        label: 'Lista de horarios',
        routerLink: 'admin/schedules/list',
        icon: 'pi pi-check'
      },
    ];
  }
}
