import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { environment } from 'src/environments/environment.prod';
import { Empresa } from './empresa';

@Injectable({
  providedIn: 'root'
})

export class EmpresaService {

  private url_mater: string =environment.URL_APP;

  private urlCreate: string = this.url_mater+'/GestionEmpresa/CrearEmpresa';
  private urlDelete: string = this.url_mater+'/GestionEmpresa/EditarEmpresa';
  private urlUpdate: string = this.url_mater+'/GestionEmpresa/EliminarEmpresa';
  private urlSearch: string = this.url_mater+'/GestionEmpresa/ListaEmpresas';
  

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient, private router: Router) { }

  getEmpresas(): Observable<Empresa[]> {
    return this.http.get(this.urlSearch).pipe(
      map(response => response as Empresa[])
    );
  }

  createEmpresa(emp: Empresa): Observable<Empresa> {
    return this.http.post<Empresa>(this.urlCreate, emp, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        swal.fire('Error al guardar', 'NO se puede guardar a la empresa', 'error')
        return throwError(e);
      })
    );
  }


  updateEmpresa(emp: Empresa): Observable<Empresa> {
    return this.http.put<Empresa>(`${this.urlUpdate}/${emp.idEmpresa}`, emp, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        swal.fire('Error al actualizar', 'NO se puede actualizar a empresa', 'error')
        return throwError(e);
      })
    );
  }

  deleteEmpresa(persid: number): Observable<Empresa> {
    return this.http.delete<Empresa>(`${this.urlDelete}/${persid}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        swal.fire('Error al eliminar', 'No se puede eliminar', 'error')
        return throwError(e);
      })
    );
  }
}