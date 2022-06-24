import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ConvocatoriaService {

  _url = environment.URL_APP+'GestionConvocatoria'

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

}
