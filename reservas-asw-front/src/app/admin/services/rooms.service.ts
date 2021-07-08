import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable , of } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Room, RoomResponse, RoomClass, RoomsResponse, FloorsResponse } from '../interfaces/admin.interfaces';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  private apiUrl: string = `${ environment.baseUrl }/sala`;
  private apiUrlP: string = `${ environment.baseUrl }/piso`;

  constructor(
    private http: HttpClient
  ) { }

  getRooms(): Observable<RoomsResponse>{
    const url = `${this.apiUrl}/todas`;
    return this.http.get<RoomsResponse>(url)
      .pipe(
        catchError(err => of({data: []}))
      );
  }

  getFloors(): Observable<FloorsResponse>{
    const url = `${this.apiUrlP}/todos`;
    return this.http.get<FloorsResponse>(url)
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
        catchError(err => of({data: new RoomClass()}))
      );
  }

  updateRoom(room: Room): Observable<RoomResponse>{
    const url = `${this.apiUrl}/actualizar`;
    return this.http.post<RoomResponse>(url, room)
      .pipe(
        catchError(err => of({data: new RoomClass()}))
      );
  }

  deleteRoom(id: Number): Observable<RoomResponse>{
    const url = `${this.apiUrl}/eliminar/${id}`;
    return this.http.get<RoomResponse>(url)
      .pipe(
        catchError(err => of({data: new RoomClass()}))
      );
  }

}
