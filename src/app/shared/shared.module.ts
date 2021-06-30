import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ErrorPageComponent } from './error-page/error-page.component';



@NgModule({
  declarations: [
    MenuComponent,
    SidebarComponent,
    ErrorPageComponent
  ],
  exports: [
    MenuComponent,
    SidebarComponent,
    ErrorPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
