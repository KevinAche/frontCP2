import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
  export class InformeFinalAlumnoService {
  
      _url ='http://localhost:8082/GestionInformeFinal'
  
    constructor(
      private http: HttpClient
    ) { }
  
    getInformeFinalAlumno() {
      let header = new HttpHeaders()
      .set('Type-content','aplication/json')
  
      return this.http.get(this._url+'/ListaInformeFinal',{
          headers: header
  
      });
    }
  
  }