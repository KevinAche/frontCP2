import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { InformeVisita, Visita } from '../models/Visita';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class RegistroVisitaService {
  _url = 'http://localhost:8082/GestionRegistroVisitaEmpresa';
  urlCreate = this._url + '/CrearRegistro_VisitaEmpresa';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) {}

  getRegistroVisita() {
    let header = new HttpHeaders().set('Type-content', 'aplication/json');

    return this.http.get(this._url + '/ListaRegistro_VisitaEmpresa', {
      headers: header,
    });
  }

  createVisita(visita: Visita): Observable<Visita> {
    return this.http
      .post<Visita>(this.urlCreate, visita, { headers: this.httpHeaders })
      .pipe(
        catchError((e) => {
          swal.fire(
            'Error al guardar',
            'NO se puede guardar a la visita',
            'error'
          );
          return throwError(e);
        })
      );
  }
  getBuscarTutor() {
      let header = new HttpHeaders().set('Type-content', 'aplication/json');

      return this.http.get(this._url + '/', {
        headers: header,
      });
    }
}
