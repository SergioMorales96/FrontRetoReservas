import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminsComponent } from './pages/admins/admins.component';
import { BranchesComponent } from './pages/branches/branches.component';
import { DomainsComponent } from './pages/domains/domains.component';
import { FloorsComponent } from './pages/floors/floors.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { SchedulesComponent } from './pages/schedules/schedules.component';
import { WorkstationComponent } from './pages/workstation/workstation.component';
import { ListRoomComponent } from './pages/rooms/list/list-room.component';
import { ViewRoomComponent } from './pages/rooms/view/view-room.component';
import { FormRoomComponent } from './pages/rooms/form/form-room.component';
import { ListWorkstationComponent } from './pages/workstation/list-workstation/list-workstation.component';
import { ViewWorkstationComponent } from './pages/workstation/view-workstation/view-workstation.component';
import { FormWorkstationComponent } from './pages/workstation/form-workstation/form-workstation.component';
import { ListDomainComponent } from './pages/domains/list/list-domain.component';
import { ViewDomainComponent } from './pages/domains/view/view-domain.component';
import { FormDomainComponent } from './pages/domains/form/form-domain.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'admins',
        component: AdminsComponent
      },
      {
        path: 'branches',
        component: BranchesComponent
      },
      //DOMAIN
      {
        path: 'domains',
        component: DomainsComponent,
        children: [
          {
            path: 'list',
            component: ListDomainComponent,

          },
          {
            path: 'add',
            component: FormDomainComponent,
          },
          {
            path: 'view/:codigoDominio/:valorDominio/:descripcion',
            component: ViewDomainComponent,
          },
          {
            path: 'edit/:codigoDominio/:valorDominio/:descripcion',
            component: FormDomainComponent

          },
          {
            path: '**',
            redirectTo: 'list'
          }

        ]

      },
      {
        path: 'floors',
        component: FloorsComponent
      },
      {
        path: 'rooms',
        component: RoomsComponent,
        children: [
          {
            path: 'list',
            component: ListRoomComponent
          },
          {
            path: 'view/:id',
            component: ViewRoomComponent
          },
          {
            path: 'add',
            component: FormRoomComponent
          },
          {
            path: 'edit/:id',
            component: FormRoomComponent
          },
          {
            path: '**',
            redirectTo: 'list'
          }
        ]
      },
      {
        path: 'schedules',
        component: SchedulesComponent
      },
      {
        path: 'workstations',
        component: WorkstationComponent,
        children: [
          {
            path: 'list',
            component: ListWorkstationComponent
          },
          {
            path: 'view/:id',
            component: ViewWorkstationComponent
          },
          {
            path: 'add',
            component: FormWorkstationComponent
          },
          {
            path: 'edit/:id',
            component: FormWorkstationComponent
          },
          {
            path: '**',
            redirectTo: 'list'
          }
        ]
      },
      {
        path: '**',
        redirectTo: 'admins'
      }
    ]
  }
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forChild( routes )
  ]
})
export class AdminRoutingModule { }
