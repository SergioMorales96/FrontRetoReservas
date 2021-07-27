import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ReservationsResponse } from '../interfaces/reservations.interface';
import { RoomsPerFloorResponse } from '../interfaces/rooms-per-floor.interface';
import { workSpacesPerFloorResponse } from '../interfaces/workspaces-per-floor.interface';
import { FloorsResponse } from '../interfaces/floors.interface';


@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  serviceUrl: string = environment.baseUrl;

  sendRequest(urlPlugin: string = '', query: string = ''): Observable<ReservationsResponse>{    

    return this.http.get<ReservationsResponse>(`${this.serviceUrl}/${urlPlugin}/${query}`)
    .pipe(
      catchError(err => of({data: []}))
    );
  }

  sendRoomsPerFloorRequest(urlPlugin: string = '', query: string = ''): Observable<RoomsPerFloorResponse>{
    return this.http.get<RoomsPerFloorResponse>(`${this.serviceUrl}/${urlPlugin}/${query}`)
    .pipe(
      catchError(err => of({data: []}))
    );
  }

  sendWorkSpacesPerFloorRequest(urlPlugin: string = '', query: string = ''): Observable<workSpacesPerFloorResponse>{
    return this.http.get<workSpacesPerFloorResponse>(`${this.serviceUrl}/${urlPlugin}/${query}`)
      .pipe(
        catchError(err => of({ data: [] }))
      );
  }


  sendFloorRequest(urlPlugin: string = '', query: string = ''): Observable<FloorsResponse>{
    return this.http.get<FloorsResponse>(`${this.serviceUrl}/${urlPlugin}/${query}`)
      .pipe(
        catchError(err => of({ data: [] }))
      );
  }

  constructor(private http : HttpClient){ }
}
