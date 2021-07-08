import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Floor } from '../interfaces/admin.interfaces';

@Injectable({
    providedIn: 'root'
  })

  export class FloorsService {
      private apiUrl: string = `${ environment.baseUrl }/piso`;
    
      constructor(
          private http: HttpClient
      ){}

      getFloors(): Observable<Floor[]>{
          return this.http.get<Floor[]>(`${ this.apiUrl}/todos`);
      }
    
      createFloor(floor: Floor): Observable<Floor[]>{
          let headers = new HttpHeaders();
          headers = headers.set('Content-Type', 'application/json');
          return this.http.post<Floor[]>(`${this.apiUrl}/crear`,JSON.stringify(floor),{headers: headers});
      }
  }