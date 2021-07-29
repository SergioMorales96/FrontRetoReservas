import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ReservationsService } from 'src/app/admin/services/reservation.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { ReservationAction } from '../../../../utils/enums';
import { DatesReservation, ReservationResponse } from '../../../admin/interfaces/reservation';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
  providers:[MessageService, ConfirmationService]
})
export class ReservationComponent {

  hasEditing: boolean = false;
  currentReservation!: DatesReservation;

  showComponent( reservationAction: ReservationAction ): void {
    this.hasEditing = reservationAction === ReservationAction.Edit;
  }

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private reservationService: ReservationsService,
    private router: Router,
    private toastService: ToastsService,
    private alertsService: AlertsService
  ){}

  addReservation(){
      // this.reservationService.addReservation(this.reservation)
      // .subscribe(
      //   (reservationResponse: ReservationResponse) => {
      //     if(reservationResponse.status === `OK`){
      //     this.alertsService.showConfirmDialog({
      //       message: `Se ha realizado la reserva con éxito, recuerda que si no se cumplen las reservas, existirá una penalización para poder realizar futuras reservas.`,
      //       header: 'Creación de reserva ',
      //     }).then(resp =>{
      //       if(resp)
      //       this.toastService.showToastSuccess({ summary: 'Reserva creada', detail: `Se creó la reserva exitosamente`});
      //       else{
      //         return;
      //       }
      //     }).catch(console.log);
          
      //   }
      //     else if(reservationResponse.status === `INTERNAL_SERVER_ERROR`){
      //     this.alertsService.showConfirmDialog({
      //       message: `Ups... No fue posible crear la reserva :(`,
      //       header: 'Error en la creación de la reserva ',
      //     }).then(resp =>{
      //       if(resp)
      //       this.toastService.showToastDanger({ summary: 'Reserva NO creada', detail: `No se pudo crear la reserva`});
      //       else{
      //         return;
      //       }
      //     })
          
      //     }
      //   });
        
  }
}
