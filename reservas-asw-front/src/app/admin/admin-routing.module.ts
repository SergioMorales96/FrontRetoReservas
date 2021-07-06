import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminsComponent } from './pages/admins/admins.component';
import { BranchesComponent } from './pages/branches/branches.component';
import { DomainsComponent } from './pages/domains/domains.component';
import { FloorsComponent } from './pages/floors/floors.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { SchedulesComponent } from './pages/schedules/schedules.component';
import { WorkstationComponent } from './pages/workstation/workstation.component';
import { AddAdminComponent } from './pages/admins/add/add-admin.component';
import { ViewAdminComponent } from './pages/admins/view/view-admin.component';
import { ListAdminComponent } from './pages/admins/table/list-admin.component';

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
            path: 'table',
            component: ListAdminComponent
          },
        ]
      },
      {
        path: 'branches',
        component: BranchesComponent
      },
      {
        path: 'domains',
        component: DomainsComponent
      },
      {
        path: 'floors',
        component: FloorsComponent
      },
      {
        path: 'rooms',
        component: RoomsComponent
      },
      {
        path: 'schedules',
        component: SchedulesComponent
      },
      {
        path: 'workstations',
        component: WorkstationComponent
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
