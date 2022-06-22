import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InformeFinalAlumnoService } from '../services/informe-finalizacion-alumo.services';
import { AlumnosService } from '../services/alumnos.service';
import { SolicitudAlumnoService } from '../services/solicitud-alumno.service';
import { TutorEmpresarialService } from '../services/tutor-empresarial.service';
import { Observable } from 'rxjs';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-info-seguimiento',
  templateUrl: './informe-finalizacion-alumo.components.html',
  styleUrls: ['./informe-finalizacion-alumno.components.css']

})
export class InformeFinalAlumnoComponent implements OnInit {
  //Variables
  public informeFinal: Array<any> = [];
  public alumnosDatos: Array<any> = [];
  public solicitudAlumnosDatos: Array<any> = [];
  public TutorEmpresarialDatos: Array<any> = [];


  public base64Output: string;
  public cedula: String;


  //constructor y OnInit
  constructor(
    private router: Router, private route: ActivatedRoute,
    private informeFinalAlumnoService: InformeFinalAlumnoService,
    private alumnoService: AlumnosService,
    private solicitudAlumnoService: SolicitudAlumnoService,
    private tutorEmpresarialService: TutorEmpresarialService
  ) { }


  ngOnInit(): void {
    this.cedula = this.route.snapshot.paramMap.get('cedula');
    this.listarInformeFinal();
    this.listarDetalladaAlumnos();
    this.listarSolicitudAlumnos();
    this.listarTutorEmpresarial();
  }


  //Métodos de listar
  public listarInformeFinal() {
    this.informeFinalAlumnoService.getInformeFinalAlumno().subscribe((resp: any) => {
      console.log(resp.data)
      this.informeFinal = resp.data
    })
  }

  public listarDetalladaAlumnos() {
    this.alumnoService.getDetalleAlumnos().subscribe((resp: any) => {
      console.log(resp.data)
      this.alumnosDatos = resp.data
    })
  }

  listarSolicitudAlumnos() {
    this.solicitudAlumnoService.getSolicitudAlumno().subscribe((resp: any) => {
      console.log(resp.data)
      this.solicitudAlumnosDatos = resp.data
    }
    )
  }

  listarTutorEmpresarial() {
    this.tutorEmpresarialService.getTutorEmpresarial().subscribe((resp: any) => {
      console.log(resp.data)
      this.TutorEmpresarialDatos = resp.data
    }
    )
  }


  //M+etodo para subir documento en base 64
  onFileSelected(event) {
    this.convertFile(event.target.files[0]).subscribe(base64 => {
      this.base64Output = base64;
    });
  }

  convertFile(file: File): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => result.next(btoa(event.target.result.toString()));
    console.log(result)
    return result;
  }

}
