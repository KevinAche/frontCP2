import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TutorE } from '../models/TutorE';

@Injectable({
  providedIn: 'root'
})
export class RegistroSeguimientoService {

    _url ='https://backendg1c2.herokuapp.com:443/GestionActividades_Cronograma';
    _urlt='https://backendg1c2.herokuapp.com:443/GestionTutorEmpresarial/ListarTutoresEmp';
    
  

  constructor(
    private http: HttpClient
  ) { }

  getActividades_Cronograma(){
    let header = new HttpHeaders()
    .set('Type-content','aplication/json')
    return this.http.get(this._url+'/ListaActividades_Cronograma',{
        headers: header
    });
  }
  postActividades_Cronograma(){
    let header = new HttpHeaders()
    .set('Type-content','aplication/json')
    return this.http.post(this._url+'/CrearActividades_Cronograma',{
        headers: header
    });
  }
  
  getTutoresE():Observable<TutorE[]>{
    let header = new HttpHeaders()
    .set('Type-content','aplication/json')
    return this.http.get<TutorE[]>(this._urlt,{
        headers: header
    });
  
  }
}
