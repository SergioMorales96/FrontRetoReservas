import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { setFloorNumber } from '../reservation.actions';

@Component({
  selector: 'app-reservation-summary',
  templateUrl: './reservation-summary.component.html',
  styleUrls: ['./reservation-summary.component.scss']
})
export class ReservationSummaryComponent implements OnInit {

  prueba:string= 'Puesto Reserva';
  piso:number = 0;
  continuar:boolean = false;
  
  
  constructor(
    private store:Store<AppState>
  ) { 
    this.store
    .select( 'reservation' )
    .subscribe( ({ floorNumber, peopleNumber, continuar }) => {
    console.log( 'data from store ngrx', { floorNumber, peopleNumber, continuar } );
    this.setFloorNumber(floorNumber);
    this.setContinue(continuar);
    this.setPrueba();
  });
  
}

  ngOnInit(): void {
  }

  setFloorNumber(floor:number){
    this.piso=floor;
  }

  setContinue(continuar: boolean){
    this.continuar=continuar;
    console.log(continuar);
  }

  setPrueba(){
    if (this.continuar===true){
      this.prueba = `Piso ${this.piso} , reserva:`;
    }
    
  }


}
