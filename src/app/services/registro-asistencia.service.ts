import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})


export class RegistroAsistenciaService {
    _url = 'https://backendg1c2.herokuapp.com/RegistroAsistencia'

    constructor(
        private http: HttpClient
    ) { }

    
    getRegistoAsistencialista() {
        let header = new HttpHeaders()
            .set('Type-content', 'aplication/json')
        return this.http.get(this._url + '/ListaRegAsistencias', {
            headers: header
        });
    }

}