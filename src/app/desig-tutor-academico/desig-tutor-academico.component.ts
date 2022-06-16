import { Component, OnInit,Inject } from '@angular/core';
import { AlumnosService } from 'src/app/services/alumnos.service';
import {FormBuilder, FormGroup} from "@angular/forms";
import {DocenteService} from "../services/docente.service";
import {ConfirmationService,LazyLoadEvent,MessageService} from "primeng/api";
import {TutorAService} from "../services/tutorA.service";

@Component({
  selector: 'app-desig-tutor-academico',
  templateUrl: './desig-tutor-academico.component.html',
  styleUrls: ['./desig-tutor-academico.component.css'],
})
export class DesigTutorAcademicoComponent implements OnInit {


  constructor(private _alumnoCrud: AlumnosService,
              private  _formBuilder: FormBuilder,
              private _docenteCrud: DocenteService,
              private _tutorACrud: TutorAService,
              private _messageService: MessageService) {
  }

  //DATAS PARA RECIBIR DATOS
  dataDocentes: any[];
  dataRowAlumno:any;
  dataAlumnos: any[] ;
  dataRowDocente: any;
  ObjetoAlumno: any;

  //COLUMNAS DE TABLAS
  columnasEstudiantes: any[];
  conlumnasDocentes: any[];

  //DIALOGOS Y FORMS PARA HACER VISIBLES DIALOGOS Y CONTROLAR INGRESO DE DATOS
  dialogoAsignar: boolean;
  formTutor: FormGroup;




  ngOnInit(): void {
    this.columnasEstudiantes=[
      {field:'cedula',header:'Cedula'},
      {field:'primer_nombre',header:'Primer nombre'},
      {field:'segundo_nombre',header:'Segundo Nombre'},
      {field:'primer_apellido',header:'Primer apellido'},
      {field:'segundo_apellido',header:'Segundo Apellido'},
      {field:'correo',header:'Correo'},
      {field:'carrera',header:'Carrera'},
      {field:'ciclo',header:'Ciclo'},
      {field:'paralelo',header:'Paralelo'},
      {field:'promedio',header:'Promedio'},
      {field:'aginarta',header:'Asignar tutor'}
    ];

    this.conlumnasDocentes=[
      {field:'cedula',header:'Cedula'},
      {field:'abrev_titulo',header:'Abrv. Titulo'},
      {field:'titulo',header:'Titulo'},
      {field:'primer_nombre',header:'Primer nombre'},
      {field:'segundo_nombre',header:'Segundo Nombre'},
      {field:'primer_apellido',header:'Primer apellido'},
      {field:'segundo_apellido',header:'Segundo Apellido'},
      {field:'correo',header:'Correo'},
      {field:'designarC',header:'Designar como tutor'}
    ];

    this.obtenerAlumnos();
  }

  obtenerAlumnos():void{
      this._alumnoCrud.getAlumnos().then(value => {
        this.dataAlumnos = value['data'];
        this.mostarMensajeCorrecto("Lista de alumnos generada exitosamente");
      })
        .catch(((err)=>{
          this.mostrarMensajeError("Problema en listado de estudiantes");
        })
      );
  }

  asignarTutor(){
   // this.dialogoAsginar.open(Dialog);
    this.dialogoAsignar=true;
    this.obtenerDocentes();
  }


  designarDocente(){
    console.log('DOCENTE DESIGNADO COMO TUTOR ACADEMICO')
    if(this.dataRowAlumno!=null){
      if(this.dataRowDocente!=null){
        let docenteG: any;
        let alumnoG: any;
        this._docenteCrud.getDocenteCedula(this.dataRowDocente['cedula']).then(value => {
          docenteG= value['data'];
        });
        this._alumnoCrud.getAlumnoCedula(this.dataRowAlumno['cedula']).then(value => {
          alumnoG=value['data'];
        });
        let tutor: any={
          docAsignacion:"doc de oruvea32342"
        };
        this._tutorACrud.createTutorAcademico(this.dataRowDocente['cedula'],this.dataRowAlumno['cedula'],tutor).then(value => {
          this.mostarMensajeCorrecto(value['mensaje']);
          this.dialogoAsignar
        }).
        catch((err)=>{
          this.mostrarMensajeError("No se pudo designar tutor")
        });
      }else{
        this.mostrarMensajeError('El docente no ha sido clickeado')
      }
    }else{
      this.mostrarMensajeError('El alumno no ha sido clickeado');
    }
  }





  obtenerDocentes():void{
    this._docenteCrud.getDocentes().then(value => {
      this.dataDocentes=value['data'];
      this.mostarMensajeCorrecto('Lista de docentes generada');
    })
  }


  lazyLoad(event: LazyLoadEvent):void{
    setTimeout(()=>{
      this.obtenerAlumnos();
    },0);
  }


  mostrarMensajeError(mensaje: String):void{
    this._messageService.add({
      severity:'error',
      summary:'Error',
      detail:'Incorrecto: '+mensaje,
      life:3000,
    });
  }


  mostarMensajeCorrecto(mensaje: String):void{
    this._messageService.add({
      severity:'success',
      summary:'Hecho',
      detail:'Correcto: '+mensaje,
      life:3000,
    });
  }


  onRowSelectDocente(event): void{
    if(event.data){
      this.dataRowDocente=event.data;
    }
  }


  onRowUnSelectDocente(event): void{
    if(event.data){
      this.dataRowDocente=null;
    }
  }


  onRowSelectAlumno(event): void{
     this.ObjetoAlumno=null;
    if(event.data){
      this.dataRowAlumno=event.data;
      this.ObjetoAlumno={...this.dataRowAlumno};
      console.log(this.ObjetoAlumno);
    }
  }


  onRowUnSelectAlumno(event): void{
    if(event.data){
      this.dataRowAlumno=null;
    }
  }
}
