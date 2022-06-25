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
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";
import { empty, Observable, ReplaySubject } from 'rxjs';
import { Empresa } from '../services/empresa';
import { TokenService } from '../services/token.service';
import { SolicitudAlumnoService } from '../services/solicitud-alumno.service';
import { RegistroAsistenciaService } from '../services/registro-asistencia.service';
import Swal from 'sweetalert2';
import { ActividadesDiariasService } from '../services/actividades-diarias.service';
import { CronogramaService } from '../services/cronograma.service';
import { ActividadesCronogramaService } from '../services/actividades-cronograma.service';


function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}
@Component({
  selector: 'app-info-reg-seguimiento',
  templateUrl: './registro-seguimiento.components.html',
  styleUrls: ['./registro-seguimiento.component.css']

})
export class RegistroSeguimientoAlumnoComponent implements OnInit {
  public ListaActividadesCronograma: any[] = new Array<any>();
  public Listatutoresac: Array<any> = [];

  estudiante: any;
  tutoracademico: any;
  tutora: TutorA = new TutorA();
  cronograma: any;
  base64Output : string;
  formCronograma: FormGroup;

  solicitudes: any[] = new Array<any>();
  registroAsistencia: any;
  actividadesDiarias: any[] = new Array<any>();
  actividadesCronograma: any[] = new Array<any>();


  public cedulaAlumno: any;
  formValidacion: FormGroup;
  constructor(
    private router: Router, private route: ActivatedRoute,
    private registroSeguimientoService: RegistroSeguimientoService,
    private alumnosService: AlumnosService,
    private formBuilder: FormBuilder,
    private tutorService: TutorAService,
    private tokenService: TokenService,
    private soliAlumnoService: SolicitudAlumnoService,
    private registroAsistenciaService: RegistroAsistenciaService,
    private cronogramaService: CronogramaService,
    private actCronoService: ActividadesCronogramaService
  ) { }

  ngOnInit(): void {
    this.getTutorAcademico();

  }

  buscarAlumno(alumno){
    this.soliAlumnoService.getSolicitudAlumno().subscribe(res=>{
       var listaSolicitudes:any[]=res['data'];
       listaSolicitudes.forEach(value=>{
        if(value.alumno.idAlumno == alumno.idAlumno){
          console.log(value.alumno)
          this.solicitudes.push(value)
        }
       })
    })
  }

  getTutorAcademico(){
    console.log("BUSCANDO TUTOR")
    
    this.tutorService.getTutoresAcademicos().then(res=>{
       this.Listatutoresac=res['data'];
       console.log(this.Listatutoresac)
       this.Listatutoresac.forEach(value=>{
          if(value.docente.persona.cedula == this.tokenService.getUserName()){
            this.tutoracademico=value;
            console.log(this.tutoracademico)
            this.buscarAlumno(value.alumno);
          }
       })
       console.log(this.solicitudes)
    })
  }

  getRegistroAsistencia(alumno){
    this.estudiante = alumno;
    this.ListaActividadesCronograma = new Array<any>();
    this.registroAsistenciaService.getRegistoAsistencialista().subscribe(res=>{
      var registroAsistenciaList: any[] = res['data'];
      registroAsistenciaList.forEach(value=>{
        if(value.alumno.idAlumno == alumno.idAlumno){
          var temporal = value;
          this.registroAsistencia = value;
          this.generarCronograma(alumno);
          if(temporal ==null){
            Swal.fire({
              icon: 'info',
              title: 'Este estudiante no tiene un registro de Asistencia'
            })
            this.registroAsistencia = null;
          }
        } 
      })
    })
  }

  generarCronograma(estudiante){
    var temporalCronograma: any;
    this.cronogramaService.getCronogramas().then(res=>{
      var cronogramasList: any [] = res['data'];
      cronogramasList.forEach(value=>{
        if(value.tutorAcademico.docente.idDocente == this.tutoracademico.docente.idDocente 
          && value.tutorAcademico.alumno.idAlumno == estudiante.idAlumno){
            temporalCronograma = value;
            this.cronograma = value;
            this.getActividadesCronograma(this.cronograma.idCronograma)
          }
      })

      if(temporalCronograma == null){
        this.cronograma = null;
        this.cronograma.tutorAcademico= this.tutoracademico;
        this.cronogramaService.createCronograma(this.cronograma).then(res=>{
          this.cronograma = res['data']
          console.log("SE GENERO UN CRONOGRAMA CON ID")
          console.log(this.cronograma.idCronograma)
          this.getActividadesCronograma(this.cronograma.idCronograma)
        })
      }

      

    })
  }

  getActividadesCronograma(idcronograma){
    this.actCronoService.getActividadesByCronograma(idcronograma).then(res=>{
      this.ListaActividadesCronograma = res['data']
    })
  }






 /* generate(nom:any,em:any,nt:any) {
    var est=this.estudiante;
    var tut=this.tutora;
    var te=this.tutore
    if (this.formCronograma.invalid) {
      lc.fire(
        'Error de entrada',
        'Revise que los campos no esten vacios',
        'error'
      )
      return;
    }
    loadFile("https://backendg1c2.herokuapp.com/files/anexo10.docx", function(
      error,
      content
    ) {
      if (error) {
        throw error;
      }
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
      doc.setData({
        nombreAlumno: nom,
        nombreEmpresa:em,
        nombreTutor:nt
      });
      try {
        // Se reemplaza en el documento: {rpp} -> John, {numestudiantes} -> Doe ....
        doc.render();
      } catch (error) {
        // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
        function replaceErrors(key, value) {
          if (value instanceof Error) {
            return Object.getOwnPropertyNames(value).reduce(function(
              error,
              key
            ) {
              error[key] = value[key];
              return error;
            },
            {});
          }
          return value;
        }
        console.log(JSON.stringify({ error: error }, replaceErrors));

        if (error.properties && error.properties.errors instanceof Array) {
          const errorMessages = error.properties.errors
            .map(function(error) {
              return error.properties.explanation;
            })
            .join("\n");
          console.log("errorMessages", errorMessages);

        }
        throw error;
      }
      const out = doc.getZip().generate({
        type: "blob",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      });
      // Output the document using Data-URI
      saveAs(out, "anexo3.docx");
    });
  }




  //Convertir a base 64 un documento

  onFileSelected(event) {
    this.convertFile(event.target.files[0]).subscribe(base64 => {
      this.base64Output = base64;

    });
  }

  convertFile(file : File) : Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => result.next(btoa(event.target.result.toString()));
    return result;
  }*/
  generate(nom,em,nt) {
    loadFile("https://backendg1c2.herokuapp.com/files/anexo10.docx", function(
      error,
      content
    ) {
      if (error) {
        throw error;
      }


  
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
      doc.setData({
        nombreAlumno: nom,
        nombreEmpresa: em,
        nombreTutor:nt
      });
      try {
        // Se reemplaza en el documento: {rpp} -> John, {numestudiantes} -> Doe ....
        doc.render();
      } catch (error) {
        // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
        function replaceErrors(key, value) {
          if (value instanceof Error) {
            return Object.getOwnPropertyNames(value).reduce(function(
              error,
              key
            ) {
              error[key] = value[key];
              return error;
            },
            {});
          }
          return value;
        }
        console.log(JSON.stringify({ error: error }, replaceErrors));

        if (error.properties && error.properties.errors instanceof Array) {
          const errorMessages = error.properties.errors
            .map(function(error) {
              return error.properties.explanation;
            })
            .join("\n");
          console.log("errorMessages", errorMessages);

        }
        throw error;
      }
      const out = doc.getZip().generate({
        type: "blob",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      });
      // Output the document using Data-URI
      saveAs(out, "anexo10.docx");
    });
  }

  //Subir un archivo a la base

  onFileSelected(event) {
    this.convertFile(event.target.files[0]).subscribe(base64 => {
      this.base64Output = base64;
    });
  }

  convertFile(file : File) : Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => result.next(btoa(event.target.result.toString()));
    return result;
  }
}