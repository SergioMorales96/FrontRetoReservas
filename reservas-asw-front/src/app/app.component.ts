import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.reducer';
import { setSidebarActive } from './reservations/reservation.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  sidebarActive!: boolean;

  constructor(
    private store: Store<AppState>
  ) {
    this.store.select('reservation').subscribe((reservation) => this.sidebarActive = reservation.sidebar.sidebarActive);
  }

  ngOnInit(): void {
  }

  changeSidebarActive(sidebarActive: boolean) {
    this.sidebarActive = sidebarActive;
    this.store.dispatch(setSidebarActive({sidebarActive : sidebarActive}))
  }
}
