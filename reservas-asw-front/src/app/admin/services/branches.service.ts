import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Branch, BranchClass, BranchesResponse, BranchResponse } from '../interfaces/branches.interfaces';
import { catchError } from 'rxjs/operators';
import { ToastsService } from '../../services/toasts.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BranchesService {

  private apiUrl: string = `${environment.baseUrl}/sucursales`;

  constructor(
    private http: HttpClient,
    private toastService: ToastsService
  ) { }

  getBranches(): Observable<BranchesResponse> {
    const url = `${this.apiUrl}/all`;
    return this.http.get<BranchesResponse>(url)
      .pipe(
        catchError(err => of({ data: [] }))
      );
  }

  getBranch(id: number): Observable<BranchResponse> {
    const url = `${this.apiUrl}/sucursales/${id}`;
    return this.http.get<BranchResponse>(url)
      .pipe(
        catchError(err => of({ data: new BranchClass() }))
      );
  }

  createBranch(branch: Branch): Observable<BranchResponse> {
    const url = `${this.apiUrl}/crear`;
    return this.http.post<BranchResponse>(url, branch)
      .pipe(
        catchError(err => {
          this.toastService.showToastDanger({ summary: 'Error al crear', detail: err?.message ? err.message : err });
          return throwError(err);
        })
      );
  }

updateBranch(branch: Branch): Observable < BranchResponse > {
  const url = `${this.apiUrl}/editar`;
  return this.http.post<BranchResponse>(url, branch)
    .pipe(
      catchError(err => {
        this.toastService.showToastDanger({ summary: 'Error al actualizar', detail: err?.message ? err.message : err });
        return throwError(err);
      })
    );
}

deleteBranch(id: number): Observable < BranchResponse > {
  const url = `${this.apiUrl}/delete/${id}`;
  return this.http.get<BranchResponse>(url)
    .pipe(
      catchError(err => {
        this.toastService.showToastDanger({ summary: 'Error al eliminar', detail: err?.message ? err.message : err });
        return throwError(err);
      })
    );
}


}
