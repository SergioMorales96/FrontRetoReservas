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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewWorkstationComponent } from './pages/workstation/view-workstation/view-workstation.component';
import { ListWorkstationComponent } from './pages/workstation/list-workstation/list-workstation.component';
import { FormWorkstationComponent } from './pages/workstation/form-workstation/form-workstation.component';
import { ListDomainComponent } from './pages/domains/list/list-domain.component';
import { FormDomainComponent } from './pages/domains/form/form-domain.component';


import { FormFloorComponent  } from './pages/floors/form/form.floor.component';
import { ListfloorComponent } from './pages/floors/list/list-floor.component';
import { ViewFloorComponent } from './pages/floors/view/view-floor.component';
import { SortPipe } from './pipes/sort.pipe';


@NgModule({
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
    ListRoomComponent,
    FormRoomComponent,
    ViewRoomComponent,
    ViewWorkstationComponent,
    ListWorkstationComponent,
    FormWorkstationComponent,
    ListDomainComponent,
    FormDomainComponent,
    SortPipe,
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
