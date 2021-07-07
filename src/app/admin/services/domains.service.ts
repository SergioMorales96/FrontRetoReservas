import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Domain } from '../interfaces/admin.interfaces';

@Injectable({
  providedIn: 'root'
})
export class DomainsService {
  private apiUrl: string = `${ environment.baseUrl }...`;

  constructor(
    private http: HttpClient
  ) { }

  getDomains(): Observable<Domain[]> {
    return this.http.get<Domain[]>( `${ this.apiUrl }` );
  }
}
