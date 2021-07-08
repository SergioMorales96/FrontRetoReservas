import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Floor, FloorClass, FloorResponse } from '../interfaces/admin.interfaces';
import { catchError } from 'rxjs/operators'
import { FloorsResponse } from 'src/app/admin/interfaces/admin.interfaces';

@Injectable({
    providedIn: 'root'
  })

  export class FloorsService {
      private apiUrl: string = `${ environment.baseUrl }/piso`;
    
      constructor(
          private http: HttpClient
      ){}

      getFloors(): Observable<FloorsResponse>{
        const url = `${ this.apiUrl}/todos`;
        return this.http.get<FloorsResponse>(url)
          .pipe(
          catchError(err => of ({data: [] }))
          );    
      }
      
      getFloor(id: number): Observable<FloorResponse>{
        const url = `${ this.apiUrl}/${id}`;
        return this.http.get<FloorResponse>(url)
        .pipe(
          catchError(err => of ({data: new FloorClass() }))
          );   
      }

      createFloor(floor: Floor): Observable<FloorResponse>{
        const url = `${ this.apiUrl}/crear`;
        return this.http.post<FloorResponse>(url,floor)
        .pipe(
          catchError(err => of ({data: new FloorClass}))
          ); 
    }
      updateFloor(floor: Floor): Observable<FloorResponse>{
        const url = `${ this.apiUrl}/actualizar`;
        return this.http.post<FloorResponse>(url,floor)
        .pipe(
          catchError(err => of ({data: new FloorClass}))
          ); 
    }
      deleteFloor(id: number): Observable<FloorResponse>{
        const url = `${ this.apiUrl}/eliminar/${id}`;
        return this.http.post<FloorResponse>(url,id)
        .pipe(
          catchError(err => of ({data: new FloorClass}))
          ); 
    }
  }
