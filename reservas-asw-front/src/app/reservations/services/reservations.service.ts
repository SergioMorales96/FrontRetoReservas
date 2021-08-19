import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { ToastsService } from 'src/app/services/toasts.service';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { DataResponse, Reservation, ReservationResponse, ReservationsResponse, AforoResponse } from '../interfaces/reservations.interface';
import { RoomsPerFloorResponse } from '../interfaces/rooms-per-floor.interface';
import { workSpacesPerFloorResponse } from '../interfaces/workspaces-per-floor.interface';
import { FloorsResponse } from 'src/app/admin/interfaces/floors.interfaces';


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

  serviceUrl: string = environment.baseUrl;

  sendRequest(urlPlugin: string = '', query: string = ''): Observable<ReservationsResponse> {

    return this.http.get<ReservationsResponse>(`${this.serviceUrl}/${urlPlugin}/${query}`)
      .pipe(
        catchError(err => of({ data: [] }))
      );
  }

  constructor(
    private http: HttpClient,
    private toastService: ToastsService
  ) { }

  getCapacity(selectedDate: string, selectedFloor: number): Observable<DataResponse> {
    const url = `${this.apiUrl}/reservas_aforo_dia/${selectedDate}/${selectedFloor}`;
    return this.http.get<DataResponse>(url)
      .pipe(
        catchError(() => of({ data: 0 }))
      );
  }

  getParkingCycle(selectDate: string): Observable<DataResponse> {
    const url: string = `${this.apiUrl}/disponibilidadParqueaderoBicis/${selectDate}`;
    return this.http.get<DataResponse>(url)
      .pipe(
        catchError(() => of({ data: 0 }))
      );
  }

  getParkingMotorcycle(selectDate: string): Observable<DataResponse> {
    const url = `${this.apiUrl}/disponibilidadParqueaderoMoto/${selectDate}`;
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

  sendRoomsPerFloorRequest(urlPlugin: string = '', query: string = ''): Observable<RoomsPerFloorResponse> {
    return this.http.get<RoomsPerFloorResponse>(`${this.serviceUrl}/${urlPlugin}/${query}`)
      .pipe(
        catchError(err => of({ data: [] }))
      );
  }

  sendWorkSpacesPerFloorRequest(urlPlugin: string = '', query: string = ''): Observable<workSpacesPerFloorResponse> {
    return this.http.get<workSpacesPerFloorResponse>(`${this.serviceUrl}/${urlPlugin}/${query}`)
      .pipe(
        catchError(err => of({ data: [] }))
      );
  }

  sendFloorRequest(urlPlugin: string = '', query: string = ''): Observable<FloorsResponse> {
    return this.http.get<FloorsResponse>(`${this.serviceUrl}/${urlPlugin}/${query}`)
      .pipe(
        catchError(err => of({ data: [] }))
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
  aforoPuestos(dateReservation: string = '',hourReservationStart: string = '',hourReservationEnd: string = '', floor: number = 0): Observable<AforoResponse> {
    const urlLink = `${this.apiUrl}/aforoPuestos`;
    return this.http.get<AforoResponse>(`${urlLink}/${dateReservation}/${hourReservationStart}/${hourReservationEnd}/${floor}`)
      .pipe(
        catchError(err => of({ data: 0 }))

      );

  }
  aforoSalas(dateReservation: string = '',hourReservationStart: string = '',hourReservationEnd: string = '', floor: number = 0): Observable<AforoResponse> {
    const urlLink = `${this.apiUrl}/aforoSalas`;
    return this.http.get<AforoResponse>(`${urlLink}/${dateReservation}/${hourReservationStart}/${hourReservationEnd}/${floor}`)
      .pipe(
        catchError(err => of({ data: 0 }))

      );

  }
}
