import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataResponse } from '../interfaces/reservations.interface';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  private apiUrl: string = `${environment.baseUrl}/reservas`;

  constructor(
    private http: HttpClient 
  ) { }

  getCapacity(selectedDate: string, selectedFloor: number): Observable<DataResponse> {
    const url = `${this.apiUrl}/reservas_aforo_dia/${selectedDate}/${selectedFloor}`;
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
}