import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataResponse } from '../interfaces/reservations.interface';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { ToastsService } from 'src/app/services/toasts.service';
import { Reservation, ReservationClass, ReservationResponse} from '../interfaces/reservations.interface';

@Injectable({
  providedIn: 'root'
})
/**
 * Service
 * Service to query the api-rest of the reserva table
 * @author Jorge Lucero / Asesoftware
 * @version 0.1, 2021/07/12
 */
export class ReservationsService {
  private apiUrl: string = `${environment.baseUrl}/reservas`;

  getCapacity(selectedDate: string, selectedFloor: number): Observable<DataResponse> {
    const url = `${this.apiUrl}/reservas_aforo_dia/${selectedDate}/${selectedFloor}`;
    return this.http.get<DataResponse>(url)
      .pipe(
        catchError(() => of({ data: 0 }))
      );
  } 
  httpOptions = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  constructor(private http: HttpClient, private toastService: ToastsService) { }
  /**
   * Add a schedule, using the endpoint crear
   */
  addReservation(reservation: Reservation): Observable<ReservationResponse> {
    const urlLink = `${this.apiUrl}/crearreserva`;
    console.log(reservation);
    return this.http.post<ReservationResponse>(urlLink, reservation)
    
      .pipe(
        catchError(err => {
          this.toastService.showToastDanger({ summary: 'Error al crear la reserva ', detail: err?.message ? err.message : err });
          return throwError(err);
        })
      );
      
  }
}
