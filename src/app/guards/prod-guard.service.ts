import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {TokenService} from "../services/token.service";

@Injectable({
  providedIn: 'root'
})
export class ProdGuardService implements CanActivate{

  realRol: string;

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const expectedRol = route.data['expectedRol'];
    const roles = this.tokenService.getAuthorities();
    this.realRol = 'user';
    roles.forEach(rol =>{
      if(rol === 'ROLE_ADMIN'){
        this.realRol = 'admin';
    }
      if(rol === 'ROLE_DOCENTE'){
        this.realRol = 'docente';
      }

      if(rol === 'ROLE_ESTUDIANTE'){
        this.realRol = 'estudiante';
      }

      if(rol === 'ROLE_RESPONSABLEPPP'){
        this.realRol = 'responsableppp';
      }

      if(rol === 'ROLE_TUTORACADEMICO'){
        this.realRol = 'tacademico';
      }

      if(rol === 'ROLE_TUTOREMPRESARIAL'){
        this.realRol = 'tempresarial';
      }

      if(rol === 'ROLE_EMPLEADO'){
        this.realRol = 'empleado';
      }
    });


    if(!this.tokenService.getToken() || expectedRol.indexOf(this.realRol) === -1){
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
