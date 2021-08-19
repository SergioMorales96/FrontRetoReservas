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

  //view: number = 1;

  constructor(    private store: Store<AppState>,
    ) { }

  /*changeVal(val: any) {
    this.view = val;
  }*/

  ngOnInit(): void {

    this.store.select('reservation').subscribe((reservation) => {
      
      this.step=reservation.step;    
       
    });


  }

}
