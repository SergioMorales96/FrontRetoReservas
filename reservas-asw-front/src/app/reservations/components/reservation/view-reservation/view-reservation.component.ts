import { AppState } from 'src/app/app.reducer';
import { Component,  OnInit } from '@angular/core';
import { DatesReservation, ReservationResponse, DataUsersBlock } from '../../../../admin/interfaces/reservation';
import { ReservationsService } from '../../../../admin/services/reservation.service';
import { RouteName } from '../../../../../utils/enums';
import { setReservation, setReservationList, setEditReservation, setDates, setBlocked } from '../../../reservation.actions';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import * as moment from 'moment';
import { ToastsService } from '../../../../services/toasts.service';

@Component({
  selector: 'app-view-reservation',
  templateUrl: './view-reservation.component.html',
  styleUrls: ['./view-reservation.component.scss']
})
export class ViewReservationComponent implements OnInit {
  
  counterDays: number;
  currentPosition: number;     
  dataUser: DataUsersBlock | undefined;
  dataUsersBlock: DataUsersBlock[];
  datesRList!: DatesReservation[];
  datesReservation: DatesReservation[] ; 
  date: Date | string;
  prueba!: boolean;
  remainingDays: number;
  routeName = RouteName;
  usersMap = {
    '=0': 'No hay personas',
    '=1': '1 persona',
    'other': '# personas',
  }; 

  
  get brandOrPlate(): string {
    const typeDomainVehicle = this.currentReservation?.dominioTipoVehiculo

    if (typeDomainVehicle === 'M' || typeDomainVehicle === 'C') {
      return 'Placa'
    }
    else if (typeDomainVehicle === 'B') {
      return 'N/A'
    }
    else {
      return 'No se registró vehiculo'
    }
  }


  get canShowNext(): boolean { 
    return this.datesReservation.length - 1 > this.currentPosition;
  }

  get canShowPreview(): boolean {
    return this.currentPosition - 1 >= 0;
  }

  get currentReservation(): DatesReservation {
  
    return this.datesReservation[this.currentPosition];
  }

  get reservationDate(): string {
    const date = this.currentReservation?.dia?.split('-');
    return `${date[0]}/${date[1]}/${date[2]}`;
  }
  get salaOrJob(): string {
    return this.currentReservation.idSala
      ? this.currentReservation.nombreSala
      : this.currentReservation.nombrePuesTrabajo;
  }

  get showReservations(): boolean {
    const blocked = !this.dataUser;
    return blocked;
  }

  get transportMedia(): string {
    const vehicleType = this.currentReservation.dominioTipoVehiculo;

    switch (vehicleType) {
      case 'B':
        return 'assets/images/icons/bicycle.svg';
      case 'M':
        return 'assets/images/icons/motorcycle.svg';
      case 'C':
        return 'assets/images/icons/car.svg';
      default:
        return ' ';
    }
  }

  get typeVehicle(): string {
    const vehicleType = this.currentReservation.dominioTipoVehiculo;
    switch (vehicleType) {
      case 'B':
        return 'Bicicleta';
      case 'M':
        return 'Moto'
      case 'C':
        return 'Carro'
      default:
        return 'N/A'
    }
  }

  get workStationMedia(): string {
    const asistentsNumber = this.currentReservation.numeroAsistentes;
    if (asistentsNumber > 1) {
      return 'workbench.svg'
    }
    else {
      return 'workstation.svg'
    }
  }

  constructor(
    private reservationsService: ReservationsService,
    private store :Store<AppState>,
    private toastService: ToastsService
  ) {   
    this.dataUsersBlock = [];
    this.datesReservation = [];
    this.date= new Date();
    this.currentPosition = 0;
    this.counterDays = 0;
    this.remainingDays = 0;
    
    
  }

  ngOnInit(): void {
    this.store
    .select('reservation')
    .subscribe( reservation =>{
      this.datesReservation = reservation.reservationList;      
      if (reservation.selectedDateSummary) {
        this.date = moment(reservation.selectedDateSummary).format('DD-MM-YYYY');
        const selectDate = this.datesReservation.findIndex(dia => dia.dia === this.date );
        if( selectDate >= 0 ){
          this.currentPosition =  selectDate;
        }else if(selectDate === -1){
          this.toastService.showToastInfo({summary:'No tienes reservas para este dia', detail:''})

        }
      }
      
      if(this.datesReservation.length === 0 ){
        this.getReservations(this.getData());
      }
    })    
    this.getLockedUsers();
    this.store.dispatch(setDates({dates: this.datesReservation}))
    
    
  }

  getCounterDays( dateLocked: string ): number {
    const startDate = moment( ).format('MM-DD-YYYY');
    const endDate = moment(dateLocked, 'DD-MM-YYYY');
    return endDate.diff( startDate, 'days' );
  }
  
  getData() {
    return {
      startDate: moment().add(-1,'day').format('DD-MM-YYYY'),
      endDate: moment().endOf('month').format('DD-MM-YYYY'),
      email: 'correoJuan@correo.com'
    }
  }
  
  getLockedUsers() {
    this.reservationsService.getLockedUsers()
      .subscribe(response => {
        this.dataUsersBlock = this.transformLockedUsers( response.data );
        this.dataUser = this.dataUsersBlock.find( user => user.email === this.getData().email && user.remainingDays > 0);
        this.store.dispatch(setBlocked({blocked : !!this.dataUser}))
      });

  }
  
  getReservations({ startDate, endDate, email }: { startDate: string, endDate: string, email: string }): void {
    this.reservationsService.getReservations(startDate, endDate, email)
      .pipe(
        tap(console.log)
      )
      .subscribe(
        (ReservationResponse: ReservationResponse) => {

          this.datesReservation = ReservationResponse.data;
          this.datesReservation = this.datesReservation.filter(reservation => reservation.dominioEstado.toUpperCase() === 'R')
          const hola = this.datesReservation.sort(function(a,b){
            if (moment(a.dia,'DD-MM-YYYY').isAfter(moment(b.dia,'DD-MM-YYYY')) ) {
              return 1;
            }
            if (moment(a.dia,'DD-MM-YYYY').isBefore(moment(b.dia,'DD-MM-YYYY'))) {
              return -1;
            }
      
            return 0;
          });
          this.store.dispatch(setReservationList({reservationList: this.datesReservation}));
        }
      )
  }
  
  showEditReservation(): void {    
    this.store.dispatch(setReservation({reservation: this.currentReservation}));   
    this.store.dispatch(setEditReservation({isEditReservation: true}));
  }

  showReservation(value: number): void {
    this.currentPosition = this.currentPosition + value;    
  }

  transformLockedUsers( users: DataUsersBlock[] ): DataUsersBlock[] {
    return users.map(d => ({ 
      ...d, 
      remainingDays: this.getCounterDays(d.bloqueadoHasta )
    }));
  }   
}
