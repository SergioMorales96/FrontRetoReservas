import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.reducer';
import { setResponsive } from './reservations/reservation.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  display: boolean = true;
  responsive: boolean = true;

  constructor(
    private store: Store<AppState>
  ) {
    this.store.select('reservation').subscribe((reservation) => this.responsive = reservation.responsive);
  }

  ngOnInit(): void {
  }

  changeResponsive(responsive: boolean) {
    this.responsive = responsive;
    this.store.dispatch(setResponsive({ responsive: responsive }))
  }
}
