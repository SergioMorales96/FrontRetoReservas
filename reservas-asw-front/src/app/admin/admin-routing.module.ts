import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminsComponent } from './pages/admins/admins.component';
import { BranchesComponent } from './pages/branches/branches.component';
import { DomainsComponent } from './pages/domains/domains.component';
import { FloorsComponent } from './pages/floors/floors.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { SchedulesComponent } from './pages/schedules/schedules.component';
import { WorkstationComponent } from './pages/workstation/workstation.component';
import { AddAdminComponent } from './pages/admins/form/add-admin.component';
import { ViewAdminComponent } from './pages/admins/view/view-admin.component';
import { ListAdminComponent } from './pages/admins/list/list-admin.component';
import { ListRoomComponent } from './pages/rooms/list/list-room.component';
import { ViewRoomComponent } from './pages/rooms/view/view-room.component';
import { FormRoomComponent } from './pages/rooms/form/form-room.component';
import { ListScheduleComponent } from './pages/schedules/list/list-schedule.component';
import { FormScheduleComponent } from './pages/schedules/form/form-schedule.component';
import { ViewScheduleComponent } from './pages/schedules/view/view-schedule.component';
import { ListDomainComponent } from './pages/domains/list/list-domain.component';
import { ViewDomainComponent } from './pages/domains/view/view-domain.component';
import { FormDomainComponent } from './pages/domains/form/form-domain.component';


import { ListBranchComponent } from './pages/branches/list/list-branch.component';
import { FormBranchComponent } from './pages/branches/form/form-branch.component';
import { ViewBranchComponent } from './pages/branches/view/view-branch.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'admins',
        component: AdminsComponent,
        children: [
          {
            path: 'add',
            component: AddAdminComponent
          },
          {
            path: 'view/:id',
            component: ViewAdminComponent
          },
          {
            path: 'edit/:id',
            component: AddAdminComponent
          },
          {
            path: 'list',
            component: ListAdminComponent
          },
          {
            path: '**',
            redirectTo: 'list'
          },
        ]
      },
      {
        path: 'branches',
        component: BranchesComponent,
        children: [
          {
            path: 'list',
            component: ListBranchComponent
          },
          {
            path: 'view/:id',
            component: ViewBranchComponent
          },
          {
            path: 'add',
            component: FormBranchComponent
          },
          {
            path: 'edit/:id',
            component: FormBranchComponent
          },
          {
            path: '**',
            redirectTo: 'list'
          }
        ]
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
        component: SchedulesComponent,
        children: [
          {
            path: 'list',
            component: ListScheduleComponent
          },
          {
            path: 'view/:id',
            component: ViewScheduleComponent
          },
          {
            path: 'add',
            component: FormScheduleComponent
          },
          {
            path: 'edit/:id',
            component: FormScheduleComponent
          },
          {
            path: '**',
            redirectTo: 'list'
          }
        ]
      },
      {
        path: 'workstations',
        component: WorkstationComponent
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
    RouterModule.forChild(routes)
  ]
})
export class AdminRoutingModule { }
