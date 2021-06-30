import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminsComponent } from './admins/admins.component';
import { BranchesComponent } from './branches/branches.component';
import { DomainsComponent } from './domains/domains.component';
import { FloorsComponent } from './floors/floors.component';
import { RoomsComponent } from './rooms/rooms.component';
import { SchedulesComponent } from './schedules/schedules.component';



@NgModule({
  imports: [
    AdminRoutingModule
  ],
  declarations: [
    AdminsComponent,
    BranchesComponent,
    DomainsComponent,
    FloorsComponent,
    RoomsComponent,
    SchedulesComponent
  ]
})
export class AdminModule { }
