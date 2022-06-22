import { Component, OnInit } from '@angular/core';
import { ConvocatoriaService } from '../services/convocatoria.service';
import { SolicitudAlumnoService } from '../services/solicitud-alumno.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SolicitudAlumno } from '../models/SolicitudAlumno';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { saveAs } from "file-saver";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import Docxtemplater from "docxtemplater";
import { Observable } from 'rxjs';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-informe-acreditacion',
  templateUrl: './informe-acreditacion.component.html',
  styleUrls: ['./informe-acreditacion.component.css']
})
export class InformeAcreditacionComponent implements OnInit {

  public titulo = "INFORME DE ACREDITACION";
  public convocatoriaTitulo = "CONVOCATORIAS"
  public listaTitulo = "LISTA DE ESTUDIANTES ACREDITADOS"
  public convocatorias: Array<any> = [];
  public solicitudes: Array<any> = [];
  opcionSeleccionado: string = '0';
  verSeleccion: string = '';

  constructor(private convocatoriaService: ConvocatoriaService, private solicitudesalumnoservice: SolicitudAlumnoService) {
    this.verSeleccion = "Seleccione una convocatoria";
  }

  ngOnInit(): void {
    this.listarDatos();
    this.listarSolicitudAlumnos();
  }

  public listarDatos() {
    this.convocatoriaService.getConvocatoria().subscribe((resp: any) => {
      console.log(resp.data)
      this.convocatorias = resp.data
    })
  }

  listarSolicitudAlumnos() {
    this.solicitudesalumnoservice.getSolicitudAlumno().subscribe((resp: any) => {
        console.log(resp.data)
        this.solicitudes = resp.data
      }
    )
  }

  capturarConvocatoria() {
    this.verSeleccion = this.opcionSeleccionado;
  }

}
