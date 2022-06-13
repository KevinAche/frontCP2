import { Injectable } from '@angular/core';
import { Convocatoria } from '../models/Convocatoria';
import { from, Observable, of } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ConvocatoriaService {
  private urlEndPoint:string= 'http://localhost:8082/GestionConvocatoria/viaje|';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})
  constructor(private http:HttpClient) { }

  getConvocatoria():Observable<Convocatoria[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Convocatoria[])
    );
  }

}