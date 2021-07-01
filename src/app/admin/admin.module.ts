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
import { TableComponent } from './components/table/table.component';
import { ViewComponent } from './components/view/view.component';
import { WorkstationComponent } from './pages/workstation/workstation.component';



@NgModule({
  imports: [
    AdminRoutingModule,
    PrimeNgModule
  ],
  declarations: [
    AddComponent,
    AdminsComponent,
    BranchesComponent,
    DomainsComponent,
    FloorsComponent,
    RoomsComponent,
    SchedulesComponent,
    WorkstationComponent,
    TableComponent,
    ViewComponent,
  ]
})
export class AdminModule { }
