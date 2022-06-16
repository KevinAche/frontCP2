import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DocenteService {

  _url = 'http://localhost:8082/GestionDocente'

  constructor(
    private http: HttpClient
  ) {
  }

  getDocenteCedula(cedula: string) {
    return this.http.get<any[]>(
      environment.URL_APP+`GestionDocente/BuscarDocenteCedula/${cedula}`
    ).toPromise();
  }


  getDocentes(): Promise<any[]> {
    return this.http.get<any[]>(
      environment.URL_APP+`GestionDocente/ListaDocentes`
    ).toPromise();
  }

}
