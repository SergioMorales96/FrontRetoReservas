import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrimeNgModule } from '../prime-ng/prime-ng.module';

import { ErrorPageComponent } from './error-page/error-page.component';
import { MenuComponent } from './menu/menu.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    ErrorPageComponent,
    MenuComponent,
    SidebarComponent,
  ],
  exports: [
    ErrorPageComponent,
    MenuComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    PrimeNgModule,
  ]

})
export class SharedModule { }
