import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { EnterprisesResponse } from '../interfaces/enterprise.interfaces';

@Injectable({
    providedIn: 'root'
})
export class EnterprisesService {

    private apiUrl: string = `${environment.baseUrl}/empresa`;

    constructor(
        private http: HttpClient,
    ) { }

    getEnterprises(): Observable<EnterprisesResponse> {
        const url = `${this.apiUrl}/todas`;
        return this.http.get<EnterprisesResponse>(url)
            .pipe(
                catchError(err => of({ data: [] }))
            );
    }

}
