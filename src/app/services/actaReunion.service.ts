import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import {environment} from "../../environments/environment";
import { ActaReunion } from '../models/ActaReunion';
import { Docente } from '../models/Docente';

@Injectable({
  providedIn: 'root'
})
export class ActaReunionService {

  _url =  environment.URL_APP+'GestionActaDeReunion'

  private urlCreate: string = this._url+'/CrearActaDeReunion';
  private urlDelete: string = this._url+'/EliminarActaDeReunion';
  private urlSearch: string = this._url+'/ListaActaDeReunion';


  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient, private router: Router) { }



  getActas(): Observable<ActaReunion[]> {
    return this.http.get(this.urlSearch).pipe(
      map(response => response as ActaReunion[])
    );
  }




  createActa(doc: ActaReunion): Observable<ActaReunion> {
    return this.http.post<ActaReunion>(`${this.urlCreate}`, doc, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        Swal.fire('Error al guardar', 'NO se puede guardar la acta', 'error')
        return throwError(e);
      })
    );
  }

  deleteActa(empid: String): Observable<ActaReunion> {
    return this.http.delete<ActaReunion>(`${this.urlDelete}/${empid}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        Swal.fire('Error al eliminar', 'No se puede eliminar', 'error')
        return throwError(e);
      })
    );
  }

}