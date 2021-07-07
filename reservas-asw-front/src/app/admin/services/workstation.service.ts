import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Workstation } from '../interfaces/admin.interfaces';

@Injectable({
  providedIn: 'root'
})
export class WorkstationService {
  private apiUrl: string = `${ environment.baseUrl }/puestoTrabajo`;

  constructor(
    private http: HttpClient
  ) { }

  getDomains(): Observable<Workstation[]> {
    return this.http.get<Workstation[]>( `${ this.apiUrl }/todas` );
  }

}
