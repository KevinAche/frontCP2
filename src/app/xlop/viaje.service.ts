import { Injectable } from '@angular/core';
import { Viaje } from './viaje';
import { from, Observable, of } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ViajeService {
  private urlEndPoint:string= 'http://localhost:8082/api/viaje';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})
  constructor(private http:HttpClient) { }

  getViaje():Observable<Viaje[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Viaje[])
    );
  }

  create(viaje:Viaje):Observable<Viaje>{
    return this.http.post<Viaje>(
      this.urlEndPoint,viaje,{headers:this.httpHeaders})
  }

}
