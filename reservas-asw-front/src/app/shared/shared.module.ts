import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrimeNgModule } from '../prime-ng/prime-ng.module';

import { ErrorPageComponent } from './error-page/error-page.component';
import { MenuComponent } from './menu/menu.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CalendarComponent } from '../reservations/components/calendar/calendar.component';
import { ReservationsModule } from '../reservations/reservations.module';



@NgModule({
  declarations: [
    ErrorPageComponent,
    MenuComponent,
    ReservationFormComponent,
    SidebarComponent,
  ],
  exports: [
    ErrorPageComponent,
    MenuComponent,
    ReservationFormComponent,
    SidebarComponent,
    ErrorPageComponent,

  ],
  imports: [
    CommonModule,
    ReservationsModule,
    RouterModule,
    PrimeNgModule
  ]
})
export class SharedModule { }
