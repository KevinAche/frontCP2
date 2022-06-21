import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Visita } from '../models/Visita';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegistroVisitaService {
  _urlP = 'http://localhost:8082/';
  _url = 'http://localhost:8082/GestionRegistroVisitaEmpresa';
  urlCreate = this._url + '/CrearRegistro_VisitaEmpresa';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) {}

  getTutorA() {
    let header = new HttpHeaders().set('Type-content', 'aplication/json');

    return this.http.get(
      this._urlP + 'GestionTutorAcademico/ListaTutorAcademico',
      {
        headers: header,
      }
    );
  }

  createVisita(visita: Visita): Promise<any> {
    return this.http
      .post(this.urlCreate, visita, { headers: this.httpHeaders })
      .toPromise();
  }
  createTutorAcademico(registro: any): Promise<any> {
    return this.http
      .post(
        environment.URL_APP +
          `GestionRegistroVisitaEmpresa/CrearRegistro_VisitaEmpresa`,
        {
          ...registro,
        },
        {
          headers: this.httpHeaders,
        }
      )
      .toPromise();
  }

  getVisita() {
    let header = new HttpHeaders().set('Type-content', 'aplication/json');

    return this.http.get(
      this._urlP + 'GestionRegistroVisitaEmpresa/ListaRegistro_VisitaEmpresa',
      {
        headers: header,
      }
    );
  }
}
