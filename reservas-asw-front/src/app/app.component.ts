import { Component,HostListener } from '@angular/core';
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

  inside = false;

  @HostListener("click")
  clicked() {
    this.inside = true;
  }

  @HostListener("document:click")
  clickedOut() {
    this.inside
    ? null
    : this.changeSidebarActive(false);
    this.inside = false;
  }

  constructor(
    private store: Store<AppState>
  ) {
    this.store.select('reservation').subscribe((reservation) => this.sidebarActive = reservation.sidebar.sidebarActive);
  }

  changeSidebarActive(sidebarActive: boolean) {
    this.sidebarActive = sidebarActive;
    this.store.dispatch(setSidebarActive({sidebarActive : sidebarActive}))
  }
}
