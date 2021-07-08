import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Schedule } from '../interfaces/admin.interfaces';

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
    headers:{
      'Content-Type':'application/json'
    }
  };

  constructor(private http: HttpClient) { }

  /**
   * Check all the schedules, using the endpoint todos
   */
  getSchedules(): Observable<Schedule[]>{
    return this.http.get<Schedule[]>( `${this.apiUrl}/todos` );
  }

  /**
   * Query a schedule, using the endpoint /horario/id
   */
  getSchedule(id: number): Observable<Schedule>{
    return this.http.get<Schedule>( `${this.apiUrl}/horario/${id}`);
  }

  /**
   * Delete a schedule, using the endpoint eliminar
   */
  deleteSchedule(schedule: Schedule): Observable<Schedule>{
    return this.http.get<Schedule>( `${this.apiUrl}/eliminar/${schedule.idHorario}`);
  }

  /**
   * Add a schedule, using the endpoint crear
   */
  addSchedule(schedule: Schedule): Observable<Schedule>{
    return this.http.post<Schedule>( `${this.apiUrl}/crear`, schedule, this.httpOptions);
  }

  /**
   * Modify a schedule, using the endpoint editar
   */
  updateSchedule(schedule: Schedule): Observable<Schedule>{
    return this.http.post<Schedule>( `${this.apiUrl}/editar/${schedule.idHorario}`, schedule, this.httpOptions);
  }
}
