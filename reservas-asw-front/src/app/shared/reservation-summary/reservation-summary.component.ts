import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { AppState } from '../../app.reducer';
import { setFloorNumber, setPeopleNumber, setMeanOfTransport, setSelectedDate, setSymptoms, setSteps } from '../reservation.actions';

@Component({
  selector: 'app-reservation-summary',
  templateUrl: './reservation-summary.component.html',
  styleUrls: ['./reservation-summary.component.scss']
})
export class ReservationSummaryComponent implements OnInit {

  prueba: string = 'Puesto Reserva';
  fecha : string ='Fecha de Reserva';
  sintomas: string ='Información del Asistente';
  piso: number = 0;
  peopleNumber: number = 0;
  workstation: number = 0;
  meanOfTransport: number | null = 0;
  nameTransport: string = "";
  selectedDateSummary : Date =new Date;
  symptoms: string = '';
  step: number = 0;
 /* meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];*/

  constructor(
    private store: Store<AppState>
  ) {
    this.store
      .select('reservation')
      .subscribe(({ floorNumber, peopleNumber, meanOfTransport, reservationId, selectedDateSummary, symptoms, step}) => {
        console.log('data from store ngrx', { floorNumber, peopleNumber, meanOfTransport, reservationId, selectedDateSummary, symptoms, step });
        this.setSteps( step );this.setFloorNumber(floorNumber);
        this.setPeopleNumber(peopleNumber);
        this.setWorkstation(reservationId);
        this.setMeanOfTransport(meanOfTransport);
        this.setPrueba();
        this.setSelectedDate(selectedDateSummary);
        this.setFecha();
        this.setSymptoms(symptoms);
        this.setInfoAssitent();
      });

  }

  ngOnInit(): void {
  }

  setFloorNumber(floor: number) {
    this.piso = floor;
  }

  setSteps(step: number){
    this.step=step;
    console.log('step ', step);
  }

  setPeopleNumber(peopleNumber: number) {
    this.peopleNumber = peopleNumber;
  }

  setWorkstation(workstation: number) {
    this.workstation = workstation;
  }

  setMeanOfTransport(meanOfTransport: number | null) {
    this.meanOfTransport = meanOfTransport;

  }
  setPrueba() {
    if (this.step >= 2) {
      if (this.peopleNumber === 1) {
        this.prueba = `Piso ${this.piso} , puesto ${this.workstation} , ${this.peopleNumber} persona , ${this.nameOfTransport}`;
      } else {
        this.prueba = `Piso ${this.piso} , puesto ${this.workstation} , ${this.peopleNumber} personas , ${this.nameOfTransport}`;
      }
    }
  }

  setInfoAssitent() {
    if (this.step >= 4) {
     
        this.sintomas = `Ha tenido sintomas : ${this.symptoms} `;
     
    }
  }

  setSelectedDate(selectedDateSummary : Date){
    this.selectedDateSummary = selectedDateSummary;

  }

  setSymptoms(symptoms:string){
    this.symptoms=symptoms;

  }

  setFecha(){
    //const selectedDate = moment(this.selectedDateSummary).format('DD-MM-yyyy');
    //console.log(selectedDate);
    if (this.step >= 3) {
      
        //this.fecha = `${this.meses[this.selectedDateSummary.getMonth()]} ${this.selectedDateSummary.getDate()}, ${this.selectedDateSummary.getFullYear()}`;
          this.fecha='';
    }

  }

  get nameOfTransport(): string {
    switch (this.meanOfTransport) {
      case this.meanOfTransport = 3:
        return this.nameTransport = 'Bicicleta';
      case this.meanOfTransport = 2:
        return this.nameTransport = 'Carro';
      case this.meanOfTransport = 1:
        return this.nameTransport = 'Moto';
      default:
        return this.nameTransport = 'Ninguno';


    }
  }
}
