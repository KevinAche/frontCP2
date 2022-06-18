import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { Carrera } from '../models/Carrera';
import { Docente } from '../models/Docente';
import { Persona } from '../models/Persona';
import { CarreraService } from '../services/carrera.service';
import { DocenteService } from '../services/docente.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-registro-docentes',
  templateUrl: './registro-docentes.component.html',
  styleUrls: ['./registro-docentes.component.css']
})
export class RegistroDocentesComponent implements OnInit {

  docente: Docente = new Docente();
  formDocente: FormGroup;
  formPersona: FormGroup;
  persona: Persona = new Persona();
  carreras : Carrera[];

  banpersona :boolean =true;
  bantitulo:boolean =false;

  dropselect: Carrera;
  tipo_d: String;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private docenteservice: DocenteService,
    private carreraservice:CarreraService,
  ) {  this.listarCarreras(); }

  ngOnInit(): void {

    this.formDocente = this.formBuilder.group({
      abrev_titulo: ['', Validators.required],
      titulo: ['', Validators.required],
      area: ['', Validators.required],
      carrera: ['', Validators.required],
    });
    this.formPersona = this.formBuilder.group({
      pnombre: ['', Validators.required],
      snombre: ['', Validators.required],
      papellido: ['', Validators.required],
      sapellido: ['', Validators.required],
      cedula: ['', Validators.required],
      correo: ['', Validators.required],
      direccion: ['', Validators.required],
      fechan: ['', Validators.required],
      telefono: ['', Validators.required],
    });
    this.listarCarreras();
  }

  public create(): void {

    if (this.formDocente.invalid) {
      
      swal.fire(
        'Error de entrada',
        'Revise que los campos no esten vacios',
        'error'
      )
      return;
    }
    this.docenteservice.createDocente(this.docente).subscribe(
      Response => {
        swal.fire(
          'Docente Guardado',
          `Docente ${this.docente.persona.primerNombre} creado con exito!`,
          'success'
        )
        this.limpiar()
      }
    )
    
    
  }
  public SiguienteDatos(): void {
    
    this.banpersona=false;
    this.bantitulo=true;
    swal.fire(
      'Datos Personales',
      `Persona: ${this.persona.primerNombre} creada con exito!`,
      'success'
    )
    
  }

  public limpiar(): void {
    this.docente.abrevTitulo = null;
    this.docente.area = null;
    this.docente.carrera = null;
    this.docente.persona = null;
    this.docente.titulo = null;
    
  }

  OnChange(ev) {
    if (ev.value == null) {}else{
      this.tipo_d = ev.value.name;
    }
  }

  listarCarreras():void {
    this.carreraservice.getCarreras().subscribe(value => {
      this.carreras=value['data'];
    })
  }


}

