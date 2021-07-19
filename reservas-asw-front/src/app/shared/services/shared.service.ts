import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';


import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { DataResponse } from 'src/app/reservations/interfaces/reservations.interface';
import { DateValidationType } from 'src/utils/enums';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private apiUrl: string = `${ environment.baseUrl }/reservas/disponibilidadParqueaderoBicis`;
  public numPiso$: EventEmitter<number> =  new EventEmitter<number>();
  public numPersonas$: EventEmitter<number> =  new EventEmitter<number>();
  public tipoValidacion$: EventEmitter<DateValidationType> = new EventEmitter<DateValidationType>();


  constructor(
    private http: HttpClient
  ) { }

  getDPBicicletas(fecha: String): Observable<DataResponse>{
    const url: string = `${this.apiUrl}/${fecha}`
    return this.http.get<DataResponse>(url);
  }

}
