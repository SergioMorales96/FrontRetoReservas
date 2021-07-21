import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ToastsService } from '../../services/toasts.service';
import { catchError } from 'rxjs/operators';
import { ReservationResponse } from '../interfaces/reservation';

@Injectable({
    providedIn: 'root'
})

export class ReservationsService {
    private apiUrl: string = `${environment.baseUrl}/reservas`;


    constructor(
        private http: HttpClient,
        private toastService: ToastsService
    ) { }

    getReservations(fechaInicio:string,fechaFin:string, correo:string): Observable<ReservationResponse>{
        const url = `${this.apiUrl}/reservas_usuario/${fechaInicio}/${fechaFin}/${correo}`
        return this.http.get<ReservationResponse>(url)
            .pipe(
                catchError(err => of ({data:[]}))
            );
    }
}