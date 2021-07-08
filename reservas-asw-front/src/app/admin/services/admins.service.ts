import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Administrador, AdminsResponse } from '../interfaces/admin.interfaces';

@Injectable({
    providedIn: 'root'
})
export class AdminsService {

    private apiUrl: string = `${environment.baseUrl}/usuarioAdministrador`;

    result: Administrador[] = [];

    constructor(
        private http: HttpClient
    ) { }

    getAdmins(): Administrador[] {

        this.http.get<AdminsResponse>(`${this.apiUrl}/todos`)
            .subscribe(
                (response: AdminsResponse) => {
                    this.result = response.data;
                    console.log(this.result);
                })
        return this.result;

    }
}