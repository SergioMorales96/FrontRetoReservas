import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AppState } from 'src/app/app.reducer';
import { AlertsService } from 'src/app/services/alerts.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { Reservation } from '../../interfaces/reservations.interface';
import { ReservationsService } from '../../services/reservations.service';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
  providers:[MessageService, ConfirmationService]
})

export class ReservationComponent implements OnInit{

  hasEditing!: boolean;
  resp: boolean= true
  reservation:Reservation={
    dia: "11-01-0020",
    horaInicio:"8:00",
    horaFin:"10:00",
    totalHoras: 8,
    dominioTipoVehiculo: "M",
    placa: "ATA004",
    emailUsuario: "correo@correo.com",
    proyecto:"SEMILLA_2021_2",
    idRelacion: 1,
    tipoReserva: "PUESTO",
    emailsAsistentes: "prueba@gmail.com, con@con.con, testeoeo@asw.xx"
  }

  constructor(
    private reservationService: ReservationsService,
    private toastService: ToastsService,
    private alertsService: AlertsService,
    private store :Store<AppState>
  ){ }

  ngOnInit(): void {
    this.store
      .select('reservation')
      .subscribe( reservation  =>{
        this.hasEditing = reservation.sidebar.isEditReservation;
      });
  }

  addReservation(){
      this.reservationService.addReservation(this.reservation)
      .subscribe(
        (reservationResponse) => {
          if(reservationResponse.status === `OK`){
          this.alertsService.showConfirmDialog({
            message: `Se ha realizado la reserva con éxito, recuerda que si no se cumplen las reservas, existirá una penalización para poder realizar futuras reservas.`,
            header: 'Creación de reserva ',
          }).then(resp =>{
            if(resp)
            this.toastService.showToastSuccess({ summary: 'Reserva creada', detail: `Se creó la reserva exitosamente`});
            else{
              return;
            }
          }).catch(console.log);
          
        }
          else if(reservationResponse.status === `INTERNAL_SERVER_ERROR`){
          this.alertsService.showConfirmDialog({
            message: `Ups... No fue posible crear la reserva :(`,
            header: 'Error en la creación de la reserva ',
          }).then(resp =>{
            if(resp)
            this.toastService.showToastDanger({ summary: 'Reserva NO creada', detail: `No se pudo crear la reserva`});
            else{
              return;
            }
          })          
          }
        });        
  }
}
