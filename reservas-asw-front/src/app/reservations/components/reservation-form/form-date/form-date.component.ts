import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../app.reducer';
import { ReservationsService } from '../../../services/reservations.service';
import { DataResponse } from '../../../interfaces/reservations.interface';
import { EmittedValue } from 'src/app/reservations/interfaces/shared.interfaces';
import { setEndTime, setStartTime, setTimePeriod, setScheduleValue } from '../../../reservation.actions';
import * as moment from 'moment';

interface workSchedule {
  index: any;
  label: string;
  initialTime: string;
  endingTime: string;
  timePeriod: number;
}

@Component({
  selector: 'app-form-date',
  templateUrl: './form-date.component.html',
  styleUrls: ['./form-date.component.scss'],
})
export class FormDateComponent implements OnInit {

  @Input() submitted!: boolean;
  @Input() formGroupName!: string;

  private todayDate: Date = new Date();

  form!: FormGroup;
  capacity: number = 0;
  endTime!: string;
  startTime!: string;
  hora_i!: string;
  hora_f!: string;
  dateAforo!: string;
  responseAforo!: number | any;
  responseCapacityRoom!: number | any;
  responseAviableRoom!: number | any;
  responseCapacityfloor!: number | any;
  floor!: number;
  reservationId: number = 1;
  isWorkstation!: boolean;
  workSchedules: workSchedule[] = [];
  timePeriod!: number;
  scheduleValue!: number;
  currentDate: Date;
  horaString!: string;



  constructor(
    private rootFormGroup: FormGroupDirective,
    private store: Store<AppState>,
    private reservationService: ReservationsService,
  ) {
    this.currentDate = new Date();
    this.workSchedules = [
      {   
        index: 1,
        label: "Seleccione",
        initialTime: "00:00 AM",
        endingTime: "00:00 AM",
        timePeriod: 0        
      },
      {   
        index: 2,
        label: "Mañana",
        initialTime: "08:00 AM",
        endingTime: "12:00 PM",
        timePeriod: 4        
      },
      {   
        index: 3,
        label: "Tarde",
        initialTime: "1:00 PM",
        endingTime: "5:00 PM",
        timePeriod: 4
      },
      {   
        index: 4,
        label: "Completa",
        initialTime: "08:00 AM",
        endingTime: "5:00 PM",
        timePeriod: 8
      }
    ];
  }

  ngOnInit(): void {
    
    this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
    this.store.select('reservation').subscribe(async (reservation) => {
      this.isWorkstation = reservation.isWorkstation;
      this.endTime = reservation.endTime;
      this.startTime = reservation.startTime;
      this.reservationId = reservation.reservationId;
      this.floor = reservation.floorNumber;
      this.scheduleValue = reservation.scheduleValue;
      
      const selectedDate = moment(this.todayDate).format('DD-MM-yyyy');
      const currentHour = moment().format('HH:mm A');

      if ((selectedDate == String(this.form.controls['fecha'].value))) {
        if(currentHour > moment(this.endTime, 'hh:mm A').format('HH:mm')) this.form.controls['periodoTiempo'].setValue(0);
      }
      
      if (this.endTime && this.form.controls['fecha'].value != "Invalid date") {
        if (!this.isWorkstation) {
          this.responseAviableRoom = (await this.AforoSala())?.data;
          this.responseCapacityRoom = (await this.AforoDisponibilidadSala())?.data;
          this.capacity = this.responseCapacityRoom;
          if (this.responseAviableRoom != null) {
            this.capacity = 0;
          }
        } else {
          this.responseCapacityfloor = (await this.AforoPuesto()).data;
          this.capacity = this.responseCapacityfloor;
        }
      }
    });
  }

  get validDate(){
    if (this.form.controls['fecha'].value != "Invalid date"){
      return true;
    }
    else return false;
  }

  AforoPuesto(): Promise<DataResponse> {
    this.dateAforo = this.form.controls['fecha'].value;
    this.hora_i = "01-01-1970 " + this.startTime.slice(0, 5) + ":00";
    this.hora_f = "01-01-1970 " + this.endTime.slice(0, 5) + ":00";
    return this.reservationService
      .aforoPuestos(this.dateAforo, this.hora_i, this.hora_f, this.floor)
      .toPromise();
  }

  AforoSala(): Promise<DataResponse> {
    this.dateAforo = this.form.controls['fecha'].value;
    this.hora_i = "01-01-1970 " + this.startTime.slice(0, 5) + ":00";
    this.hora_f = "01-01-1970 " + this.endTime.slice(0, 5) + ":00";
    return this.reservationService
      .aforoSalas(this.dateAforo, this.hora_i, this.hora_f, this.floor, this.reservationId)
      .toPromise();
  }
  AforoDisponibilidadSala(): Promise<DataResponse> {
    return this.reservationService
      .cantidadSalas(this.reservationId)
      .toPromise();
  }

  onChangeSchedule( selectedSchedule: EmittedValue ): void {
    
    const selectedDate = moment(this.todayDate).format('DD-MM-yyyy');
    const currentHour = moment().format('HH:mm A');  
    const workSchedule = this.workSchedules.find(x => x.index === selectedSchedule.value);
    
    if (selectedDate == String(this.form.controls['fecha'].value)) {

      if(currentHour > moment(workSchedule?.endingTime, 'hh:mm A').format('HH:mm')) 
      {        
        this.store.dispatch( setEndTime({ endTime: String(workSchedule?.endingTime) }) );
        this.store.dispatch( setStartTime({ startTime: String(workSchedule?.initialTime)}) );
      }else{
      
        this.store.dispatch( setEndTime({ endTime: String(workSchedule?.endingTime) }) );
        this.store.dispatch( setStartTime({ startTime: String(workSchedule?.initialTime) }) );
        this.store.dispatch( setTimePeriod({ timePeriod: Number(workSchedule?.timePeriod) }) );
        this.store.dispatch( setScheduleValue({ scheduleValue: Number(workSchedule?.index)}) );
  
        this.form.controls['periodoTiempo'].setValue( Number(workSchedule?.timePeriod) );
      }

    }else{
      this.store.dispatch( setEndTime({ endTime: String(workSchedule?.endingTime) }) );
        this.store.dispatch( setStartTime({ startTime: String(workSchedule?.initialTime) }) );
        this.store.dispatch( setTimePeriod({ timePeriod: Number(workSchedule?.timePeriod) }) );
        this.store.dispatch( setScheduleValue({ scheduleValue: Number(workSchedule?.index)}) );
        
        this.form.controls['periodoTiempo'].setValue( Number(workSchedule?.timePeriod) );
    }

  }

}
