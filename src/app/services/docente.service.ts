import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import {environment} from "../../environments/environment";
import { Docente } from '../models/Docente';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {

  _url = 'http://localhost:8082/GestionDocente'

  private urlCreate: string = this._url+'/CrearDocente';
  private urlDelete: string = this._url+'/BuscarDocente';
  private urlUpdate: string = this._url+'/EliminarDocente';
  

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient, private router: Router) { }


  getDocenteCedula(cedula: string) {
    return this.http.get<any[]>(
      environment.URL_APP+`GestionDocente/BuscarDocenteCedula/${cedula}`
    ).toPromise();
  }


  getDocentes(): Promise<any[]> {
    return this.http.get<any[]>(
      environment.URL_APP+`GestionDocente/ListaDocentes`
    ).toPromise();
  }

  createDocente(doc: Docente, ced :String, id : number): Observable<Docente> {
    return this.http.post<Docente>(`${this.urlCreate}/${ced}/${id}`, doc, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        Swal.fire('Error al guardar', 'NO se puede guardar al docente', 'error')
        return throwError(e);
      })
    );
  }

}
