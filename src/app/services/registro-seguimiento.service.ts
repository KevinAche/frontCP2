import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SolicitudAlumnoService {

    _url ='http://localhost:8082/GestionActividades_Cronograma'

  constructor(
    private http: HttpClient
  ) { }

  getActividades_Cronograma(){
    let header = new HttpHeaders()
    .set('Type-content','aplication/json')
    return this.http.get(this._url+'/ListaActividades_Cronograma',{
        headers: header
    });
  }
  postActividades_Cronograma(){
    let header = new HttpHeaders()
    .set('Type-content','aplication/json')
    return this.http.get(this._url+'/CrearActividades_Cronograma',{
        headers: header
    });
  }
}
  