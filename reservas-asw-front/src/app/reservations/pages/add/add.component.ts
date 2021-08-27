import { Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  step!: number;
  display!: boolean;

  constructor(private store: Store<AppState>,
    ) { }


  ngOnInit(): void {

    this.store.select('reservation').subscribe((reservation) => {
      
      this.step=reservation.step;  
      this.display=reservation.display;
      console.log(this.display);
      
       
    });


  }

}
