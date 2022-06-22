import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InformeFinalAlumnoService } from '../services/informe-finalizacion-alumo.services';
import { AlumnosService } from '../services/alumnos.service';
import { SolicitudAlumnoService } from '../services/solicitud-alumno.service';
import { TutorEmpresarialService } from '../services/tutor-empresarial.service';
import { TutorAService } from '../services/tutorA.service';
import { ActaReunionService } from '../services/acta-reunion.service';
import { Observable } from 'rxjs';
import { ReplaySubject } from 'rxjs';
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";
import Docxtemplater from "docxtemplater";


function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}

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
  public TutorAcademicoDatos: Array<any> = [];
  public ActaReunionDatos: Array<any> = [];


  public base64Output: string;
  public cedula: String;
  public areaEmpresa: String;


  //constructor y OnInit
  constructor(
    private router: Router, private route: ActivatedRoute,
    private informeFinalAlumnoService: InformeFinalAlumnoService,
    private alumnoService: AlumnosService,
    private solicitudAlumnoService: SolicitudAlumnoService,
    private tutorEmpresarialService: TutorEmpresarialService,
    private tutorAcademicoService: TutorAService,
    private actaReunionService: ActaReunionService
  ) { }


  ngOnInit(): void {
    this.cedula = this.route.snapshot.paramMap.get('cedula');
    this.areaEmpresa = 'Desarrollo';
    this.listarInformeFinal();
    this.listarDetalladaAlumnos();
    this.listarSolicitudAlumnos();
    this.listarTutorEmpresarial();
    this.listarTutorAcademico();
    this.listarActaReunion();
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

  listarTutorAcademico() {
    this.tutorAcademicoService.getTutorAcademico().subscribe((resp: any) => {
      console.log(resp.data)
      this.TutorAcademicoDatos = resp.data
    }
    )
  }

  listarActaReunion() {

    this.actaReunionService.getActaReunion().subscribe((resp: any) => {
      console.log(resp.data)
      this.ActaReunionDatos = resp.data
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


  //Metodo para generar documento

  generate(nomEm: any, ubiEm: any, areEm: any, nomte: any, cedte: any, carte: any, telem: any, corte: any, nomEs: any, cedEs: any, cicEs: any, corEst: any, corEs: any, nomtac: any, cedtac: any, cortac: any, horpp: any, fein: any, fefi: any, consEmp: any, misEmpr: any, visEmpr: any) {
    loadFile("https://backendg1c2.herokuapp.com/files/anexo13.docx", function (
      error,
      content
    ) {
      if (error) {
        throw error;
      }



      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
      doc.setData({

        nombreEmpresa: nomEm,
        ubicacionEmpresa: ubiEm,
        areaEmpresa: areEm,

        nombreTutorE: nomte,
        cedulaTutorE: cedte,
        cargoTutorE: carte,
        telefonoEmpresa: telem,
        correoTutorE: corte,

        nombreEstudiante: nomEs,
        cedulaEstudiante: cedEs,
        ciclo: cicEs,
        correoEstudiante: corEst,
        telefonoEstudiante: corEs,

        nombreTutorA: nomtac,
        cedulaTutorA: cedtac,
        correoTutorA: cortac,

        horasPPP: horpp,
        fechaInicio: fein,
        fechaFin: fefi,

        constitucionEmpresa: consEmp,
        misionEmpresa: misEmpr,
        visionEmpresa: visEmpr,


      });
      try {
        // Se reemplaza en el documento: {rpp} -> John, {numestudiantes} -> Doe ....
        doc.render();
      } catch (error) {
        // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
        function replaceErrors(key, value) {
          if (value instanceof Error) {
            return Object.getOwnPropertyNames(value).reduce(function (
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
            .map(function (error) {
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
      saveAs(out, "anexo13.docx");
    });
  }

}
