import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule,ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import {LayoutModule, BreakpointObserver} from '@angular/cdk/layout';
import { CarreraService } from './services/carrera.service';
import { TokenService } from './services/token.service';
import { ChangeDetectorRef } from '@angular/core';
import { PersonaService } from './services/persona.service';
import { NotificacionesService} from './services/notificaciones.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  @ViewChild(MatSidenav)
 sidenav: MatSidenav;
  title = 'casopractico-dos';
  loginForm!: FormGroup;
  roles: string[];
  bannoti:boolean;
  isUser = false;
  isAdmin = false;
  isDocente = false;
  isEstudiante = false;
  isResponsable = false;
  isTutorAcademico = false;
  isTutorEmpresarial = false;
  isEmpleado = false;
  isLogged = false;
  realRol: String;


  notificaciones: any[] = new Array <any>();
  notificacion: noti;

  public personas: Array<any> = []

  constructor(
    private observer: BreakpointObserver,
    private tokenService: TokenService,
    private changeDedectionRef: ChangeDetectorRef,
    private personaService: PersonaService,
    private notificacionesService: NotificacionesService
    ) {

      console.log(this.tokenService.getUserName());


      this.personaService.getPersonasByCedula(
        this.tokenService.getUserName()
      ).subscribe((resp: any)=>{
        console.log(resp.data)
        this.personas = resp.data
      })

      console.log("PERSONA GENERADA")

    }

  ngOnInit(): void {

    // Array de notifcaciones ejemplo

    this.changeDedectionRef.detectChanges();
    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.getNotificaciones()

    }else {
      this.isLogged = false;
    }

   /* this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    }); */

    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol =>{
      if(rol === 'ROLE_ADMIN'){
        this.realRol = 'admin';
        this.isAdmin = true;
      }
      if(rol === 'ROLE_DOCENTE'){
        this.realRol = 'docente';
        this.isDocente = true;
      }

      if(rol === 'ROLE_ESTUDIANTE'){
        this.realRol = 'estudiante';
        this.isEstudiante = true;
      }

      if(rol === 'ROLE_RESPONSABLEPPP'){
        this.realRol = 'responsableppp';
        this.isResponsable = true;
      }

      if(rol === 'ROLE_TUTORACADEMICO'){
        this.realRol = 'tacademico';
        this.isTutorAcademico = true;
      }

      if(rol === 'ROLE_TUTOREMPRESARIAL'){
        this.realRol = 'tempresarial';
        this.isTutorEmpresarial = true;
      }

      if(rol === 'ROLE_EMPLEADO'){
        this.realRol = 'empleado';
        this.isEmpleado = true;
      }
    });
  }


  getNotificaciones(){
    this.notificacionesService.getNotificaciones().then(res=>{
      var notigeneral: any[]= res['data'] ;
      notigeneral.forEach(value=>{
        if(value.persona.cedula == this.tokenService.getUserName()){
          this.notificaciones.push(value);
        }
      })
    })
  }

  deleteNotificacion(id){
    this.notificacionesService.deleteNotificacion(id).then(res=>{
      console.log('Notificacion eliminada');
      
    })
  }

  onLogOut(){
    this.tokenService.logOut();
    window.location.reload();
  }

  onLogIn(){
    window.location.reload();
  }

  ngAfterContentInit() {

    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }


}

interface noti{
  name:String;
  descripcion:String;
}