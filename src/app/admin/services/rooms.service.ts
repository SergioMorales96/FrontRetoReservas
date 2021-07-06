import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Room } from '../interfaces/admin.interfaces';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  private apiUrl: string = `${ environment.apiUrl }/api/v1/piso`;

  constructor(
    private http: HttpClient
  ) { }

  getDomains(): Observable<Room[]> {
    return this.http.get<Room[]>( `${ this.apiUrl }/todos` );
  }
}
