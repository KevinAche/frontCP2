import { Component, OnInit,Inject } from '@angular/core';
import { AlumnosService } from 'src/app/services/alumnos.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-desig-tutor-academico',
  templateUrl: './desig-tutor-academico.component.html',
  styleUrls: ['./desig-tutor-academico.component.css']
})
export class DesigTutorAcademicoComponent implements OnInit {


  constructor(private _alumnoCrud: AlumnosService, private  _formBuilder: FormBuilder) {
  }

  dataAlumnos: any[] ;
  columnasEstudiantes: any[];
  dialogoAsignar: boolean;
  headerDialogA: 'Asignar tutor academico';
  formTutor: FormGroup;

  ngOnInit(): void {
    this.columnasEstudiantes=[
      {field:'cedula',header:'Cedula'},
      {field:'primer_nombre',header:'Primer nombre'},
      {field:'segundo_nombre',header:'Segundo Nombre'},
      {field:'primer_apellido',header:'Primer apellido'},
      {field:'segundo_apellido',header:'Segundo Apellido'},
      {field:'correo',header:'Correo'},
      {field:'ciclo',header:'Ciclo'},
      {field:'paralelo',header:'Paralelo'},
      {field:'promedio',header:'Promedio'},
      {field:'aginarta',header:'Asignar tutor'}

    ];

    this.obtenerAlumnos();
  }

  obtenerAlumnos():void{
    this._alumnoCrud.getAlumnos().then(value => {
      this.dataAlumnos=value['data'];
      console.log(this.dataAlumnos)
    })
  }

  asignarTutor(){
   // this.dialogoAsginar.open(Dialog);
    this.dialogoAsignar=true;
  }

  crearFormularioTutorA(tutorA: any): void{
    if(tutorA){
      this.formTutor=this._formBuilder.group({
        //Alumno desigando
      });
    }
  }

}
