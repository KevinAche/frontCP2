import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SolicitudAlumnoService {

    _url ='http://localhost:8082/GestionSolicitudAlumno'

  constructor(
    private http: HttpClient
  ) { }

  getSolicitudAlumno() {
    let header = new HttpHeaders()
    .set('Type-content','aplication/json')
    return this.http.get(this._url+'/ListaSolicitudAlumno',{
        headers: header
    });
  }



}
