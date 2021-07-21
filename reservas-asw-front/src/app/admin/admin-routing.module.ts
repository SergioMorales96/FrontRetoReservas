import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminsComponent } from './pages/admins/admins.component';
import { BranchesComponent } from './pages/branches/branches.component';
import { DomainsComponent } from './pages/domains/domains.component';
import { FloorsComponent } from './pages/floors/floors.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { SchedulesComponent } from './pages/schedules/schedules.component';
import { WorkstationComponent } from './pages/workstation/workstation.component';
import { FormAdminComponent } from './pages/admins/form/form-admin.component';
import { ViewAdminComponent } from './pages/admins/view/view-admin.component';
import { ListAdminComponent } from './pages/admins/list/list-admin.component';
import { ListRoomComponent } from './pages/rooms/list/list-room.component';
import { ViewRoomComponent } from './pages/rooms/view/view-room.component';
import { FormRoomComponent } from './pages/rooms/form/form-room.component';
import { ListWorkstationComponent } from './pages/workstation/list-workstation/list-workstation.component';
import { ViewWorkstationComponent } from './pages/workstation/view-workstation/view-workstation.component';
import { FormWorkstationComponent } from './pages/workstation/form-workstation/form-workstation.component';
import { ListfloorComponent } from './pages/floors/list/list-floor.component';
import { ViewFloorComponent } from './pages/floors/view/view-floor.component';
import { FormFloorComponent } from './pages/floors/form/form.floor.component';
import { ListScheduleComponent } from './pages/schedules/list/list-schedule.component';
import { FormScheduleComponent } from './pages/schedules/form/form-schedule.component';
import { ViewScheduleComponent } from './pages/schedules/view/view-schedule.component';
import { ListDomainComponent } from './pages/domains/list/list-domain.component';
import { ViewDomainComponent } from './pages/domains/view/view-domain.component';
import { FormDomainComponent } from './pages/domains/form/form-domain.component';
import { ListBranchComponent } from './pages/branches/list/list-branch.component';
import { FormBranchComponent } from './pages/branches/form/form-branch.component';
import { ViewBranchComponent } from './pages/branches/view/view-branch.component';
import { ViewReservationComponent } from '../reservations/components/reservation/view-reservation/view-reservation.component';
import { ReservationComponent } from '../reservations/components/reservation/reservation.component';
import { EditReservationComponent } from '../reservations/components/reservation/edit-reservation/edit-reservation.component';


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
            component: FormAdminComponent
          },
          {
            path: 'view/:id',
            component: ViewAdminComponent
          },
          {
            path: 'edit/:id',
            component: FormAdminComponent
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
      //Reserva
      // {
      //   path: 'reserva',
      //   component: ReservationComponent,
      //   children: [
      //     {
      //       path: 'reserva_usuario/11-07-2021/13-07-2021/user6@asesoftware.com',
      //       component: EditReservationComponent
      //     },
      //     {
      //       path:'',
      //       component: ViewReservationComponent
      //     }
      //   ]
      // },
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
            component:FormFloorComponent 
          },
          {
            path:'edit/:id',
            component: FormFloorComponent 
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
    RouterModule.forChild(routes)
  ]
})
export class AdminRoutingModule { }
