import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PrimeNgModule } from '../prime-ng/prime-ng.module';

import { ErrorPageComponent } from './error-page/error-page.component';
import { MenuComponent } from './menu/menu.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';



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
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule,
    CommonModule,
    PrimeNgModule
  ]
})
export class SharedModule { }
