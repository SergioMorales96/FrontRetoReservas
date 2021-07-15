import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastsService } from 'src/app/services/toasts.service';
import { environment } from '../../../environments/environment';
import { DataResponse, Reservation, ReservationClass, ReservationResponse} from '../interfaces/reservations.interface';

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
  
  constructor(private http: HttpClient, private toastService: ToastsService) { }

  getCapacity(selectedDate: string, selectedFloor: number): Observable<DataResponse> {
    const url = `${this.apiUrl}/reservas_aforo_dia/${selectedDate}/${selectedFloor}`;
    return this.http.get<DataResponse>(url)
      .pipe(
        catchError(() => of({ data: 0 }))
      );
  } 

  getCarParkingAvailability(selectedDate: string): Observable<DataResponse> {
    const url = `${this.apiUrl}/disponibilidadParqueaderoCarro/${selectedDate}`;
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
