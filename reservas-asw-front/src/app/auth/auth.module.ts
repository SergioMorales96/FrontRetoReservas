import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';

import { ProfileComponent } from './profile/profile.component';
import { PruebacAGuard } from './pruebac-a.guard';



@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
  providers: [PruebacAGuard]
})
export class AuthModule { }
