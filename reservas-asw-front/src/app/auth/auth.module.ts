import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';

import { ProfileComponent } from './profile/profile.component';
import { CActiveGuard } from './c-active.guard';
import { CLoadService } from './c-load.service';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    ProfileComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
  providers: [CActiveGuard,CLoadService]
})
export class AuthModule { }
