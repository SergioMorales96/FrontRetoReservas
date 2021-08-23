import { Component, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { setResponsive, setSidebar } from '../../reservations/reservation.actions';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'
  ]
})
export class MenuComponent{

  constructor(private store:Store<AppState>) { }

  changeSidebarActive(sidebarActive: boolean) {
    this.store.dispatch(setSidebar({ sidebar: {sidebarActive : sidebarActive} }))
  }
}
