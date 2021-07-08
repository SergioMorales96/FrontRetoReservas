import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable , of } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Room, RoomResponse, RoomClass, Floor } from '../interfaces/admin.interfaces';
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

  getDomains(): Observable<Room[]> {
    return this.http.get<Room[]>( `${ this.apiUrl }/todos` );
  }

  getRoom(id: Number): Observable<RoomResponse>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<RoomResponse>(url)
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
