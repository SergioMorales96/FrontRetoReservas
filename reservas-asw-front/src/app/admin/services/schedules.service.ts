import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastsService } from 'src/app/services/toasts.service';
import { environment } from '../../../environments/environment';
import { Schedule, ScheduleClass, ScheduleResponse, SchedulesResponse } from '../interfaces/schedule.interfaces';

@Injectable({
  providedIn: 'root'
})
/**
 * Service
 * Service to query the api-rest of the horario_puesto_trabajo table
 * @author Juan Rondon / Asesoftware
 * @version 0.1, 2021/07/08
 */
export class SchedulesService {
  private apiUrl: string = `${environment.baseUrl}/HorarioPuestoTrabajo`;

  httpOptions = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  constructor(private http: HttpClient, private toastService: ToastsService) { }

  /**
   * Check all the schedules, using the endpoint todos
   */
  getSchedules(): Observable<SchedulesResponse> {
    const urlLink = `${this.apiUrl}/todos`;
    return this.http.get<SchedulesResponse>(urlLink)
      .pipe(
        catchError(err => of({ data: [] }))
      );;
  }

  /**
   * Query a schedule, using the endpoint /horario/id
   */
  getSchedule(id: number): Observable<ScheduleResponse> {
    const urlLink = `${this.apiUrl}/horario/${id}`;
    return this.http.get<ScheduleResponse>(urlLink)
      .pipe(
        catchError(err => of({ data: new ScheduleClass() }))
      );
  }

  /**
   * Delete a schedule, using the endpoint eliminar
   */
  deleteSchedule(id: number): Observable<ScheduleResponse> {
    const urlLink = `${this.apiUrl}/eliminar/${id}`;
    return this.http.get<ScheduleResponse>(urlLink)
    .pipe(
      catchError(err => {
        this.toastService.showToastDanger({ summary: 'Error al eliminar', detail: err?.message ? err.message : err });
        return throwError(err);
      })
    );
  }

  /**
   * Add a schedule, using the endpoint crear
   */
  addSchedule(schedule: Schedule): Observable<ScheduleResponse> {
    const urlLink = `${this.apiUrl}/crear`;
    return this.http.post<ScheduleResponse>(urlLink, schedule)
      .pipe(
        catchError(err => {
          this.toastService.showToastDanger({ summary: 'Error al crear', detail: err?.message ? err.message : err });
          return throwError(err);
        })
      );
  }

  /**
   * Modify a schedule, using the endpoint editar
   */
  updateSchedule(schedule: Schedule): Observable<ScheduleResponse> {
    const urlLink = `${this.apiUrl}/editar`;
    return this.http.post<ScheduleResponse>(urlLink, schedule)
    .pipe(
      catchError(err => {
        this.toastService.showToastDanger({ summary: 'Error al actualizar', detail: err?.message ? err.message : err });
        return throwError(err);
      })
    );
  }
}
