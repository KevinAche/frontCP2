import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmptyError } from 'rxjs';
import { ActaReunionComponent } from '../acta-reunion/acta-reunion.component';
import { Alumno } from '../models/Alumno';
import { Docente } from '../models/Docente';
import { Empleado } from '../models/Empleado';
import { AlumnosService } from '../services/alumnos.service';
import { DocenteService } from '../services/docente.service';
import { EmpleadoService } from '../services/empleado.service';
import { Empresa } from '../services/empresa';

@Component({
  selector: 'app-crear-acta',
  templateUrl: './crear-acta.component.html',
  styleUrls: ['./crear-acta.component.css']
})
export class CrearActaComponent implements OnInit {

  docentes : Docente[];
  docentePPP: any;

  actareunion: any;

  empleados : Empleado[];
  empleadoPPP: any;

  alumnos : Alumno[];
  alumnoPPP: any;

  d:String;
  formActa: FormGroup;
  formActividades: FormGroup;

  hinicio:Date ;
  hfinal:Date ;

  actividades:any[];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private docenteservice: DocenteService,
    private empleadoservice: EmpleadoService,
    private alumnoservice: AlumnosService,
  ){ }

  ngOnInit(): void {
   
    this.empleadoPPP = new Empleado();
    
    this.docentePPP = new Docente();
    this.formActa = this.formBuilder.group({
      fecha: ['', Validators.required],
      docente: ['', Validators.required],
      empleado: ['', Validators.required],
      lugar: ['', Validators.required],
      est: ['', Validators.required],
      finicio: ['', Validators.required],
      ffinal: ['', Validators.required],
      hinicio: ['', Validators.required],
      hfinal: ['', Validators.required],
      horas: ['', Validators.required],
      extra: [''],
    });
    this.listaDocentes();
    this.listaEmpresas();
    
    this.listaAlumnos();
  }

  OnChange(ev) {
    if (ev.value == null) {}else{
      this.d = ev.value.name;
      this.docentePPP = ev.value;
    }
  }
  OnChangeEmp(ev) {
    if (ev.value == null) {}else{
      this.d = ev.value.name;
      this.empleadoPPP = ev.value;
      this.formActa.value.empresa = ev.nombre_empresa;
    }
  }
  OnChangeEst(ev) {
    if (ev.value == null) {}else{
      this.d = ev.value.name;
      this.alumnoPPP = ev.value;
    }
  }

  listaDocentes(){
    this.docenteservice.getDocentes().subscribe((resp: any)=>{
      console.log(resp.data)
      this.docentes = resp.data;
      this.docentePPP = this.docentes[0];
    }
    )
  }

  listaEmpresas(){
    this.empleadoservice.getEmpleados().subscribe((resp: any)=>{
      console.log(resp.data)
      this.empleados = resp.data
      this.empleadoPPP = this.empleados[0];
    }
    )
  }

  listaAlumnos(){
    this.alumnoservice.getAlumnos().then((resp: any)=>{
      console.log(resp.data)
      this.alumnos = resp.data
      this.alumnoPPP = this.alumnos[0];
    }
    )
  }

}
