import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ConvocatoriaService {

  _url = 'https://backendg1c2.herokuapp.com/GestionConvocatoria'

  headers= new HttpHeaders().append('Content-type','application/json');

  constructor(
    private http: HttpClient
  ) {
  }

  getConvocatoria() {
    let header = new HttpHeaders()
      .set('Type-content', 'aplication/json')

    return this.http.get(this._url + '/ListaConvocatoria', {
      headers: header

    });
  }

  getConvocatoriasVista(): Promise<any[]> {
    return this.http.get<any[]>(
      environment.URL_APP + `GestionConvocatoria/ListaConvocatoriaVista`
    ).toPromise();
  }

  getNumConv() {
    let header = new HttpHeaders()
      .set('Type-content', 'aplication/json')
    return this.http.get(this._url + '/ObtenerNumCon', {
      headers: header
    });
  }

  createConvocatoria(idSolicitud:any, convocatoria:any): Promise<any> {
    return this.http.post(
      environment.URL_APP + `GestionConvocatoria/CrearConD/${idSolicitud}`,
      {
        ...convocatoria
      }, {
        headers: this.headers
      }
    ).toPromise();
  }

  deleteConvocatoria(id: any): Promise<any[]> {
    return this.http.delete<any[]>(
      environment.URL_APP + `GestionConvocatoria/EliminarConvocatoria/${id}`
    ).toPromise();
  }


}
