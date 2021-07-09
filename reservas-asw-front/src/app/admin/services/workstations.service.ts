import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Workstation, WorkstationResponse, WorkstationsResponse, WorkstationClass } from '../interfaces/workstation.interfaces';
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class WorkstationsService {
  private apiUrl: string = `${ environment.baseUrl }/puestoTrabajo`;

  constructor(
    private http: HttpClient
  ) { }

  getWorkstations(): Observable<WorkstationsResponse> {
    const url = `${ this.apiUrl }/todas`;
    return this.http.get<WorkstationsResponse>(url)
      .pipe(
        catchError(err => of({ data: [] }))
      );
  }
  
  getWorkstation( id: number ): Observable<WorkstationResponse> {
    const url = `${ this.apiUrl }/buscarPorId/${ id }`;
    return this.http.get<WorkstationResponse>( url )
      .pipe(
        catchError(err => of({ data: new WorkstationClass() }))
      );
  }

  createWorkstation( workstation : Workstation): Observable<WorkstationResponse> {
    const url = `${ this.apiUrl }/crear`;
    return this.http.post<WorkstationResponse>( url, workstation )
      .pipe(
        catchError(err => of({ data: new WorkstationClass() }))
      );
}

  updateWorkstation( workstation : Workstation ): Observable<WorkstationResponse> {
    const url = `${ this.apiUrl }/actualizar`;
    return this.http.post<WorkstationResponse>( url, workstation )
    .pipe(
      catchError(err => of({ data: new WorkstationClass() }))
    );
}

  deleteWorkstation( id: number ): Observable<WorkstationResponse> {
   const url = `${ this.apiUrl }/borrar/${ id }`;
   return this.http.get<WorkstationResponse>( url )
    .pipe(
      catchError(err => of({ data: new WorkstationClass() }))
  );
}
}
