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
import { ListRoomComponent } from './pages/rooms/list/list-room.component';
import { FormRoomComponent } from './pages/rooms/form/form-room.component';
import { ViewRoomComponent } from './pages/rooms/view/view-room.component';
import { ListBranchComponent } from './pages/branches/list/list-branch.component';
import { ViewBranchComponent } from './pages/branches/view/view-branch.component';
import { FormBranchComponent } from './pages/branches/form/form-branch.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListDomainComponent } from './pages/domains/list/list-domain.component';
import { FormDomainComponent } from './pages/domains/form/form-domain.component';

import { SortPipe } from './pipes/sort.pipe';



@NgModule({
  declarations: [
    AdminsComponent,
    BranchesComponent,
    DomainsComponent,
    FloorsComponent,
    RoomsComponent,
    SchedulesComponent,
    WorkstationComponent,
    ListRoomComponent,
    FormRoomComponent,
    ViewRoomComponent,
    ListBranchComponent,
    ViewBranchComponent,
    FormBranchComponent,
    ListDomainComponent,
    FormDomainComponent,
    SortPipe
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule
  ],
})
export class AdminModule { }
