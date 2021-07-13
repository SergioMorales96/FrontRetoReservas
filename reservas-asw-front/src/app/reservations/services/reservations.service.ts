import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RoomReservationsResponse } from '../interfaces/reservations.interface';


@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  serviceUrl: string = environment.baseUrl;


  sendRequest(urlPlugin: string = '', query: string = ''): Observable<RoomReservationsResponse>{    

    return this.http.get<RoomReservationsResponse>(`${this.serviceUrl}/${urlPlugin}/${query}`)
    .pipe(
      catchError(err => of({data: []}))
    );
  }



  constructor(private http : HttpClient){ }
}
