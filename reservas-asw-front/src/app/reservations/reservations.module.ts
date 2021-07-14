import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ReservationsRoutingModule } from './reservations-routing.module';

import { AddComponent } from './pages/add/add.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { HomeComponent } from './pages/home/home.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { SceneComponent } from './components/scene/scene.component';
import { TimeSelectorComponent } from './components/time-selector/time-selector.component';
import { ViewReservationComponent } from './components/reservation/view-reservation/view-reservation.component';
import { EditReservationComponent } from './components/reservation/edit-reservation/edit-reservation.component';



@NgModule({
  declarations: [
    AddComponent,
    CalendarComponent,
    HomeComponent,
    ReservationComponent,
    SceneComponent,
    TimeSelectorComponent,
    ViewReservationComponent,
    EditReservationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    PrimeNgModule,
    ReservationsRoutingModule
  ]
})
export class ReservationsModule { }
