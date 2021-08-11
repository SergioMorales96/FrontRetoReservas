import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.reducer';
import { environment } from '../environments/environment'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  display: boolean = false;
  responsive: boolean = false;
  assetsUrl = environment.assetsUrl

  constructor(
    private store: Store<AppState>
  ){}

  ngOnInit(): void {
    this.store.select('reservation').subscribe((reservation) => {
      this.display = reservation.display;
    });
  }
}
