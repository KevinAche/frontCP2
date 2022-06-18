import { Component, OnInit } from '@angular/core';
import { ConvocatoriaService } from '../services/convocatoria.service';
import { AlumnosService } from '../services/alumnos.service';
import { SolicitudAlumnoService } from '../services/solicitud-alumno.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SolicitudAlumno } from '../models/SolicitudAlumno';
import swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpresaService } from '../services/empresa.service';
import { Empresa } from '../services/empresa';

@Component({
  selector: 'app-solicitud-estudiante',
  templateUrl: './solicitud-estudiante.component.html',
  styleUrls: ['./solicitud-estudiante.component.css']
})
export class SolicitudEstudianteComponent implements OnInit {
  public convocatorias: Array<any> = [];
  public alumnos: Array<any> = [];
  public numConvocatoria: any;
  solicitud: SolicitudAlumno = new SolicitudAlumno();
  id: String;
  dialogoCrearSolicitud: boolean;
  panelOpen = false;

  empresa: Empresa = new Empresa();
  solicitudAlumno: SolicitudAlumno=new SolicitudAlumno();
  formSolicitud: FormGroup;

  constructor(private convocatoriaService: ConvocatoriaService,
    private router: Router, private route: ActivatedRoute,
    private alumnoService: AlumnosService,
    private solicitudAlumnoService: SolicitudAlumnoService,
    private empresaService:EmpresaService,
    private formBuilder: FormBuilder,
  ) {

  }


  ngOnInit(): void {
    this.listarConvocatorias();
    this.listarAlumnos();
    this.id = this.route.snapshot.paramMap.get('id');

    this.formSolicitud = this.formBuilder.group({
      fechaEmision: ['', Validators.required],
      estado: ['', Validators.required],
      idConvocatoria: ['', Validators.required],
      idAlumno: ['', Validators.required],
      horasPPP: ['', Validators.required],
    });
  }

  public listarConvocatorias() {
    this.convocatoriaService.getConvocatoria().subscribe((resp: any) => {
      console.log(resp.data)
      this.convocatorias = resp.data
    })
  }

  public listarAlumnos() {
    this.alumnoService.getlistaAlumnos().subscribe((resp: any) => {
      console.log(resp.data)
      this.alumnos = resp.data
    })
  }

  crearSolicitud(valor: any) {
    this.dialogoCrearSolicitud = true;
    this.numConvocatoria = valor;
  }


  public create(): void {
    if (this.formSolicitud.invalid) {
      swal.fire(
        'Error de entrada',
        'Revise que los campos no esten vacios',
        'error'
      )
      return;
    }


    this.solicitudAlumnoService.createSolicitudAlumno(this.solicitudAlumno).subscribe(
      Response => {
        swal.fire(
          'Empresa Guardada',
          `Empresa ${this.solicitudAlumno.horasPPP} creada con exito!`,
          'success'
        )
      }
    )

  }


}
