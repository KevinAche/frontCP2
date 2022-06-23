import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistroSeguimientoService } from '../services/registro-seguimiento.service'
import { AlumnosService } from '../services/alumnos.service';
import { TutorE } from '../models/TutorE';
import { left } from '@popperjs/core';
import { TutorA } from '../models/TutorA';
import { TutorAService } from '../services/tutorA.service';
import { ActividadesCronograma } from '../models/ActividadesCronograma';

@Component({
  selector: 'app-info-reg-seguimiento',
  templateUrl: './registro-seguimiento.components.html',
  styleUrls: ['./registro-seguimiento.component.css']

})
export class RegistroSeguimientoAlumnoComponent implements OnInit {
  public ListaActividadesCronograma: Array<any> = [];
  public ListaAlumnos: Array<any> = [];
  public Listatutoresem: Array<any> = [];
  public Listatutoresac: Array<any> = [];
  tutore: TutorE = new TutorE();
  estudiante: any;
  tutoracademico: any;
  tutora: TutorA = new TutorA();
  cronograma: ActividadesCronograma = new ActividadesCronograma();


  public cedulaAlumno: any;
  formValidacion: FormGroup;
  constructor(
    private router: Router, private route: ActivatedRoute,
    private registroSeguimientoService: RegistroSeguimientoService,
    private alumnosService: AlumnosService,
    private formBuilder: FormBuilder,
    private tutorService: TutorAService,
  ) { }

  ngOnInit(): void {
    this.Listatutorese();

  }

  ListaActividades_Cronograma(cedula: any) {
    console.log(cedula);

    this.registroSeguimientoService.getActividades_Cronograma().then(registro => {
      this.ListaActividadesCronograma = registro['data'];
      this.ListaActividadesCronograma = this.ListaActividadesCronograma.filter(lc => lc.cronograma.tutorAcademico.alumno.persona.cedula
        == cedula);
      console.log(this.ListaActividadesCronograma);
      console.log(registro);

    });


  }


  buscarestudiante($event: any) {

    this.tutore = new TutorE();
    this.tutora = new TutorA();
    this.estudiante = this.tutore.alumno.persona.primerNombre;
    this.tutoracademico = null;
    if ($event.target.value.length == 10) {
      for (let t of this.Listatutoresem) {
        if (t.alumno.persona.cedula == $event.target.value) {
          this.tutore = t;
          this.estudiante = this.tutore.alumno.persona.primerNombre + " " + this.tutore.alumno.persona.primerApellido;
        }
      }

   
      this.tutorService.getTutoresAcademicos().then(value => {
        this.Listatutoresac = value['data'];
        for (let a of this.Listatutoresac) {
          if (a.alumno.persona.cedula == $event.target.value) {
            this.tutora = a;
            this.tutoracademico = this.tutora.docente.persona.primerNombre + " " + this.tutora.docente.persona.primerApellido;
            
          }
        }
        this.ListaActividades_Cronograma(this.tutora.alumno.persona.cedula);
      })

    
    }

  }

  Listatutorese() {
    this.registroSeguimientoService.getTutoresE().subscribe(value => {
      this.Listatutoresem = value['data'];
      console.log(this.Listatutoresem);
    }
    )

  }
  CrearRegistro() {
    console.log(this.cronograma);

  }

}

