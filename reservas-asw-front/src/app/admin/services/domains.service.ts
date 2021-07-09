import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { environment } from '../../../environments/environment';
import { DomainsResponse, DomainResponse, DomainClass, Domain } from '../interfaces/admin.interfaces';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DomainsService {
  private apiUrl: string = `${ environment.baseUrl}/dominio`;

  constructor(
    private http: HttpClient
  ) { }

  getDomains(): Observable<DomainsResponse> {
    const url = `${ this.apiUrl}/all`;
    return this.http.get<DomainsResponse>(url)
      .pipe(
        catchError(err => of({ data: []}))
      );
  }

  getDomain(codigoDominio:String): Observable<DomainResponse> {
    const url = `${ this.apiUrl}/dominio/${codigoDominio}`;
    return this.http.get<DomainResponse>(url)
    .pipe(
      catchError(err => of({ data: new DomainClass}))
    );
  }

  createDomain(domain:Domain): Observable<DomainResponse> {
    const url = `${ this.apiUrl}/create`;
    return this.http.post<DomainResponse>(url,domain)
    .pipe(
      catchError(err => of({ data: new DomainClass}))
    );
  }

  updateDomain(domain:Domain): Observable<DomainResponse> {
    const url = `${ this.apiUrl}/update`;
    return this.http.post<DomainResponse>(url,domain)
    .pipe(
      catchError(err => of({ data: new DomainClass}))
    );
  }

  deleteDomain(domain:Domain): Observable<DomainResponse> {
    const url = `${ this.apiUrl}/delete`;
    return this.http.post<DomainResponse>(url,{
        codigoDominio: domain.codigoDominio,
        valorDominio: domain.valorDominio,
        descripcion: domain.descripcion
    })
    .pipe(
      catchError(err => of({ data: new DomainClass}))
    );
  }
}