import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ReservationsRoutingModule } from './reservations-routing.module';

import { AddComponent } from './pages/add/add.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { EditReservationComponent } from './components/reservation/edit-reservation/edit-reservation.component';
import { DataSelectorComponent } from './components/data-selector/data-selector.component';
import { HomeComponent } from './pages/home/home.component';
import { FormAssistantComponent } from './components/reservation-form/form-assistant/form-assistant.component';
import { FormDateComponent } from './components/reservation-form/form-date/form-date.component';
import { FormWorkstationComponent } from './components/reservation-form/form-workstation/form-workstation.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component';
import { ReservationSummaryComponent } from './components/reservation-summary/reservation-summary.component';
import { SceneComponent } from './components/scene/scene.component';
import { TimePeriodSliderComponent } from './components/time-period-slider/time-period-slider.component';
import { TimeSelectorComponent } from './components/time-selector/time-selector.component';
import { ViewReservationComponent } from './components/reservation/view-reservation/view-reservation.component';



@NgModule({
  declarations: [
    AddComponent,
    CalendarComponent,
    DataSelectorComponent,
    EditReservationComponent,
    FormAssistantComponent,
    FormDateComponent,
    FormWorkstationComponent,
    HomeComponent,
    ReservationComponent,
    SceneComponent,
    ReservationFormComponent,
    ReservationSummaryComponent,
    TimeSelectorComponent,
    TimePeriodSliderComponent,
    ViewReservationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    PrimeNgModule,
    ReservationsRoutingModule,
  ], 
  exports: [
    CalendarComponent,
    ReservationComponent,
    ViewReservationComponent,
    EditReservationComponent,
    SceneComponent
    ReservationFormComponent
  ]
})
export class ReservationsModule { }
