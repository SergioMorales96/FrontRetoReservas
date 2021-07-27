import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ToastsService } from '../../services/toasts.service';
import { catchError } from 'rxjs/operators';
import { ReservationResponse, DatesReservation, UsersBlockResponse } from '../interfaces/reservation';

@Injectable({
    providedIn: 'root'
})

export class ReservationsService {
    private apiUrl: string = `${environment.baseUrl}/reservas`;
    private apiUrl2: string = `${environment.baseUrl}`;


    constructor(
        private http: HttpClient,
        private toastService: ToastsService
    ) { }

    getReservations(fechaInicio: string, fechaFin: string, correo: string): Observable<ReservationResponse> {
        const url = `${this.apiUrl}/reservas_usuario/${fechaInicio}/${fechaFin}/${correo}`;
        return this.http.get<ReservationResponse>(url)
            .pipe(
                catchError(err => of({ data: [] }))
            );
    }

    cancelReservation(idReserva: number): Observable<ReservationResponse> {
        const url = `${this.apiUrl}/cancelarreserva/${idReserva}`;
        return this.http.get<ReservationResponse>(url)

            .pipe(
                catchError(err => {
                    this.toastService.showToastDanger({ summary: 'Error al cancelar la reserva', detail: err?.message ? err.message : err });
                    return throwError(err);
                })
            );
    }


    getLockedUsers(): Observable<UsersBlockResponse> {
        const url = `${this.apiUrl2}/usuarioBloqueado/todos`;
        return this.http.get<UsersBlockResponse>(url);
    }
}