import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { AppState } from '../../app.reducer';
import { setFloorNumber, setPeopleNumber, setMeanOfTransport, setSelectedDate } from '../reservation.actions';

@Component({
  selector: 'app-reservation-summary',
  templateUrl: './reservation-summary.component.html',
  styleUrls: ['./reservation-summary.component.scss']
})
export class ReservationSummaryComponent implements OnInit {

  prueba: string = 'Puesto Reserva';
  fecha : string ='Fecha de Reserva';
  piso: number = 0;
  continuar: boolean = false;
  peopleNumber: number = 0;
  workstation: string = "";
  meanOfTransport: number | null = 0;
  nameTransport: string = "";
  selectedDateSummary : Date =new Date;
  meses = [
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
  ];

  constructor(
    private store: Store<AppState>
  ) {
    this.store
      .select('reservation')
      .subscribe(({ floorNumber, peopleNumber, continuar, meanOfTransport, workstation, selectedDateSummary}) => {
        console.log('data from store ngrx', { floorNumber, peopleNumber, continuar, meanOfTransport, workstation, selectedDateSummary });
        this.setFloorNumber(floorNumber);
        this.setContinue(continuar);
        this.setPeopleNumber(peopleNumber);
        this.setWorkstation(workstation);
        this.setMeanOfTransport(meanOfTransport);
        this.setPrueba();
        this.setSelectedDate(selectedDateSummary);
        this.setFecha();
      });

  }

  ngOnInit(): void {
  }

  setFloorNumber(floor: number) {
    this.piso = floor;
  }

  setContinue(continuar: boolean) {
    this.continuar = continuar;
    console.log(continuar);
  }
  setPeopleNumber(peopleNumber: number) {
    this.peopleNumber = peopleNumber;
  }

  setWorkstation(workstation: string) {
    this.workstation = workstation;
  }

  setMeanOfTransport(meanOfTransport: number | null) {
    this.meanOfTransport = meanOfTransport;

  }
  setPrueba() {
    if (this.continuar === true) {
      if (this.peopleNumber === 1) {
        this.prueba = `Piso ${this.piso} , ${this.workstation}, ${this.peopleNumber} persona , ${this.nameOfTransport}`;
      } else {
        this.prueba = `Piso ${this.piso} , ${this.workstation}, ${this.peopleNumber} personas , ${this.nameOfTransport}`;
      }
    }
    this.continuar===false;
  }

  setSelectedDate(selectedDateSummary : Date){
    this.selectedDateSummary = selectedDateSummary;

  }

  setFecha(){
    const selectedDate = moment(this.selectedDateSummary).format('Month day year');
    console.log(selectedDate);
    if (this.continuar === true) {
      
        this.fecha = `${this.meses[this.selectedDateSummary.getMonth()]} ${this.selectedDateSummary.getDate()}, ${this.selectedDateSummary.getFullYear()}`;
      
    }
    this.continuar===false;

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
