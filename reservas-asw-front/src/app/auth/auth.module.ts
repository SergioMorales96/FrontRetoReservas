import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';

import { ProfileComponent } from './profile/profile.component';
import { CActiveGuard } from './c-active.guard';
import { CLoadService } from './c-load.service';



@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
  providers: [CActiveGuard,CLoadService]
})
export class AuthModule { }
