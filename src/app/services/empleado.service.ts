import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Carrera} from "../models/Carrera";
import {environment} from "../../environments/environment";
import {Empleado} from "../models/Empleado";
import {catchError} from "rxjs/operators";
import swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(
    private httpClient:HttpClient
  ) { }

  getEmpleados(): Observable<Empleado[]> {
    return this.httpClient.get<Empleado[]>(environment.URL_APP + 'GestionPersonalEmpresa/ListaPersonal');
  }

  createEmpleado(empleado: Empleado, cedula: String, idEmp: number): Observable<Empleado> {
    return this.httpClient
      .post<Empleado>(environment.URL_APP + `GestionPersonalEmpresa/CrearPersonal/${cedula}/${idEmp}` ,empleado)
      .pipe(
        catchError((e) => {
          swal.fire(
            'Error al guardar',
            'NO se puede guardar el empleado',
            'error'
          );
          return throwError(e);
        })
      );
  }

}
