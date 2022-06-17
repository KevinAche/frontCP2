import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { InformeVisita } from '../models/Visita';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class InformeService {
  _urlI = 'http://localhost:8082/GestionInforme_Visita';
  urlCreateInforme = this._urlI + '/CrearInforme_Visita';
  /*urlDelete: string = this.url_mater+'/GestionEmpresa/EliminarEmpresa';
    urlUpdate: string = this.url_mater+'/GestionEmpresa/EditarEmpresa';
  private urlSearch: string = this.url_mater+'/GestionEmpresa/ListaEmpresas';*/

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) {}

  createInformeVisita(infvisita: InformeVisita): Observable<InformeVisita> {
    return this.http
      .post<InformeVisita>(this.urlCreateInforme, infvisita, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          swal.fire(
            'Error al guardar',
            'NO se puede guardar el InformeVisita',
            'error'
          );
          return throwError(e);
        })
      );
  }
}
