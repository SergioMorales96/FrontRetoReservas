import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { CActiveGuard } from './auth/c-active.guard';
import { CLoadService } from './auth/c-load.service';

import { ErrorPageComponent } from './shared/error-page/error-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin',
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
    loadChildren: () => import( './admin/admin.module' ).then( m => m.AdminModule ),
    canLoad: [CLoadService],
    canActivate: [CActiveGuard]
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
    RouterModule.forRoot(
      routes,
      {
        useHash: true
      })
  ]
})
export class AppRoutingModule { }
