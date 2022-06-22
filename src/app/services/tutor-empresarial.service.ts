import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class TutorEmpresarialService {

    _url ='https://backendg1c2.herokuapp.com/GestionTutorEmpresarial';
    
    
    constructor(
        private http: HttpClient
    ) { }

    getTutorEmpresarial() {
        let header = new HttpHeaders()
            .set('Type-content', 'aplication/json')

            return this.http.get(this._url+'/ListarTutoresEmp',{
            headers: header

        });
    }

}
