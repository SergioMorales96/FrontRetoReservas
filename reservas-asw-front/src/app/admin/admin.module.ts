import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';

import { AdminsComponent } from './pages/admins/admins.component';
import { BranchesComponent } from './pages/branches/branches.component';
import { DomainsComponent } from './pages/domains/domains.component';
import { FloorsComponent } from './pages/floors/floors.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { SchedulesComponent } from './pages/schedules/schedules.component';
import { WorkstationComponent } from './pages/workstation/workstation.component';
import { ListAdminComponent } from './pages/admins/table/list-admin.component';
import { AddAdminComponent } from './pages/admins/add/add-admin.component';
import { ViewAdminComponent } from './pages/admins/view/view-admin.component';



@NgModule({
  imports: [
    AdminRoutingModule,
    PrimeNgModule
  ],
  declarations: [
    AdminsComponent,
    BranchesComponent,
    DomainsComponent,
    FloorsComponent,
    RoomsComponent,
    SchedulesComponent,
    WorkstationComponent,
    ListAdminComponent,
    AddAdminComponent,
    ViewAdminComponent,
  ]
})
export class AdminModule { }
