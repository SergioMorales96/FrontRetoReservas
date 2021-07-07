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
import { ListfloorComponent } from './pages/floors/list/list-floor.component';
import { ViewFloorComponent } from './pages/floors/view/view-floor.component';
import { AddFloorComponent } from './pages/floors/form/form.floor.component';

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
      {
        path: 'domains',
        component: DomainsComponent
      },
      {
        path: 'floors',
        component: FloorsComponent,
        children: [
          {
            path:'list',
            component:ListfloorComponent
          },
          {
            path:'view/:id',
            component: ViewFloorComponent
          },
          {
            path:'add',
            component:AddFloorComponent
          },
          {
            path:'edit/:id',
            component: AddFloorComponent
          },
          {
            path: '**',
            redirectTo:'list'
          }

        ]

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
    RouterModule.forChild( routes )
  ]
})
export class AdminRoutingModule { }
