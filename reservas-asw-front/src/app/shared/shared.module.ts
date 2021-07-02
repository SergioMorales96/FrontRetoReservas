import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { CalendarComponent } from '../reservations/components/calendar/calendar.component';
import { ReservationsModule } from '../reservations/reservations.module';



@NgModule({
  declarations: [
    MenuComponent,
    SidebarComponent,
    ErrorPageComponent
  ],
  exports: [
    MenuComponent,
    SidebarComponent,
    ErrorPageComponent,

  ],
  imports: [
    CommonModule,
    ReservationsModule
  ]
})
export class SharedModule { }
