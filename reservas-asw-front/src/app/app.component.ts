import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'reservas-asw-front';
  display: boolean = false;
  responsive: boolean = false;

  constructor(
    private store: Store<AppState>
  ){}

  ngOnInit(): void {
    this.store.select('reservation').subscribe((reservation) => {
      this.display = reservation.display;
    });
  }
}
