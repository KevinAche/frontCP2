import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConvenioService {

    _url ='https://backendg1c2.herokuapp.com/GestionConvenios'

  constructor(
    private http: HttpClient
  ) { }

  getConvenio() {
    let header = new HttpHeaders()
    .set('Type-content','aplication/json')

    return this.http.get(this._url+'/ListarConvenios',{
        headers: header

    });
  }

}
