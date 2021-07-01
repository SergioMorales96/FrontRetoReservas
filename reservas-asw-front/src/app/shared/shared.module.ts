import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';



@NgModule({
  declarations: [
    MenuComponent,
    SidebarComponent,
    ErrorPageComponent,
    ReservationFormComponent
  ],
  exports: [
    MenuComponent,
    SidebarComponent,
    ErrorPageComponent,
    ReservationFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
