import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PrimeNgModule } from '../prime-ng/prime-ng.module';

import { ErrorPageComponent } from './error-page/error-page.component';
import { MenuComponent } from './menu/menu.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { SidebarComponent } from './sidebar/sidebar.component';



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
  ],
  imports: [
    CommonModule,
    PrimeNgModule
  ]
})
export class SharedModule { }
