import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ResponsableService {
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) {}

  getResponsable(): Promise<any[]> {
    return this.http
      .get<any[]>(
        environment.URL_APP + 'GestionResponsablePPP/ListaResponsablePPP'
      )
      .toPromise();
  }
}
