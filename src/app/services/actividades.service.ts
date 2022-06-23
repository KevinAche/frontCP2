import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs';
import swal from 'sweetalert2';
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})


export class ActividadesService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  _url = environment.URL_APP + 'GestionActividades'

  private url_mater: string = environment.URL_APP;

  constructor(
    private http: HttpClient
  ) { }

  getActividades() {
    let header = new HttpHeaders()
      .set('Type-content', 'aplication/json')

    return this.http.get(this._url + '/ListaActividades', {
      headers: header

    });
  }

  createActividades(act: any): Promise<any> {
    return this.http.post(
        this._url + `/CrearActividades`,act, {
          headers: this.httpHeaders
        }
      ).toPromise();
  }

  deleteActividad(id: any): Promise<any[]> {
    return this.http.delete<any[]>(
      this._url + `/EliminarActividades/${id}`
    ).toPromise();
  }


}