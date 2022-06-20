import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ActividadesDiariasService } from '../services/actividades-diarias.service';
import { Anexo9Service } from '../services/anexo9.service';
import { RegistroAsistenciaService } from '../services/registro-asistencia.service';
import swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActividadesDiarias } from '../models/actividades-diarias';


@Component({
  selector: 'app-registro-asistencia',
  templateUrl: './registro-asistencia.component.html',
  styleUrls: ['./registro-asistencia.component.css']
})



export class RegistroAsistenciaComponent implements OnInit {

  public listaActividades: Array<any> = [];
  public listaAnexo9Datos: Array<any> = [];
  public listaRegistroActividades: Array<any> = [];

  actividadesDiarias: ActividadesDiarias = new ActividadesDiarias();


  public dialogoMiRegistro: boolean;
  public contador = 0;
  public dis: boolean;
  public cedulaAlumno: any;
  formValidacion: FormGroup;



  showDialog(idRegiAsi:any) {
    this.dis = true;
    this.actividadesDiarias.registroAsistencia.idRegistroAsistencia = idRegiAsi;
    
  }


  constructor(
    private router: Router, private route: ActivatedRoute,
    private actividadesDiariasService: ActividadesDiariasService,
    private anexo9Service: Anexo9Service,
    private registroAsistenciaService: RegistroAsistenciaService,
    private formBuilder: FormBuilder,
  ) { }


  ngOnInit(): void {
    this.cedulaAlumno = this.route.snapshot.paramMap.get('cedula');
    this.listarActividades();
    this.listarAnexo9();
    this.listarregistroAsistencia();

    this.formValidacion = this.formBuilder.group({
      fecha: ['', Validators.required],
      numHoras: ['', Validators.required],
      horaLlegada: ['', Validators.required],
      horaSalida: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }



  //metodos de listar
  public listarActividades() {
    this.actividadesDiariasService.getInformeActividadesDiarias().subscribe((resp: any) => {
      console.log(resp.data)
      this.listaActividades = resp.data
    })
  }


  public listarAnexo9() {
    this.anexo9Service.getAnexo9lista().subscribe((resp: any) => {
      console.log(resp.data)
      this.listaAnexo9Datos = resp.data
    })
  }

  public listarregistroAsistencia() {
    this.registroAsistenciaService.getRegistoAsistencialista().subscribe((resp: any) => {
      console.log(resp.data)
      this.listaRegistroActividades = resp.data
    })
  }



  //Metodo de crear actividades

  public create(): void {

    if (this.formValidacion.invalid) {
      swal.fire(
        'Error de entrada',
        'Revise que los campos no esten vacios',
        'error'
      )
      return;
    }



        
        this.actividadesDiariasService.createregistroActividades(this.actividadesDiarias).subscribe(
          Response => {
            swal.fire(
              'Enviado',
              `Actividad creada con exito!`,
              'success'
            )
            //this.limpiar();
            //this.listarSolicitudAlumnos();
          }
        )
    
    

  }




}