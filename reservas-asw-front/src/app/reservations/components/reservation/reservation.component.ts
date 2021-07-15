import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reservation,ReservationResponse } from '../../interfaces/reservations.interface';
import { RouteName } from '../../../../utils/enums';
import { ReservationsService} from '../../services/reservations.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { AlertsService } from '../../../services/alerts.service';
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
  providers:[MessageService, ConfirmationService]
})

export class ReservationComponent  {
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
    idPuestoTrabajo: 5,
    idRelacion: 1,
    tipoReserva: "SALA"
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
      this.reservationService.addReservation(this.reservation)
      .subscribe(
        (reservationResponse: ReservationResponse) => {
          //this.router.navigateByUrl(RouteName.BranchesList);
          this.toastService.showToastSuccess({ summary: 'Reserva creada', detail: `Creación exitosa`});
        });
    });
   
  }
}
