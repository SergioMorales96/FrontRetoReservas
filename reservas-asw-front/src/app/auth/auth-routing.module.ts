import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PruebacAGuard } from 'src/app/auth/pruebac-a.guard';

import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: '**',
        redirectTo: 'profile'
      }
    ]
  }
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forChild( routes )
  ]
})
export class AuthRoutingModule { }
