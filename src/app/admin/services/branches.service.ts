import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Branch } from '../interfaces/admin.interfaces';

@Injectable({
  providedIn: 'root'
})
export class BranchesService {

  private apiUrl: string = `${ environment.baseUrl }/api/v1/sucursales`;

  constructor(
    private http: HttpClient
  ) { }

  getDomains(): Observable<Branch[]> {
    return this.http.get<Branch[]>( `${ this.apiUrl }/todos` );
  }

  listarTodo(): Observable<any> {
    const url = 'http://localhost:8089/api/v1/sucursales/all';
    return this.http.get(url);
  }

  crearSucursal(body:any):Observable<any>
{  
  const url = 'http://localhost:8089/api/v1/sucursales/crear';
  return this.http.post<any>(url, body);
}


}
