import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
  })
  export class ActividadesDiariasService {

      _url ='https://backendg1c2.herokuapp.com/ActividadesDiarias'

    constructor(
      private http: HttpClient
    ) { }

    getInformeActividadesDiarias() {
      let header = new HttpHeaders()
      .set('Type-content','aplication/json')

      return this.http.get(this._url+'/ListaActividadesDiarias',{
          headers: header

      });
    }

  }