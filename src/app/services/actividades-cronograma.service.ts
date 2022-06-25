import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ActividadesCronogramaService {

  headers= new HttpHeaders().append('Content-type','application/json');

  url = environment.URL_APP + 'GestionActividades_Cronograma/'

  constructor(
    private http: HttpClient
  ) { }

  createActividadCronograma(cronograma): Promise<any> {
    return this.http.post(
      this.url + `CrearActividades_Cronograma`,
      {
        ...cronograma
      }, {
        headers: this.headers
      }
    ).toPromise();
  }

  getActividadesByCronograma(idcronograma) {
    return this.http.get<any[]>(
      this.url+`ListaActividadesPorCronograma/${idcronograma}`
    ).toPromise();
  }

  updateActividadesCronograma(id , actividad){
    return this.http.put<any[]>(
        this.url+`EditarActividades_Cronograma/${id}`,actividad, { headers: this.headers }
      ).toPromise();
  }

  deleteCronogramas(id: any): Promise<any[]> {
    return this.http.delete<any[]>(
      this.url + `EliminarActividades_Cronograma/${id}`
    ).toPromise();
  }

}