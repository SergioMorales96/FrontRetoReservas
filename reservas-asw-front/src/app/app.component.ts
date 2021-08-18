import { Component, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.reducer';
import { environment } from '../environments/environment'
import { setResponsive } from './reservations/reservation.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  display: boolean = false;
  responsive!: boolean;
  assetsUrl = environment.assetsUrl
  inside = false;
  
  @HostListener("click")
  clicked() {
    this.inside = true;
  }

  @HostListener("document:click")
  clickedOut() {
    this.inside
      ? null
      : this.changeResponsive(false);
    this.inside = false;
  }
  
  changeResponsive(responsive: boolean){
    this.responsive = responsive;
    this.store.dispatch(setResponsive({responsive : responsive}))
  }


  constructor(
    private store: Store<AppState>
  ){}

  ngOnInit(): void {
    this.store.select('reservation').subscribe((reservation) => {
      this.display = reservation.display;
    });
    this.store.select('reservation').subscribe(
      (reservation) => this.responsive = reservation.responsive
    );
  }
}
