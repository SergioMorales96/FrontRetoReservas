import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';

<<<<<<< HEAD


import { AddComponent } from './components/add/add.component';
=======
>>>>>>> origin/team-0
import { AdminsComponent } from './pages/admins/admins.component';
import { BranchesComponent } from './pages/branches/branches.component';
import { DomainsComponent } from './pages/domains/domains.component';
import { FloorsComponent } from './pages/floors/floors.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { SchedulesComponent } from './pages/schedules/schedules.component';
import { WorkstationComponent } from './pages/workstation/workstation.component';
<<<<<<< HEAD
import { ListfloorComponent } from './pages/floors/table/list-floor.component';
import { AddFloorComponent } from './pages/floors/add/add.floor.component';
import { ViewFloorComponent } from './pages/floors/view/view-floor.component';
=======
import { ListRoomComponent } from './pages/rooms/list/list-room.component';
import { FormRoomComponent } from './pages/rooms/form/form-room.component';
import { ViewRoomComponent } from './pages/rooms/view/view-room.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
>>>>>>> origin/team-0



@NgModule({
  declarations: [
    AdminsComponent,
    BranchesComponent,
    DomainsComponent,
    FloorsComponent,
    RoomsComponent,
    SchedulesComponent,
    WorkstationComponent,
<<<<<<< HEAD
    ListfloorComponent,
    AddFloorComponent,
    ViewFloorComponent,
=======
    ListRoomComponent,
    FormRoomComponent,
    ViewRoomComponent,
>>>>>>> origin/team-0
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
<<<<<<< HEAD
    PrimeNgModule
  ]
=======
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule
  ],
>>>>>>> origin/team-0
})
export class AdminModule { }
