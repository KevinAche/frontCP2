import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Persona } from '../models/Persona';
import { catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  _url ='https://backendg1c2.herokuapp.com/GestionPersona'
  private urlCreate: string = this._url+'/CrearPersona';
  private urlUpdate: string = this._url+'/EditarPersona';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient
  ) {
  }

  getPersonasByCedula(cedula: any) {
    let header = new HttpHeaders()
    .set('Type-content','aplication/json')

    return this.http.get(this._url+'/PersonaByCedula/'+cedula,{
        headers: header

    });
  }

  createPersona(pers: Persona): Observable<Persona> {
    return this.http.post<Persona>(this.urlCreate, pers, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        Swal.fire('Error al guardar', 'NO se puede guardar a la persona', 'error')
        return throwError(e);
      })
    );
  }

  updatePersona(emp: Persona): Observable<Persona> {
    return this.http.put<Persona>(`${this.urlUpdate}/${emp.idPersona}`, emp, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        Swal.fire('Error al actualizar', 'No se puede actualizar a la persona', 'error')
        return throwError(e);
      })
    );
  }
}
