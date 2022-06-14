import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConvocatoriaService {

    _url ='http://localhost:8082/GestionConvocatoria'

  constructor(
    private http: HttpClient
  ) { }

  getConvocatoria() {
    let header = new HttpHeaders()
    .set('Type-content','aplication/json')

    return this.http.get(this._url+'/ListaConvocatoria',{
        headers: header
        
    });
  }
}