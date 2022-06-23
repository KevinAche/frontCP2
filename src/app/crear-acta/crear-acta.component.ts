import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmptyError } from 'rxjs';
import Swal from 'sweetalert2';
import { ActaReunionComponent } from '../acta-reunion/acta-reunion.component';
import { ActaReunion } from '../models/ActaReunion';
import { Actividades } from '../models/actividades';
import { ActividadesAReunion } from '../models/ActividadesAReunion';
import { ActividadesCronograma } from '../models/ActividadesCronograma';
import { Alumno } from '../models/Alumno';
import { Asignatura } from '../models/Asignatura';
import { Convenio } from '../models/Convenio';
import { Docente } from '../models/Docente';
import { Empleado } from '../models/Empleado';
import { ActaReunionService } from '../services/actaReunion.service';
import { ActividadesCronogramaService } from '../services/actividades-cronograma.service';
import { ActividadesReunionService } from '../services/actividades-reunion.service';
import { ActividadesService } from '../services/actividades.service';
import { AlumnosService } from '../services/alumnos.service';
import { AsignaturasService } from '../services/asignatura.services';
import { ConvenioService } from '../services/convenio.service';
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

  actareunion: ActaReunion;
  actasreunion: ActaReunion [] = new Array();

  empleados : Empleado[];
  empleadoPPP: any;

  alumnos : Alumno[];
  alumnoPPP: any;

  d:String;
  formActa: FormGroup;
  formActividades: FormGroup;
  formActividadesReunion: FormGroup;

  actividad: Actividades;
  actividadReunion: ActividadesAReunion;


  hinicio:Date ;
  hfinal:Date ;

  actividades:Actividades[] = new Array();
  actividadesReunion : ActividadesAReunion[]= new Array();
  actividadesReunionFiltradas : ActividadesAReunion[] = new Array();
  actividadesFiltradas : Actividades[]= new Array();

  asignaturas : Asignatura[];
  asignatura : Asignatura;

  convenios: Convenio[];
  convenio : Convenio;

  actividadselec: Actividades;

  aux: number=0;
  aux2: number=0;

  dis:boolean;
  dis2:boolean;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private docenteservice: DocenteService,
    private empleadoservice: EmpleadoService,
    private alumnoservice: AlumnosService,
    private actareunionservice: ActaReunionService,
    private actividadesservices: ActividadesService,
    private actcronogramaservices: ActividadesReunionService,
    private asignaturaservice : AsignaturasService,
    private convenioservice : ConvenioService

  ){ }

  ngOnInit(): void {
    this.actividad = new Actividades();
    this.empleadoPPP = new Empleado();
    this.actareunion = new ActaReunion();
    this.docentePPP = new Docente();
    this.alumnoPPP = new Alumno();
    this.asignatura = new Asignatura();
    this.convenio = new Convenio();
    this.actividadReunion = new ActividadesAReunion();
    this.actividadselec = new Actividades();
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

    this.formActividades = this.formBuilder.group({
      descripcion: ['', Validators.required],
      area: ['', Validators.required],
      asignatura: ['', Validators.required],
    });

    this.formActividadesReunion= this.formBuilder.group({
      semanas: ['', Validators.required],
      horas: ['', Validators.required],
      actividad: ['', Validators.required],
      
    });
    this.listaDocentes();
    this.listaEmpresas();
    this.listaConvenio();
    this.listaAsignaturas();
    this.listaActividadesCronogramas();
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
  OnChangeAsi(ev) {
    if (ev.value == null) {}else{
      this.d = ev.value.name;
      this.asignatura = ev.value;
    }
  }
  OnChangeConv(ev) {
    if (ev.value == null) {}else{
      this.d = ev.value.name;
      this.convenio = ev.value;
    }
  }

  OnChangeActividad(ev) {
    if (ev.value == null) {}else{
      this.d = ev.value.name;
      this.actividadselec = ev.value;
    }

  }


  OnChangeEst(ev) {
    if (ev.value == null) {}else{
      this.d = ev.value.name;
      this.alumnoPPP = ev.value;
    }
    this.alumnoservice.getAlumnoByCedula(this.alumnoPPP.cedula).subscribe((resp: any)=>{
      console.log(resp.data[0])
      this.actareunion.alumno = resp.data[0];
    });
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



  listaActividadesCronogramas(){
    this.actcronogramaservices.getActividades().subscribe((resp: any)=>{
      console.log(resp.data)
      this.actividadesReunion = resp.data;
    }
    )
  }

  listaActividadesFiltradas(){
    this.actividadesFiltradas = [];
    this.actividadesservices.getActividades().subscribe((resp: any)=>{
      console.log(resp.data)
      for (let index = 0; index < resp.data.length; index++) {
        for (let j = 0; j < this.actividades.length; j++) {
          if (resp.data[index].convenio.idConvenio==this.actividades[j].convenio.idConvenio) {
            this.actividadesFiltradas.push(resp.data[index]);
            this.actividadselec = resp.data[index];
          }
        
        }
      }
    }
    )
  }

  listaActividadesReunionesFiltradas(){
    
    this.actividadesReunionFiltradas = [];
    this.actcronogramaservices.getActividades().subscribe((resp: any)=>{
      console.log(resp.data)
      for (let index = 0; index < resp.data.length; index++) {
        for (let j = 0; j < this.actividades.length; j++) {
          if (resp.data[index].actaDeReunion.idActaReunion==this.actareunion.idActaReunion ) {
            this.actividadesReunionFiltradas.push(resp.data[index]);
            
          }
        }
      }
    }
    )
  }

  listaAsignaturas(){
    this.asignaturaservice.getAsignaturas().subscribe((resp: any)=>{
      console.log(resp.data)
      this.asignaturas = resp.data;
      this.asignatura = resp.data[0];
    }
    )
  }

  listaConvenio(){
    this.convenioservice.getConvenios().subscribe((resp: any)=>{
      console.log(resp.data)
      this.convenios = resp.data;
      this.convenio = resp.data[0];
    }
    )
  }

  listaActaReunion(){
    this.actareunionservice.getActas().subscribe((resp: any)=>{
      console.log(resp.data)
      this.actasreunion = resp.data;
     for (let index = 0; index < resp.data.length; index++) {
        if (resp.data[index].docActaReunion == this.actareunion.docActaReunion) {
          this.actareunion=resp.data[index];
          return;
        }
      
     }
    }
    )
  }
  
  public ShowAgregarActividadReunion():void{
    this.createActa("reunion");
  }
  public ShowAgregarActividadCronograma():void{
    if(this.aux2>0){
      this.createActa("cronograma");
      this.listaActaReunion();
    }else{
      Swal.fire(
        'Actividades vacias',
        'Ingrese actividades para realizar el cronograma',
        'error'
      )
      return;
    }
    
  }

  public crearActividadCronograma(){
    this.listaActividadesCronogramas();
    this.actividadReunion.actaDeReunion = this.actareunion;
    this.actividadReunion.actividades = this.actividadselec;
    this.actividadReunion.numHoras= this.formActividadesReunion.get('horas').value;
    this.actividadReunion.numSemanas = this.formActividadesReunion.get('semanas').value;
    console.log(this.actividadReunion);
    this.actcronogramaservices.createActividades(this.actividadReunion).subscribe(
      Response => {
        Swal.fire(
          'Gurdado correctamente',
          'La actividad se a guardado correctamente en el cronograma',
          'success'
        )
        this.actividadesReunion.push(this.actividadReunion);
        this.listaActividadesReunionesFiltradas();
        this.dis2=false;

      }
    )

  }

  public GenerarActa():void{
    if (this.formActividades.invalid || this.formActa.invalid ||this.aux2 ==0) {
      Swal.fire(
        'Campos incompletos',
        'Revise que los campos anteriores no esten vacios',
        'error'
      )
      return;
    }
    window.location.reload();
  }

  public CrearActividad(): void {
    this.aux2++;
    if (this.formActividades.invalid) {
      Swal.fire(
        'Campos incompletos',
        'Revise que los campos anteriores no esten vacios',
        'error'
      )
      return;
    }
    this.actividad.asignatura = this.asignatura;
    this.actividad.convenio = this.convenio;
    console.log(this.actividad);
    this.actividadesservices.createActividades(this.actividad).subscribe(
      Response => {
          this.actividades.push(this.actividad);
          this.listaActividadesFiltradas();
          this.dis=false;
      }
    )
    
  }
  public createActa(diss:String): void {
    
    if (this.formActa.invalid) {
      Swal.fire(
        'Campos incompletos',
        'Revise que los campos anteriores no esten vacios',
        'error'
      )
      return;
    }

    if(this.aux==0){
      
      this.actareunion.horario = this.formActa.get('hinicio').value + " a "+this.formActa.get('hfinal').value;
      this.actareunion.docActaReunion="docmuento"+this.formActa.get('finicio').value;
      this.actareunion.respuestaEstudiante="Proceso";
      this.actareunion.notificacionTA="ActaReunionGenerada"+this.formActa.get('fecha').value;
      
      console.log(this.actareunion);
      this.actareunionservice.createActa(this.actareunion).subscribe(
        Response => {
          this.aux++;
          if(diss=="cronograma"){
            this.dis2=true;
          }else{
            this.dis=true;
          }
        }
      )
      
    }else{
      console.log('Ya esta creada la acta de reunion');
      if(diss=="cronograma"){
        this.dis2=true;
      }else{
        this.dis=true;
      }
    }
  }

}
