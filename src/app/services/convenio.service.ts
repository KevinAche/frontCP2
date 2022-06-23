import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import {environment} from "../../environments/environment";
import { Asignatura } from '../models/Asignatura';
import { Convenio } from '../models/Convenio';

@Injectable({
  providedIn: 'root'
})
export class ConvenioService {

  _url =  environment.URL_APP+'GestionConvenios'

  private urlCreate: string = this._url+'/CrearConvenios';
  private urlDelete: string = this._url+'/EliminarConvenios';
  private urlSearch: string = this._url+'/ListarConvenios';


  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient, private router: Router) { }

  getConvenios(): Observable<Convenio[]> {
    return this.http.get(this.urlSearch).pipe(
      map(response => response as Convenio[])
    );
  }


  createConvenios(doc: Convenio): Observable<Convenio> {
    return this.http.post<Convenio>(`${this.urlCreate}`, doc, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        Swal.fire('Error al guardar', 'NO se puede guardar el convenio', 'error')
        return throwError(e);
      })
    );
  }

  deleteConvenios(empid: String): Observable<Convenio> {
    return this.http.delete<Convenio>(`${this.urlDelete}/${empid}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        Swal.fire('Error al eliminar', 'No se puede eliminar', 'error')
        return throwError(e);
      })
    );
  }

}