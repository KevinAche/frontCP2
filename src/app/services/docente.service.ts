import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConvocatoriaService {

    _url ='http://localhost:8082/GestionDocente'

  constructor(
    private http: HttpClient
  ) { }

  getDocente() {
    let header = new HttpHeaders()
    .set('Type-content','aplication/json')
    return this.http.get(this._url+'/ListaDocentes',{
        headers: header
    });
  }