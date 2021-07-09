import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Administrador, AdminsResponse, AdminResponse, AdminClass } from '../interfaces/admins.interfaces';
import { catchError} from 'rxjs/operators';
import { ToastsService } from '../../services/toasts.service';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
    providedIn: 'root'
})
export class AdminsService {

    private apiUrl: string = `${environment.baseUrl}/usuarioAdministrador`;

    admin: Administrador[] = [];

    constructor(
        private http: HttpClient,
        private toastService: ToastsService
    ) { }

    getAdmins(): Observable<AdminsResponse> {
        const url = `${this.apiUrl}/todos`;          
        return this.http.get<AdminsResponse>(url)
            .pipe(
            catchError(err => of({data: []})
             )
        );


    }

    getAdmin( id:Number ):Observable<AdminResponse>{
        const url = `${this.apiUrl}/${id}`;  
        return this.http.get<AdminResponse>(url)
            .pipe(
            catchError(err => of({data: new AdminClass()})
         )
        );
    }

    createAdmin(admin: Administrador): Observable<AdminResponse>{
        const url = `${this.apiUrl}/crear`;
        return this.http.post<AdminResponse>(url, admin) 
        .pipe(
            catchError(err => {
                this.toastService.showToastDanger({ summary:'Error al crear', detail:err?.message ? err.message : err });
                return throwError(err);
            })
        );
    }

    updateAdmin(admin: Administrador): Observable<AdminResponse>{
        const url = `${this.apiUrl}/editar`;
        return this.http.post<AdminResponse>(url, admin) 
        .pipe(
            catchError(err => {
                this.toastService.showToastDanger({ summary:'Error al editar', detail:err?.message ? err.message : err });
                return throwError(err);
            })
        );
    }
    
    deleteAdmin(id:Number): Observable<AdminResponse>{
        const url = `${this.apiUrl}/eliminar/${id}`;
        return this.http.get<AdminResponse>(url) 
        .pipe(
            catchError(err => {
                this.toastService.showToastDanger({ summary:'Error al eliminar', detail:err?.message ? err.message : err });
                return throwError(err);
            })
        );
    }
}