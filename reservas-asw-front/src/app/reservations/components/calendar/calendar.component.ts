import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Reservation, ReservationsResponse } from '../../interfaces/reservations.interface';
import { ReservationsService } from '../../services/reservations.service';
import * as moment from 'moment';
import { DateValidationType } from 'src/utils/enums';
import { DataResponse } from '../../interfaces/reservations.interface';
import { ToastsService } from '../../../services/toasts.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  dateValue: Date = new Date();

  constructor(
    private reservationsService: ReservationsService,
    private toastService: ToastsService,
    private store: Store<AppState>
  ) { 
    this.store
    .select( 'reservation' )
    .subscribe( reservation => console.log( reservation.floorNumber ) );
  }

  @Input() dateValidationType: DateValidationType = DateValidationType.DayCapacity;
  @Input() dateCar: DateValidationType = DateValidationType.ParkingAvailabilityPerCar;

  @Input() selectedFloor!: number;
  @Output() onDayCapacity: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onDayParkingAvailabilityPerCar: EventEmitter<boolean> = new EventEmitter<boolean>();/////


  selectedDate: Date = new Date();

  
  ngOnInit(): void {

  }

  //Las fechas en esta lista desactivan los días en el calendario
  invalidDates: Date[] = [];
  //Las fechas en esta lista colorean la mitad de arriba de los días en el calendario
  morning: number[] = [];
  //Las fechas en esta lista colorean la mitad de abajo de los días en el calendario
  afterNoon: number[] = [];
  //Las fechas en esta lista colorean el día completo de los días en el calendario
  complete: number[] = [];
  //Resultado de consutla al servicio back se almacena en reservations
  reservations: Reservation[] = [];

  //Número de personas para saber si se trata de una sala o un puesto de trabajo
  private _numberOfPeople: number = 0;

  //Id del puesto de trabajo o de la sala
  private _id: number = 0;

  private tempDate: Date = new Date();

  private roomUrlPlugin: string = 'reservas/reservas_sala';

  private workstationUrlPlugin: string = 'reservas/reservas_puesto';

  //Atributo que se usa para especificar las fechas en las que se quiere realizar la consulta
  private queryDates: string = '';

  currentMonth: number = 0;

  afterNoonM(day: number): boolean {
    return this.afterNoon.includes(day);
  }

  morningM(day: number): boolean {
    return this.morning.includes(day);
  }

  completeM(day: number): boolean {
    return this.complete.includes(day);
  }

  monthChange(month: number, year: number): void {
    this.complete = [];
    this.morning = [];
    this.afterNoon = [];
    this.invalidDates = [];
    this.tempDate.setMonth(month-1);
    this.tempDate.setDate(1);
    this.tempDate.setFullYear(year);
    this.consultReservations();
  }

  consultReservations(): void {
    this.setDates(this.tempDate);
    let urlPlugin: string = this._numberOfPeople > 1 ? this.roomUrlPlugin : this.workstationUrlPlugin;

    this.reservationsService.sendRequest(urlPlugin, this.queryDates)
      .subscribe(
        (answ: ReservationsResponse) => {
          this.reservations = answ.data;
          this.updateCalendar();
        }
      );
  }

  updateCalendar(): void {
    let i = 0;
    let checked: string[] = [];

    for (const reservation of this.reservations) {

      if (!checked.includes(this.reservations[i].dia)) {
        checked = this.compareReservations(i, checked);
      }
      i++;
    }
  }

  private compareReservations(i: number = 0, checked: string[]): string[] {
    let flag: boolean = false;
    let iRerservation: Reservation = this.reservations[i];
    for (let j = 0; j < this.reservations.length; j++) {
      let jReservation: Reservation = this.reservations[j];
      if (j != i) {
        if (jReservation.dia === iRerservation.dia) {
          this.complete.push(parseInt(jReservation.dia));
          checked.push(jReservation.dia);
          flag = true;
        }
      }
    }

    if (!flag) {
      ((parseInt(iRerservation.horaInicio) < 13) ? (parseInt(iRerservation.horaFin) < 13 ? this.morning.push(parseInt(iRerservation.dia))
        : (this.completeDay(iRerservation, checked))
      )
        : this.afterNoon.push(parseInt(iRerservation.dia)))
    }
    return checked;
  }

  private completeDay(rev: Reservation, checked: string[]): void {
    this.complete.push(parseInt(rev.dia));
    checked.push(rev.dia);
  }

  set numberOfPeople(numOfPeople: number) {
    this._numberOfPeople = numOfPeople;
  }

  set id(id: number) {
    this._id = id;
  }

  private onMorning(reservation: Reservation): boolean {
    return true;
  }

  setDates(dateValue: Date) {
    let first = new Date(dateValue.getFullYear(), dateValue.getMonth(), 1);
    let last = new Date(dateValue.getFullYear(), dateValue.getMonth() + 1, 0);

    let month: number = dateValue.getMonth() + 1;
    let strMonth: string = month.toString();

    let year: number = dateValue.getFullYear();
    let strYear: string = year.toString();

    let startDay: number = first.getDate();
    let strStartDay: string = startDay.toString();

    let lastDay: number = last.getDate();
    let strLastDay: string = lastDay.toString();

    let startDate: string = `${strStartDay}-${strMonth}-${strYear}`;
    let endDate: string = `${strLastDay}-${strMonth}-${strYear}`;
    
    if(this._numberOfPeople > 1){
      this.queryDates = this._numberOfPeople > 1 ? `${this._id}/${startDate}/${endDate}` : '' ;
    }else {
      this.queryDates = this._numberOfPeople == 1 ? `${this._id}/${startDate}/${endDate}` : '' ;
    }
    
  }




  setSelectedDate(selectedDate: Date): void {
    this.selectedDate = selectedDate;
    this.callMethodPerDateValidationType();
    console.log(selectedDate);
  }

  callMethodPerDateValidationType(): void {
    console.log(this.dateValidationType);
    switch (this.dateValidationType) {
      case DateValidationType.DayCapacity:
        console.log('Entrando case capacity')
        this.getCapacity();//
        break;
      case DateValidationType.ParkingAvailabilityPerCar:
          console.log('Entrando case ParkingAvailabilityPerCar ')
          this.getCarParkingAvailability();
        break;

      case DateValidationType.ParkingAvailabilityPerBicycle:
        break;   
      case DateValidationType.ParkingAvailabilityPerMotorcycle:
        this.getParkingMotorcycle();
        break;
      default:
        break;
    }
  }

  getCapacity(): void {
    if (!this.selectedFloor) { 
      this.toastService.showToastWarning({summary:'Seleccione un piso',detail:'No se ha seleccionado algún piso'})
      return; 
    }
    const selectedDate = moment(this.selectedDate).format('DD-MM-yyyy');
    this.reservationsService.getCapacity(selectedDate, this.selectedFloor)
      .subscribe(
        (dataResponse: DataResponse) => {
          console.log(dataResponse);
          this.validateDayCapacity(dataResponse.data);
        });
  }

  
  getCarParkingAvailability(): void {
    const selectedDate = moment(this.selectedDate).format('DD-MM-yyyy');
    console.log(selectedDate);
    this.reservationsService.getCarParkingAvailability(selectedDate)
     .subscribe(
        (dataResponse: DataResponse) => {
          console.log(dataResponse);
          this.validateParkingAvailabilityPerCar(dataResponse.data);
          });
  }


  validateDayCapacity(data : number | any): void {
    if (data > 0) {
      this.onDayCapacity.emit(true);
    }
    else {
      this.onDayCapacity.emit(false);
      this.toastService.showToastDanger({summary:'No hay aforo disponible',detail:'En el piso seleccionado no hay capacidad en esta fecha'})
    }
  }

  
  validateParkingAvailabilityPerCar(data : number | any): void {
    if (data > 0) {
      this.onDayParkingAvailabilityPerCar.emit(true);
     
    }
    else {
      this.onDayParkingAvailabilityPerCar.emit(false);
      this.toastService.showToastDanger({ summary: 'No hay parqueaderos para carro disponibles ', detail: '' });

    }
  }
  getParkingMotorcycle(): void {
    const selectedDate = moment(this.selectedDate).format('DD-MM-yyyy');
    this.reservationsService.getParkingMotorcycle(selectedDate)
      .subscribe(
        (dataResponse: DataResponse) => {
          console.log(dataResponse);
          this.validateAvailabilityMotorcycle(dataResponse.data);
        });
  }

  validateAvailabilityMotorcycle(data : number| any): void {
    if (data > 0) {
      this.onDayCapacity.emit(true);
      this.toastService.showToastSuccess({summary: `Existen ${data} parqueaderos disponibles`,detail:''})
    }
    else {
      this.onDayCapacity.emit(false);
      this.toastService.showToastDanger({ summary: 'No hay parqueaderos para carro disponibles', detail: '' });
    }
  }


}
