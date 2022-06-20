import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Alumno } from '../models/Alumno';
import { AlumnosService } from '../services/alumnos.service';
import { Empresa } from '../services/empresa';
import { EmpresaService } from '../services/empresa.service';

@Component({
  selector: 'app-consultas-reportes',
  templateUrl: './consultas-reportes.component.html',
  styleUrls: ['./consultas-reportes.component.css']
})
export class ConsultasReportesComponent implements OnInit {

  drop: ingresoDrop[];
  dropselect: ingresoDrop;
  tipo_d: String;

  colsalumnos: any[];

  constructor(
  ) {
  }

  ngOnInit(): void {
    this.drop = [{ name: 'Empresas' }, { name: 'Estudiantes' }, { name: 'Tutores' }];
    
    this.colsalumnos=[
      {field:'cedula',header:'Cedula'},
      {field:'primer_nombre',header:'Primer nombre'},
      {field:'segundo_nombre',header:'Segundo Nombre'},
      {field:'primer_apellido',header:'Primer apellido'},
      {field:'segundo_apellido',header:'Segundo Apellido'},
      {field:'correo',header:'Correo'},
      {field:'ciclo',header:'Ciclo'},
      {field:'paralelo',header:'Paralelo'},
      {field:'promedio',header:'Promedio'}

    ];

  }


  

}

interface ingresoDrop {
  name: string;
}