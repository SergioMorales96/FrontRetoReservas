import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { AppState } from '../../../../app/app.reducer';
import { setFloorNumber, setPeopleNumber, setMeanOfTransport, setSelectedDate, setSymptoms, setSteps, setStartTime } from '../../reservation.actions';

@Component({
  selector: 'app-reservation-summary',
  templateUrl: './reservation-summary.component.html',
  styleUrls: ['./reservation-summary.component.scss']
})
export class ReservationSummaryComponent implements OnInit {

  info: string = 'Puesto Reserva';
  fecha : string ='Fecha de Reserva';
  timeMinutes:string='';
  sintomas: string ='Información del Asistente';
  piso: number = 0;
  peopleNumber: number = 0;
  workstation: number = 0;
  meanOfTransport: number | null = 0;
  nameTransport: string = "";
  selectedDateSummary : Date | string =new Date;
  symptoms: string = '';
  step: number = 0;
  timePeriod: number=0;
  startTime:string="";
  endTime:string="";
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
      .subscribe(({ floorNumber, peopleNumber, meanOfTransport, reservationId, selectedDateSummary, symptoms, step, timePeriod, startTime, endTime }) => {
        //console.log('data from store ngrx', { floorNumber, peopleNumber, meanOfTransport, reservationId, selectedDateSummary, symptoms, step, timePeriod, startTime, endTime });
        this.setSteps( step );this.setFloorNumber(floorNumber);
        this.setPeopleNumber(peopleNumber);
        this.setWorkstation(reservationId);
        this.setMeanOfTransport(meanOfTransport);
        this.setInfo();
        this.setSelectedDate(selectedDateSummary, timePeriod, startTime, endTime);
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
  setInfo() {
    if (this.step >= 2) {
      if (this.peopleNumber === 1) {
        this.info = `Piso ${this.piso} , puesto ${this.workstation} , ${this.peopleNumber} persona , ${this.nameOfTransport}`;
      } else {
        this.info = `Piso ${this.piso} , puesto ${this.workstation} , ${this.peopleNumber} personas , ${this.nameOfTransport}`;
      }
    }
  }

  setInfoAssitent() {
    if (this.step >= 4) {
     
        this.sintomas = `Ha tenido sintomas : ${this.symptoms} `;
     
    }
  }

  setSelectedDate(selectedDateSummary : Date | string, timePeriod: number, startTime : string, endTime:string){
    this.selectedDateSummary = selectedDateSummary;
    this.timePeriod=timePeriod;
    this.startTime=startTime;
    this.endTime=endTime;

  }

  setSymptoms(symptoms:string){
    this.symptoms=symptoms;

  }

  setFecha(){
    //const selectedDate = moment(this.selectedDateSummary).format('DD-MM-yyyy');
    //console.log(selectedDate);
    if (this.step >= 3) {
      
        //this.fecha = `${this.meses[this.selectedDateSummary.getMonth()]} ${this.selectedDateSummary.getDate()}, ${this.selectedDateSummary.getFullYear()}`;
          this.fecha= ` ${this.startTime.toLowerCase()} - ${this.endTime.toLowerCase()} `;
          this.timeMinutes=`( ${this.timePeriod*60} )`;
          if(this.selectedDateSummary===''){
            this.selectedDateSummary=new Date;
          }
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
