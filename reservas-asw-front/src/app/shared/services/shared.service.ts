import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { DataResponse } from 'src/app/reservations/interfaces/reservations.interface';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private apiUrl: string = `${ environment.baseUrl }/reservas/disponibilidadParqueaderoBicis`;

  constructor(
    private http: HttpClient
  ) { }

  getDPBicicletas(fecha: String): Observable<DataResponse>{
    const url: string = `${this.apiUrl}/${fecha}`
    return this.http.get<DataResponse>(url);
  }

}
