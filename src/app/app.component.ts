import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { LayoutModule, BreakpointObserver } from '@angular/cdk/layout';
import { CarreraService } from './services/carrera.service';
import { TokenService } from './services/token.service';
import { ChangeDetectorRef } from '@angular/core';
import { PersonaService } from './services/persona.service';

import Swal from 'sweetalert2';
import { AlumnosService } from './services/alumnos.service';
import { SolicitudAlumnoService } from './services/solicitud-alumno.service';
import { RegistroAsistenciaService } from './services/registro-asistencia.service';
import { registroA } from './models/RegistroAsistencia';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  public listaSolicitudAlumno: Array<any> = [];
  public alumnosDatos: Array<any> = [];
  public listaRegistroActividades: Array<any> = [];

  registroA: registroA = new registroA();

  public contro: boolean = false;
  public idAlumnoo: any = 0;

  @ViewChild(MatSidenav)
  sidenav: MatSidenav;
  title = 'casopractico-dos';
  loginForm!: FormGroup;
  roles: string[];
  bannoti: boolean;
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


  notificaciones: noti[];
  notificacion: noti;

  public personas: Array<any> = []

  constructor(
    private observer: BreakpointObserver,
    private tokenService: TokenService,
    private changeDedectionRef: ChangeDetectorRef,
    private personaService: PersonaService,
    private alumnoService: AlumnosService,
    private solicitudAlumnoService: SolicitudAlumnoService,
    private registroAsistenciaService: RegistroAsistenciaService,
  ) {

    console.log(this.tokenService.getUserName());


    this.personaService.getPersonasByCedula(
      this.tokenService.getUserName()
    ).subscribe((resp: any) => {
      console.log(resp.data)
      this.personas = resp.data
    })

    console.log("PERSONA GENERADA")

  }

  ngOnInit(): void {
    this.listarDetalladaAlumnos();
    this.listarSolicitudAlumnos();
    this.listarregistroAsistencia();


    // Array de notifcaciones ejemplo

    this.notificaciones = [
      { name: "Primera notificacion", descripcion: "Se confirmo su participacion en la empresa TTTT" },
      { name: "Segunda notificacion", descripcion: "Nueva solicitud enviada a la empresa TTTT" },
      { name: "Tercera notificacion", descripcion: "Se ha sido asignado a los alumnos en la empresa TTTT" },
      { name: "Cuarta notificacion", descripcion: "Se ha sido asignado como tutor de praticas pre-profesionales" }
      ,
      { name: "Quinta notificacion", descripcion: "Se ha sido asignado como tutor de praticas pre-profesionales" }
      ,
      { name: "Sexta notificacion", descripcion: "Se ha sido asignado como tutor de praticas pre-profesionales" }
      ,
      { name: "Septima notificacion", descripcion: "Se ha sido asignado como tutor de praticas pre-profesionales" }
      ,
      { name: "Octava notificacion", descripcion: "Se ha sido asignado como tutor de praticas pre-profesionales" }
      ,
      { name: "Novena notificacion", descripcion: "Se ha sido asignado como tutor de praticas pre-profesionales" }
      ,
      { name: "Decima notificacion", descripcion: "Se ha sido asignado como tutor de praticas pre-profesionales" }
      ,
      { name: "Onceava notificacion", descripcion: "Se ha sido asignado como tutor de praticas pre-profesionales" }

    ];

    this.changeDedectionRef.detectChanges();
    if (this.tokenService.getToken()) {
      this.isLogged = true;

    } else {
      this.isLogged = false;
    }

    /* this.loginForm = new FormGroup({
       email: new FormControl('', [Validators.required, Validators.email]),
       password: new FormControl('', [Validators.required])
     }); */

    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.realRol = 'admin';
        this.isAdmin = true;
      }
      if (rol === 'ROLE_DOCENTE') {
        this.realRol = 'docente';
        this.isDocente = true;
      }

      if (rol === 'ROLE_ESTUDIANTE') {
        this.realRol = 'estudiante';
        this.isEstudiante = true;
      }

      if (rol === 'ROLE_RESPONSABLEPPP') {
        this.realRol = 'responsableppp';
        this.isResponsable = true;
      }

      if (rol === 'ROLE_TUTORACADEMICO') {
        this.realRol = 'tacademico';
        this.isTutorAcademico = true;
      }

      if (rol === 'ROLE_TUTOREMPRESARIAL') {
        this.realRol = 'tempresarial';
        this.isTutorEmpresarial = true;
      }

      if (rol === 'ROLE_EMPLEADO') {
        this.realRol = 'empleado';
        this.isEmpleado = true;
      }
    });


  }

  onLogOut() {
    this.tokenService.logOut();
    window.location.reload();
  }

  onLogIn() {
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

  //FRANKLIN

  public listarDetalladaAlumnos() {
    this.alumnoService.getDetalleAlumnos().subscribe((resp: any) => {
      console.log(resp.data)
      this.alumnosDatos = resp.data
    })
  }

  listarSolicitudAlumnos() {
    this.solicitudAlumnoService.getSolicitudAlumno().subscribe((resp: any) => {
      console.log(resp.data)
      this.listaSolicitudAlumno = resp.data
    }
    )
  }

  public listarregistroAsistencia() {
    this.registroAsistenciaService.getRegistoAsistencialista().subscribe((resp: any) => {
      console.log(resp.data)
      this.listaRegistroActividades = resp.data
    })
  }



  verificarSolicitud(cedula: any) {

    

    for (var b = 0; b < this.alumnosDatos.length; b++) {
      if (cedula == this.alumnosDatos[b].cedula) {

        for (var a = 0; a < this.listaRegistroActividades.length; a++) {
          //this.registroA.alumno.idAlumno=this.alumnosDatos[b].id_alumno;
          if (this.listaRegistroActividades[a].alumno.idAlumno == this.alumnosDatos[b].id_alumno) {
            this.contro = true;
          }

        }
      }
    }

    this.registroA.alumno.persona.cedula=cedula;
    this.registroA.docRegistroA="Sin Documento";
    
    if (this.contro == false) {
      Swal.fire({
        title: '¿Desea crear una plantilla de registro de actividades?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Crear',
        denyButtonText: `No Crear`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.registroAsistenciaService.createReAsistencia(this.registroA).subscribe(
            Response => {
              Swal.fire(
                'Creado',
                `Plantilla creado con exito!`,
                'success'
              )
              location.reload();
            }
          )

        } else if (result.isDenied) {

          Swal.fire('Plantilla no creada', '', 'info')
        }
      })

    }

  }




}

interface noti {
  name: String;
  descripcion: String;
}