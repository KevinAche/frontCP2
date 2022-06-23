import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs';
import swal from 'sweetalert2';
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})


export class ConvenioService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })


  private _url: string = environment.URL_APP+"GestionConvenios";

  constructor(
    private http: HttpClient
  ) { }

  getConvenio() {
    let header = new HttpHeaders()
      .set('Type-content', 'aplication/json')

    return this.http.get(this._url + '/ListarConvenios', {
      headers: header

    });
  }

  createConvenio(convenio: any,cedulaGerente: any, cedulaResponsable: any): Promise<any> {
    return this.http.post(
        this._url + `/CrearConvenio/${cedulaGerente}/${cedulaResponsable}`,convenio, {
          headers: this.httpHeaders
        }
      ).toPromise();
  }

  createConvenio2(convenio, cedulaGerente: string,cedulaResponsable: string): Promise<any> {
    return this.http.post(
      this._url + `/CrearConvenio/${cedulaGerente}/${cedulaResponsable}`,
      {
        ...convenio
      }, {
        headers: this.httpHeaders
      }
    ).toPromise();
  }


}