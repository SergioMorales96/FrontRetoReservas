import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable , of } from 'rxjs';

import { environment } from '../../../environments/environment';
import { FloorResponse } from '../interfaces/interface.schedule';
import { Room, RoomResponse, RoomClass, RoomsResponse } from '../interfaces/rooms.interfaces';
import { catchError } from 'rxjs/operators';
import { ToastsService } from '../../services/toasts.service';

import { throwError } from 'rxjs';
import { DomainsResponse } from '../interfaces/domains.interfaces';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  private apiUrl: string = `${ environment.baseUrl }/sala`;
  private apiUrlP: string = `${ environment.baseUrl }/piso`;
  private apiUrlD: string = `${ environment.baseUrl }/dominio`;
  
  constructor(
    private http: HttpClient,
    private toastService: ToastsService
  ) { }

  getRooms(): Observable<RoomsResponse>{
    const url = `${this.apiUrl}/todas`;
    return this.http.get<RoomsResponse>(url)
      .pipe(
        catchError(err => of({data: []}))
      );
  }

  getDomains(estado: String): Observable<DomainsResponse>{
    const url = `${this.apiUrlD}/dominio/${estado}`;
    return this.http.get<DomainsResponse>(url)
      .pipe(
        catchError(err => of({data: []}))
      );
  }

  getFloors(): Observable<FloorResponse>{
    const url = `${this.apiUrlP}/todos`;
    return this.http.get<FloorResponse>(url)
      .pipe(
        catchError(err => of({data: []}))
      );
  }

  getRoom(id: Number): Observable<RoomResponse>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<RoomResponse>(url)
      .pipe(
        catchError(err => of({data: new RoomClass()}))
      ); 
  }

  createRoom(room: Room): Observable<RoomResponse>{
    const url = `${this.apiUrl}/crear`;
    return this.http.post<RoomResponse>(url, room)
      .pipe(
        catchError(err => {
          this.toastService.showToastDanger({ summary: 'Error al crear', detail: err?.message ? err.message : err });
          return throwError(err);
        })
      );
  }

  updateRoom(room: Room): Observable<RoomResponse>{
    const url = `${this.apiUrl}/actualizar`;
    return this.http.post<RoomResponse>(url, room)
      .pipe(
        catchError(err => {
          this.toastService.showToastDanger({ summary: 'Error al actualizar', detail: err?.message ? err.message : err });
          return throwError(err);
        })
      );
  }

  deleteRoom(id: Number): Observable<RoomResponse>{
    const url = `${this.apiUrl}/eliminar/${id}`;
    return this.http.get<RoomResponse>(url)
      .pipe(
        catchError(err => {
          this.toastService.showToastDanger({ summary: 'Error al eliminar', detail: err?.message ? err.message : err });
          return throwError(err);
        })
      );
  }

}
