import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PrimeNgModule } from '../prime-ng/prime-ng.module';

import { ErrorPageComponent } from './error-page/error-page.component';
import { MenuComponent } from './menu/menu.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormAssistantComponent } from './reservation-form/form-assistant/form-assistant.component';
import { FormDateComponent } from './reservation-form/form-date/form-date.component';
import { FormWorkstationComponent } from './reservation-form/form-workstation/form-workstation.component';
import { CalendarComponent } from '../reservations/components/calendar/calendar.component';
import { ReservationsModule } from '../reservations/reservations.module';
import { HomeComponent } from '../reservations/pages/home/home.component';
import { ReservationSummaryComponent } from './reservation-summary/reservation-summary.component';



@NgModule({
  declarations: [
    ErrorPageComponent,
    MenuComponent,
    ReservationFormComponent,
    SidebarComponent,
    FormAssistantComponent,
    FormDateComponent,
    FormWorkstationComponent,
    ReservationSummaryComponent
    
  ],
  exports: [
    ErrorPageComponent,
    MenuComponent,
    ReservationFormComponent,
    SidebarComponent,
    ReservationSummaryComponent
  ],
  imports: [
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    FormsModule,
    RouterModule,
    PrimeNgModule,
    ReservationsModule
  ]

})
export class SharedModule { }
