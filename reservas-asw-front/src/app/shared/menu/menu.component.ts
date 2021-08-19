import { Component, OnInit,HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { setResponsive } from '../../reservations/reservation.actions';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'
  ]
})
export class MenuComponent implements OnInit {
  viewSidebar!:boolean;

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


  constructor(private store:Store<AppState>) { }

  ngOnInit() {
    this.store.select('reservation').subscribe(
      (reservation) => {
        this.viewSidebar = reservation.responsive;
      }
    )
  }

  changeResponsive(responsive: boolean) {
    this.viewSidebar = responsive;
    this.store.dispatch(setResponsive({ responsive: responsive }))
  }
}
