import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConvocatoriaService {

    _url ='https://backendg1c2.herokuapp.com/GestionConvocatoria'

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
