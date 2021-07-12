import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouteName, RouteFloor } from '../../../utils/enums';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  @Input() display: boolean = false;
  @Output() onHide = new EventEmitter<boolean>();

  items: MenuItem[] = [];

  ngOnInit(): void {
    this.items = [
      {
        label: 'Generar una reserva',
        icon: 'pi pi-times-circle',
        disabled: true,
      },
      {
        label: 'Mis reservas',
        icon: 'pi pi-calendar-times',
        disabled: true,
      },
      {
        label: 'Administración',
        items: [
          {
            label: 'Lista de administradores',
            icon: 'pi pi-users',
            routerLink: RouteName.AdminsList,
            command: () => this.display = false
          },
          {
            label: 'Lista de dominios',
            icon: 'pi pi-list',
            routerLink: RouteName.DomainsList,
            command: () => this.display = false
          },
          {
            label: 'Lista de horarios de puestos de trabajo',
            icon: 'pi pi-clock',
            routerLink: RouteName.SchedulesList,
            command: () => this.display = false
          },
          {
            label: 'Lista de pisos',
            icon: 'pi pi-list',
            routerLink: RouteFloor.FloorList,
            command: () => this.display = false
          },
          {
            label: 'Lista de puestos de trabajo',
            routerLink: RouteName.WorkstationList,
            icon: 'pi pi-briefcase',
            command: () => this.display = false
          },
          {
            label: 'Lista de salas',
            icon: 'pi pi-list',
            routerLink: RouteName.RoomsList,
            command: () => this.display = false
          },
          {
            label: 'Lista de sucursales',
            icon: 'pi pi-list',
            routerLink: RouteName.BranchesList,
            command: () => this.display = false
          },
        ]
      }
    ]
  }

  hide( ): void {
    this.onHide.emit(true);
  }

}
