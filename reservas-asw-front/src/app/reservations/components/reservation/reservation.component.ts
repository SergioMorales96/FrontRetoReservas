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
    this.alertsService.showConfirmDialog({
      message: `Se ha realizado la reserva con éxito, recuerda que si no se cumplen las reservas, existirá una penalización para poder realizar futuras reservas.`,
      header: 'Creación de reserva ',
    }).then(resp => {
      // this.reservationService.addReservation(this.reservation)
      // .subscribe(
      //   (reservationResponse: ReservationResponse) => {
      //     //this.router.navigateByUrl(RouteName.BranchesList);
      //     this.toastService.showToastSuccess({ summary: 'Reserva creada', detail: `Creación exitosa`});
      //   });
    });
   
  }
}
