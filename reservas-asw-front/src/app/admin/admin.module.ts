import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';



import { AddComponent } from './components/add/add.component';
import { AdminsComponent } from './pages/admins/admins.component';
import { BranchesComponent } from './pages/branches/branches.component';
import { DomainsComponent } from './pages/domains/domains.component';
import { FloorsComponent } from './pages/floors/floors.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { SchedulesComponent } from './pages/schedules/schedules.component';
import { WorkstationComponent } from './pages/workstation/workstation.component';
import { ListfloorComponent } from './pages/floors/table/list-floor.component';
import { AddFloorComponent } from './pages/floors/add/add.floor.component';
import { ViewFloorComponent } from './pages/floors/view/view-floor.component';



@NgModule({
  declarations: [
    AddComponent,
    AdminsComponent,
    BranchesComponent,
    DomainsComponent,
    FloorsComponent,
    RoomsComponent,
    SchedulesComponent,
    WorkstationComponent,
    ListfloorComponent,
    AddFloorComponent,
    ViewFloorComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    PrimeNgModule
  ]
})
export class AdminModule { }
