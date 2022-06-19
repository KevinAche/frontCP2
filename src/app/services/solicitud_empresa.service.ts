import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class Solicitud_empresaService {

  headers= new HttpHeaders().append('Content-type','application/json');

  constructor(
    private http: HttpClient
  ) { }


  getSolicitudesEmpresa(cedula: string) {
    return this.http.get<any[]>(
      environment.URL_APP+`GestionSolicitudEmpresa/ListarSolicitudesEmpresa/${cedula}`
    ).toPromise();
  }



}
