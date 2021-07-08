import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Branch } from '../interfaces/admin.interfaces';

@Injectable({
  providedIn: 'root'
})
export class BranchesService {

  private apiUrl: string = `${environment.baseUrl}/api/v1/sucursales`;

  constructor(
    private http: HttpClient
  ) { }

  // getDomains(): Observable<Branch[]> {
  //   return this.http.get<Branch[]>( `${ this.apiUrl }/todos` );
  // }

  listAll(): Observable<any> {
    // const url = 'http://localhost:8089/api/v1/sucursales/all';
    const url = `${environment.baseUrl}/sucursales/all`;
    return this.http.get(url);
  }

  createBranch(body: any): Observable<any> {
    // const url = 'http://localhost:8089/api/v1/sucursales/crear';
    const url = `${environment.baseUrl}/sucursales/crear`;
    return this.http.post<any>(url, body);
  }

  updateBranch(body: any): Observable<any> {
    // const url = 'http://localhost:8089/api/v1/sucursales/editar';
    const url = `${environment.baseUrl}/sucursales/editar`;
    return this.http.post<any>(url, body);
  }

  deleteBranch(id: number): Observable<any> {
    // const url = `http://localhost:8089/api/v1/sucursales/delete/` +`${id}`;
    const url = `${environment.baseUrl}/sucursales/delete/` + `${id}`;
    return this.http.get(url);
  }


}
