import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { HomeComponent } from './shared/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import( './auth/auth.module' ).then( m => m.AuthModule )
  },
  {
    path: 'reservations',
    loadChildren: () => import( './reservations/reservations.module' ).then( m => m.ReservationsModule )
  },
  {
    path: 'admin',
    loadChildren: () => import( './admin/admin.module' ).then( m => m.AdminModule )
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
