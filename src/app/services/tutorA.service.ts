import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TutorAService {

  headers= new HttpHeaders().append('Content-type','application/json');

  constructor(
    private http: HttpClient
  ) { }

  getTutoresAcademicos(): Promise<any[]> {
    return this.http.get<any[]>(
      environment.URL_APP+`GestionTutorAcademico/ListaTutorAcademico`
    ).toPromise();
  }

  getTutoresAcademicoId(id: number): Promise<any[]> {
    return this.http.get<any[]>(
      environment.URL_APP+`GestionTutorAcademico/BuscarTutor/${id}`
    ).toPromise();
  }


  createTutorAcademico(cedulaD: string, cedulaA: string,tutor):Promise<any>{
    return this.http.post(
      environment.URL_APP+`GestionTutorAcademico/CrearTutorAcademico/${cedulaD}/${cedulaA}`,
      {
        ...tutor
      },{
        headers: this.headers
      }
    ).toPromise();
  }
}
