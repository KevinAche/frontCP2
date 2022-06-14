import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {

    _url ='http://localhost:8082/GestionCarrera'

  constructor(
    private http: HttpClient
  ) { }

  getCarreras() {
    let header = new HttpHeaders()
    .set('Type-content','aplication/json')

    return this.http.get(this._url+'/ListarCarreras',{
        headers: header
        
    });
  }
}