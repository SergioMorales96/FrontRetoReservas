import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { MenuItem } from 'primeng/api';
import { RouteFloor, RouteName } from '../../../utils/enums';
import { setDisplay, setSidebar } from '../../reservations/reservation.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  isEditReservation!: boolean;
  isBlockedReservation!: boolean;
  items: MenuItem[];
  routeName = RouteName;
  routeNameFloors = RouteFloor;

  get generateReservationIcon(): string {
    return `assets/images/icons/${this.isBlockedReservation ? 'minus-gray' : this.isEditReservation ? 'close-red' : 'plus-blue'}.svg`;
  }

  get myReservationIconCalendar(): string {
    return `assets/images/icons/${this.isEditReservation ? 'calendar-white' : 'calendar-blue'}.svg`;
  }

  get myReservationIconArrow(): string {
    return `assets/images/icons/${this.isEditReservation ? 'arrow-right-white' : 'arrow-right-blue'}.svg`;
  }

  constructor(
    private store: Store<AppState>
  ) {
    this.items = [
      {
        label: 'Lista de administración',
        routerLink: 'admin/admins/list',
        command: () => this.store.dispatch(setSidebar({ sidebar: {sidebarActive : false} })),
        icon: 'pi pi-check'
      },
      {
        label: 'Lista de dominios',
        routerLink: 'admin/domains/list',
        command: () => this.store.dispatch(setSidebar({ sidebar: {sidebarActive : false} })),
        icon: 'pi pi-check'
      },
      {
        label: 'Lista de pisos',
        routerLink: 'admin/floors/list',
        command: () => this.store.dispatch(setSidebar({ sidebar: {sidebarActive : false} })),
        icon: 'pi pi-check'
      },
      {
        label: 'Lista de salas',
        routerLink: 'admin/rooms/list',
        command: () => this.store.dispatch(setSidebar({ sidebar: {sidebarActive : false} })),
        icon: 'pi pi-check'
      },
      {
        label: 'Lista de sucursales',
        routerLink: 'admin/branches/list',
        command: () => this.store.dispatch(setSidebar({ sidebar: {sidebarActive : false} })),
        icon: 'pi pi-check'
      },
      {
        label: 'Lista de puestos de trabajo',
        routerLink: '/admin/workstations/list',
        command: () => this.store.dispatch(setSidebar({ sidebar: {sidebarActive : false} })),
        icon: 'pi pi-check'
      },
      {
        label: 'Lista de horarios',
        routerLink: 'admin/schedules/list',
        command: () => this.store.dispatch(setSidebar({ sidebar: {sidebarActive : false} })),
        icon: 'pi pi-check'
      },
    ];
  }

  ngOnInit(): void {
    this.store.select('reservation').subscribe(
      (reservation) => {
        this.isEditReservation = reservation.sidebar.isEditReservation;
        const line = document.getElementById('line_shade');
        if (this.isEditReservation) {
          if (line) {
            line.style.display = 'flex';
          }
        } else {
          if (line) {
            line.style.display = 'none';
          }
        }
        this.isBlockedReservation = reservation.sidebar.isBlockedReservation;
        this.isEditReservation = reservation.sidebar.isEditReservation;
      }
    );
  }

  changeEditReservation(isEditReservation: boolean): void {
    this.isEditReservation = isEditReservation;
    this.store.dispatch(setSidebar({ sidebar: {isEditReservation : isEditReservation} }))
  }

}
