import {
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  Reservation,
  ReservationsResponse,
} from '../../interfaces/reservations.interface';
import { ReservationsService } from '../../services/reservations.service';
import * as moment from 'moment';
import { DateValidationType } from 'src/utils/enums';
import { DataResponse } from '../../interfaces/reservations.interface';
import { ToastsService } from '../../../services/toasts.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../../../services/data.service';
import { setSelectedDate } from 'src/app/reservations/reservation.actions';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {

  @Output() onDayCapacity: EventEmitter<boolean>;
  @Output() onDayParkingAvailabilityPerCar: EventEmitter<boolean>;

  private tempDate: Date = new Date();
  private roomUrlPlugin: string = 'reservas/reservas_sala';
  private workstationUrlPlugin: string = 'reservas/reservas_puesto';
  private queryDates: string = '';

  currentDate: Date;
  selectedDate: Date;
  invalidDates: Date[];
  invalidMorningDates: number[];
  invalidAfternoonDates: number[];
  invalidTotalDates: number[];
  reservations: Reservation[];
  floorNumber!: number;
  peopleNumber!: number;
  reservationId!: number;
  dateValidationType!: DateValidationType;
  currentMonth: number;

  constructor(
    private reservationsService: ReservationsService,
    private toastService: ToastsService,
    private store: Store<AppState>
  ) {
    this.store
      .select('reservation')
      .subscribe(reservation => {
        this.floorNumber = reservation.floorNumber;
        this.peopleNumber = reservation.peopleNumber;
        this.reservationId = reservation.reservationId;
        this.dateValidationType = reservation.meanOfTransport;
      });

    this.onDayCapacity = new EventEmitter<boolean>();
    this.onDayParkingAvailabilityPerCar = new EventEmitter<boolean>();
    this.selectedDate = new Date();
    this.currentDate = new Date();
    this.currentMonth = 0;
    this.invalidDates = [];
    this.invalidMorningDates = [];
    this.invalidAfternoonDates = [];
    this.invalidTotalDates = [];
    this.reservations = [];
    this.dateValidationType = DateValidationType.DayCapacity;
  }

  ngOnInit(): void {
    this.consultReservations();
  }

  isInvalidAfternoonDate(day: number): boolean {
    return this.invalidAfternoonDates.includes(day);
  }

  isInvalidMorningDate(day: number): boolean {
    return this.invalidMorningDates.includes(day);
  }

  isInvalidTotalDate(day: number): boolean {
    return this.invalidTotalDates.includes(day);
  }

  onMonthChange({ month, year }: { month: number, year: number }): void {

    console.log(month, year);

  }

  monthChange(month: number, year: number): void {
    this.invalidTotalDates = [];
    this.invalidMorningDates = [];
    this.invalidAfternoonDates = [];
    this.invalidDates = [];
    this.tempDate.setMonth(month - 1);
    this.tempDate.setDate(1);
    this.tempDate.setFullYear(year);
    this.consultReservations();
  }

  consultReservations(): void {
    console.log('Id Puesto de Trabajo:', this.reservationId);
    console.log('Número de personas', this.peopleNumber);
    this.setDates(this.tempDate);
    let urlPlugin: string =
      this.peopleNumber > 1 ? this.roomUrlPlugin : this.workstationUrlPlugin;

    this.reservationsService
      .sendRequest(urlPlugin, this.queryDates)
      .subscribe((answ: ReservationsResponse) => {
        this.reservations = answ.data;
        this.updateCalendar();
      });
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
          this.invalidTotalDates.push(parseInt(jReservation.dia));
          checked.push(jReservation.dia);
          flag = true;
        }
      }
    }

    if (!flag) {
      parseInt(iRerservation.horaInicio) < 13
        ? parseInt(iRerservation.horaFin) < 13
          ? this.invalidMorningDates.push(parseInt(iRerservation.dia))
          : this.invalidTotalDatesDay(iRerservation, checked)
        : this.invalidAfternoonDates.push(parseInt(iRerservation.dia));
    }
    return checked;
  }

  private invalidTotalDatesDay(rev: Reservation, checked: string[]): void {
    this.invalidTotalDates.push(parseInt(rev.dia));
    checked.push(rev.dia);
  }

  private oninvalidMorningDates(reservation: Reservation): boolean {
    return true;
  }

  setDates(dateValue: Date) {

    const startDate = moment(dateValue).startOf('month').format('DD-MM-YYYY');
    const endDate = moment(dateValue).endOf('month').format('DD-MM-YYYY');

    if (this.peopleNumber > 1) {
      this.queryDates =
        this.peopleNumber > 1 ? `${this.reservationId}/${startDate}/${endDate}` : '';
    } else {
      this.queryDates =
        this.peopleNumber == 1 ? `${this.reservationId}/${startDate}/${endDate}` : '';
    }

  }

  setSelectedDate(selectedDate: Date): void {

    this.selectedDate = selectedDate;
    this.callMethodPerDateValidationType();
    console.log(selectedDate);
    this.store.dispatch(setSelectedDate({ selectedDateSummary: this.selectedDate }));
  }

  callMethodPerDateValidationType(): void {
    console.log(
      'Desde callMethodPerDateValidationType, validType = ',
      this.dateValidationType
    );

    this.getCapacity();

    switch (this.dateValidationType) {
      case DateValidationType.DayCapacity:

        break;
      case DateValidationType.ParkingAvailabilityPerBicycle:
        this.getParkingCycle();
        break;
      case DateValidationType.ParkingAvailabilityPerCar:
        console.log('Entrando case ParkingAvailabilityPerCar ');
        this.getCarParkingAvailability();
        break;
      case DateValidationType.ParkingAvailabilityPerBicycle:
        // this.getBici();
        break;
      case DateValidationType.ParkingAvailabilityPerMotorcycle:
        this.getParkingMotorcycle();
        break;
      default:
        break;
    }
  }

  getCapacity(): void {
    if (!this.floorNumber) {
      this.toastService.showToastWarning({
        summary: 'Seleccione un piso',
        detail: 'No se ha seleccionado ningún piso',
      });
      return;
    }
    const selectedDate = moment(this.selectedDate).format('DD-MM-yyyy');
    this.reservationsService
      .getCapacity(selectedDate, this.floorNumber)
      .subscribe((dataResponse: DataResponse) => {
        this.validateDayCapacity(dataResponse.data);
      });
  }

  getCarParkingAvailability(): void {
    const selectedDate = moment(this.selectedDate).format('DD-MM-yyyy');
    this.reservationsService
      .getCarParkingAvailability(selectedDate)
      .subscribe((dataResponse: DataResponse) => this.validateParkingAvailabilityPerCar(dataResponse.data));
  }
  validateParkingAvailabilityPerCar(data: number | any[]): void {
    if (data > 0) {
      this.onDayParkingAvailabilityPerCar.emit(true);
      const menssage = data != 1 ? "parqueaderos disponibles" : "parqueadero disponible";
      this.toastService.showToastSuccess({
        summary: `Parqueadero de carro disponible:`,
        detail: ` ${data} ${menssage}`,
      });

    } else {
      this.onDayParkingAvailabilityPerCar.emit(false);
      this.toastService.showToastDanger({
        summary: 'No hay parqueaderos para carro disponibles ',
        detail: '',
      });
    }
  }

  validateDayCapacity(data: number | any): void {
    if (data > 1) {
      this.onDayCapacity.emit(true);
      this.toastService.showToastInfo({ summary: 'Aforo Disponible:', detail: `El aforo disponible para esta fecha es de ${data} personas` })
    } else if (data === 1) {
      this.onDayCapacity.emit(true);
      this.toastService.showToastInfo({ summary: 'Aforo Disponible:', detail: `El aforo disponible para esta fecha es de ${data} persona` })

    } else {
      this.onDayCapacity.emit(false);
      this.toastService.showToastDanger({
        summary: 'No hay aforo disponible',
        detail: 'En el piso seleccionado no hay capacidad en esta fecha',
      });
    }
  }

  getParkingCycle(): void {
    const selectedDate = moment(this.selectedDate).format('DD-MM-yyyy');
    this.reservationsService
      .getParkingCycle(selectedDate)
      .subscribe(
        (availabilityCycle: DataResponse) => this.validateAvailabilityCycle(availabilityCycle.data)
      );
  }

  validateAvailabilityCycle(data: Number | any[]) {
    if (data) {
      this.onDayCapacity.emit(true);
      this.toastService.showToastSuccess({
        summary: `Hay ${data} parqueaderos de bicicleta disponibles`,
        detail: ''
      })
    } else {
      this.onDayCapacity.emit(false);
      this.toastService.showToastSuccess({
        summary: `No hay parqueaderos de bicileta disponibles`,
        detail: ''
      })
    }
  }


  getParkingMotorcycle(): void {
    const selectedDate = moment(this.selectedDate).format('DD-MM-yyyy');
    this.reservationsService
      .getParkingMotorcycle(selectedDate)
      .subscribe((dataResponse: DataResponse) => this.validateParkingAvailabilityMotorcycle(dataResponse.data));
  }

  validateParkingAvailabilityMotorcycle(data: number | any[]): void {
    if (data) {
      this.onDayCapacity.emit(true);
      const menssage = data != 1 ? "parqueaderos disponibles" : "parqueadero disponible";
      this.toastService.showToastSuccess({
        summary: `Parqueadero de moto disponible:`,
        detail: ` ${data} ${menssage}`,
      });
    } else {
      this.onDayCapacity.emit(false);
      this.toastService.showToastDanger({
        summary: 'No hay parqueaderos para Moto disponibles',
        detail: '',
      });
    }
  }
}
