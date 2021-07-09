import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  items: MenuItem[] = [];

  display: boolean = true;

  ngOnInit(): void {
    this.items = [
      {
        label: 'Generar una reserva',
        icon: 'pi pi-times-circle',
      },
      {
        label: 'Mis reservas',
        icon: 'pi pi-calendar-times'
      },
      {
        label: 'Administración',
        items: [
          {
            label: 'Lista de Administradores',
          },
          {
            label: 'Lista de Asistentes',
          },
          {
            label: 'Lista de Dominios',
            routerLink:'/admin/domains/list',
            command: () => this.display = false
          },
          {
            label: 'Lista de Empresas',
          },
          {
            label: 'Lista de Horarios de puestos de trabajo',
          },
          {
            label: 'Lista de Pisos',
          },
          {
            label: 'Lista de Puestos de trabajo',
          },
          {
            label: 'Lista de Reservas',
          },
          {
            label: 'Lista de Salas',
            routerLink:'/admin/rooms/list',
            command: () => this.display = false
          },
          {
            label: 'Lista de Sucursales',
          },
        ]
      }
    ]
  }

}
