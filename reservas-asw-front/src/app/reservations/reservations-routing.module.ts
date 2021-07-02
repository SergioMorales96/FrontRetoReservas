import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AddComponent } from './pages/add/add.component';
import { HomeComponent } from './pages/home/home.component';
import { SceneComponent } from './components/scene/scene.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'add',
        component: AddComponent
      },
      {
        path: 'scene',
        component: SceneComponent
      },
      {
        path: '**',
        redirectTo: 'home'
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
export class ReservationsRoutingModule { }
