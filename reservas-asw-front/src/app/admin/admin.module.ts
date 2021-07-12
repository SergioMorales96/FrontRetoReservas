import { CommonModule } from '@angular/common';
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
import { ListRoomComponent } from './pages/rooms/list/list-room.component';
import { FormRoomComponent } from './pages/rooms/form/form-room.component';
import { ViewRoomComponent } from './pages/rooms/view/view-room.component';
import { ListBranchComponent } from './pages/branches/list/list-branch.component';
import { ViewBranchComponent } from './pages/branches/view/view-branch.component';
import { FormBranchComponent } from './pages/branches/form/form-branch.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormScheduleComponent } from './pages/schedules/form/form-schedule.component';
import { ListScheduleComponent } from './pages/schedules/list/list-schedule.component';
import { ViewScheduleComponent } from './pages/schedules/view/view-schedule.component';
import { ListDomainComponent } from './pages/domains/list/list-domain.component';
import { FormDomainComponent } from './pages/domains/form/form-domain.component';

import { SortPipe } from './pipes/sort.pipe';
import { ViewDomainComponent } from './pages/domains/view/view-domain.component';

import { FormFloorComponent  } from './pages/floors/form/form.floor.component';
import { ListfloorComponent } from './pages/floors/list/list-floor.component';
import { ViewFloorComponent } from './pages/floors/view/view-floor.component';


@NgModule({
  imports: [
    AdminRoutingModule,
    PrimeNgModule,
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule
  ],
  declarations: [
    AdminsComponent,
    BranchesComponent,
    DomainsComponent,
    FloorsComponent,
    FormFloorComponent,
    ListfloorComponent,
    ViewFloorComponent,
    RoomsComponent,
    SchedulesComponent,
    WorkstationComponent,
    ListAdminComponent,
    AddAdminComponent,
    ViewAdminComponent,
    ListRoomComponent,
    FormRoomComponent,
    ViewRoomComponent,
    ListBranchComponent,
    ViewBranchComponent,
    FormBranchComponent,
    FormScheduleComponent,
    ListScheduleComponent,
    ViewScheduleComponent,
    ListDomainComponent,
    FormDomainComponent,
    ViewDomainComponent,
    SortPipe
  ],
})
export class AdminModule { }
