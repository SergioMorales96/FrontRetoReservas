import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Workstation, WorkstationResponse, WorkstationsResponse, WorkstationClass } from '../interfaces/workstation.interfaces';
import { catchError } from 'rxjs/operators' 
import { ToastsService } from 'src/app/services/toasts.service';

@Injectable({
  providedIn: 'root'
})
export class WorkstationsService {
  private apiUrl: string = `${environment.baseUrl}/puestoTrabajo`;

  constructor(
    private http: HttpClient,
    private toastService: ToastsService
  ) { }

  getWorkstations(): Observable<WorkstationsResponse> {
    const url = `${this.apiUrl}/todas`;
    return this.http.get<WorkstationsResponse>(url)
      .pipe(
        catchError(err => of({ data: [] }))
      );
  }

  getWorkstation(id: number): Observable<WorkstationResponse> {
    const url = `${this.apiUrl}/buscarPorId/${id}`;
    return this.http.get<WorkstationResponse>(url)
      .pipe(
        catchError(err => of({ data: new WorkstationClass() }))
      );
  }

  createWorkstation(workstation: Workstation): Observable<WorkstationResponse> {
    const url = `${this.apiUrl}/crear`;
    return this.http.post<WorkstationResponse>(url, workstation)
      .pipe(
        catchError(err =>{
          this.toastService.showToastDanger({ summary: 'Error al crear', detail: err?.message ? err.message : err });
          return throwError(err);
        })           
      );
  }

  updateWorkstation(workstation: Workstation): Observable<WorkstationResponse> {
    const url = `${this.apiUrl}/actualizar`;
    return this.http.post<WorkstationResponse>(url, workstation)
    .pipe(
      catchError(err => {
        this.toastService.showToastDanger({ summary: 'Error al actualizar', detail: err?.message ? err.message : err });
        return throwError(err);
      })
    );
  }

  deleteWorkstation(id: number): Observable<WorkstationResponse> {
    const url = `${this.apiUrl}/borrar/${id}`;
    return this.http.get<WorkstationResponse>(url)
    .pipe(
      catchError(err => {
        this.toastService.showToastDanger({ summary: 'Error al eliminar', detail: err?.message ? err.message : err });
        return throwError(err);
      })
    );
  }
}
