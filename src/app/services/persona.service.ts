import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  _url ='http://localhost:8082/GestionPersona'

  constructor(
    private http: HttpClient
  ) { 
  }

  getPersonasByCedula(cedula: any) {
    let header = new HttpHeaders()
    .set('Type-content','aplication/json')

    return this.http.get(this._url+'/PersonaByCedula/'+cedula,{
        headers: header
        
    });
  }
}
