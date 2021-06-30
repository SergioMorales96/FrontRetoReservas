import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { ErrorPageComponent } from './shared/error-page/error-page.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import( './auth/auth.module' ).then( m => m.AuthModule )
  },
  {
    path: 'reservations',
    loadChildren: () => import( './reservations/reservations.module' ).then( m => m.ReservationsModule )
  },
  {
    path: '404',
    component: ErrorPageComponent
  }, 
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot( routes )
  ]
})
export class AppRoutingModule { }
