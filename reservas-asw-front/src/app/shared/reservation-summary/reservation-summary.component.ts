import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { setFloorNumber, setPeopleNumber} from '../reservation.actions';

@Component({
  selector: 'app-reservation-summary',
  templateUrl: './reservation-summary.component.html',
  styleUrls: ['./reservation-summary.component.scss']
})
export class ReservationSummaryComponent implements OnInit {

  prueba:string= 'Puesto Reserva';
  piso:number = 0;
  continuar:boolean = false;
  peopleNumber:number=0;
  //workstation:string="";
  meanOfTransport:number | null=0;
  
  
  constructor(
    private store:Store<AppState>
  ) { 
    this.store
    .select( 'reservation' )
    .subscribe( ({ floorNumber, peopleNumber, continuar, meanOfTransport }) => {
    console.log( 'data from store ngrx', { floorNumber, peopleNumber, continuar, meanOfTransport } );
    this.setFloorNumber(floorNumber);
    this.setContinue(continuar);
    this.setPeopleNumber(peopleNumber);
   // this.setWorkstation(workstation);
    this.setMeanOfTransport(meanOfTransport);
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
  setPeopleNumber(peopleNumber:number){
    this.peopleNumber=peopleNumber;
  }

    /*
  setWorkstation(workstation:string){
    this.workstation=workstation;
  }
*/
  setMeanOfTransport (meanOfTransport: number | null){
    
    this.meanOfTransport=meanOfTransport;
  }
  setPrueba(){
    if (this.continuar===true){
      this.prueba = `Piso ${this.piso} , ${this.peopleNumber} persona , ${this.meanOfTransport}`;
    }
    
  }


}
