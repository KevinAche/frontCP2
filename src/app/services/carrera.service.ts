import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {Carrera} from "../models/Carrera";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import Swal from "sweetalert2";
import {Visita} from "../models/Visita";
import swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class CarreraService {

    _url ='http://localhost:4200/GestionActividades_Cronograma'

  constructor(
    private http: HttpClient
  ) {
  }

  getCarreras(): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(environment.URL_APP + 'GestionCarrera/ListarCarreras');
  }

  createCarrera(carrera: Carrera): Observable<Carrera> {
    return this.http
      .post<Carrera>(environment.URL_APP + 'GestionCarrera/CrearCarrera', carrera)
      .pipe(
        catchError((e) => {
          swal.fire(
            'Error al guardar',
            'NO se puede guardar la carrera',
            'error'
          );
          return throwError(e);
        })
      );
  }


  getCarrerasGestionDocentes(): Promise<any[]> {
    return this.http.get<any[]>(
      this._url+'/ListarCarreras'
    ).toPromise();
  }
}
