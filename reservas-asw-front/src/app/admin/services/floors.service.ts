import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { catchError } from 'rxjs/operators'
import { environment } from '../../../environments/environment';
import { FloorsResponse, FloorResponse, FloorClass, Floor } from '../interfaces/floors.interfaces';
import { ToastsService } from '../../services/toasts.service';
import { throwError } from 'rxjs';
import { BranchesResponse } from '../interfaces/branches.interfaces';


@Injectable({
  providedIn: 'root'
})

export class FloorsService {
  private apiUrl: string = `${environment.baseUrl}/piso`;
  private apiUrl2: string = `${environment.baseUrl}/sucursales`;
  constructor(
    private http: HttpClient,
    private toastService: ToastsService
  ) { }

  getFloors(): Observable<FloorsResponse> {
    const url = `${this.apiUrl}/todos`;
    return this.http.get<FloorsResponse>(url)
      .pipe(
        catchError(err => {
          this.toastService.showToastDanger({ summary: 'Error al mostrar informacion', detail: err?.message ? err.message : err });
          return of({ data: [] })
        })
      );
  }

  getFloor(id: number): Observable<FloorResponse> {
    const url = `${this.apiUrl}/consultar/${id}`;
    return this.http.get<FloorResponse>(url)
      .pipe(
        catchError(err => {
          this.toastService.showToastDanger({ summary: 'Error al mostrar informacion', detail: err?.message ? err.message : err });
          return of({ data: new FloorClass() })
        })
      );
  }

  createFloor(floor: Floor): Observable<FloorResponse> {
    const url = `${this.apiUrl}/crear`;
    return this.http.post<FloorResponse>(url, floor)
      .pipe(
        catchError(err =>  {
          this.toastService.showToastDanger({ summary: 'Error al crear', detail: err?.message ? err.message : err });
          return throwError(err);
        })
      );
  }
  updateFloor(floor: Floor): Observable<FloorResponse> {
    const url = `${this.apiUrl}/actualizar`;
    return this.http.post<FloorResponse>(url, floor)
      .pipe(
        catchError(err => {
          this.toastService.showToastDanger({ summary: 'Error al actualizar', detail: err?.message ? err.message : err });
          return throwError(err);
        })
      );
  }
  deleteFloor(id: number): Observable<FloorResponse> {
    const url = `${this.apiUrl}/eliminar/${id}`;
    return this.http.get<FloorResponse>(url)
      .pipe(
        catchError(err => {
           this.toastService.showToastDanger({ summary: 'Error al eliminar', detail: err?.message ? err.message : err });
          return throwError(err);
        })     
      );
  }
  getBranches(): Observable<BranchesResponse> {
    const url = `${this.apiUrl2}/all`;
    return this.http.get<BranchesResponse>(url)
      .pipe(
        catchError(err => of({ data: [] }))
      );
  }

}


