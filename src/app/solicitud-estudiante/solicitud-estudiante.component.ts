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
import { saveAs } from "file-saver";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import Docxtemplater from "docxtemplater";
import { Observable } from 'rxjs';
import { ReplaySubject } from 'rxjs';
import { title } from 'process';

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}

@Component({
  selector: 'app-solicitud-estudiante',
  templateUrl: './solicitud-estudiante.component.html',
  styleUrls: ['./solicitud-estudiante.component.css']
})
export class SolicitudEstudianteComponent implements OnInit {
  public convocatorias: Array<any> = [];
  public alumnos: Array<any> = [];
  public alumnosDatos: Array<any> = [];
  public solicitudes: Array<any> = [];
  public numConvocatoria: any;
  solicitud: SolicitudAlumno = new SolicitudAlumno();
  public id: String;
  public cedula: String;
  public rol: String;
  public empresaNombre: any;
  public responsableNombre: any;
  dialogoCrearSolicitud: boolean;
  dialogoMisSolicitudes: boolean;
  base64Output: string;
  panelOpen = false;
  empresa: Empresa = new Empresa();
  solicitudAlumno: SolicitudAlumno = new SolicitudAlumno();
  formSolicitud: FormGroup;

  constructor(private convocatoriaService: ConvocatoriaService,
    private router: Router, private route: ActivatedRoute,
    private alumnoService: AlumnosService,
    private solicitudAlumnoService: SolicitudAlumnoService,
    private empresaService: EmpresaService,
    private formBuilder: FormBuilder,
  ) {

  }


  ngOnInit(): void {
    this.listarConvocatorias();
    this.listarAlumnos();
    this.listarSolicitudAlumnos();
    this.listarDetalladaAlumnos();
    //this.id = this.route.snapshot.paramMap.get('id');
    this.cedula = this.route.snapshot.paramMap.get('cedula');
    this.rol = this.route.snapshot.paramMap.get('rol');

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

  public listarDetalladaAlumnos() {
    this.alumnoService.getDetalleAlumnos().subscribe((resp: any) => {
      console.log(resp.data)
      this.alumnosDatos = resp.data
    })
  }

  crearSolicitud(valor: any, ide: any, nomEmp: any, respo: any) {


    for (var i = 0; i < this.solicitudes.length; i++) {


      if (this.solicitudes[i].alumno.idAlumno == ide) {
        if (this.solicitudes[i].estado == "Aceptado") {


          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ya tienes una solicitud aceptada!',

          })
          this.dialogoCrearSolicitud = false;
          break;

        } else {
          if (this.solicitud[i] == null) {
            this.abrirDialogo(valor, ide, nomEmp, respo);

          }

        }
      } else {
        this.abrirDialogo(valor, ide, nomEmp, respo);

      }

    }






  }

  abrirDialogo(valor: any, ide: any, nomEmp: any, respo: any) {
    this.dialogoCrearSolicitud = true;
    this.numConvocatoria = valor;
    this.solicitudAlumno.estado = "pendiente";
    this.solicitudAlumno.convocatoria.idConvocatoria = valor;
    this.solicitudAlumno.alumno.idAlumno = ide;
    this.id = ide;
    this.empresaNombre = nomEmp;
    this.responsableNombre = respo;
  }

  misSolicitudes(va: any) {
    this.dialogoMisSolicitudes = true;
    this.id = va;
  }



  public create(): void {
    var docubas = this.base64Output;

    if (this.formSolicitud.invalid || docubas == "undefined") {
      swal.fire(
        'Error de entrada',
        'Revise que los campos no esten vacios',
        'error'
      )
      return;
    }


    this.solicitudAlumno.documentoSoliEstudiante = docubas;

    this.solicitudAlumnoService.createSolicitudAlumno(this.solicitudAlumno).subscribe(
      Response => {
        swal.fire(
          'Enviado',
          `Solicitud creada con exito!`,
          'success'
        )
        this.limpiar();
        this.listarSolicitudAlumnos();
      }
    )



  }

  //Generar documento
  generate(nom: any, ced: any, par: any, cic: any, corr: any, cell: any, hor, fec, carr, sig, conv,) {
    var empn = this.empresaNombre;
    var res = this.responsableNombre;
    if (this.formSolicitud.invalid) {
      swal.fire(
        'Error de entrada',
        'Revise que los campos no esten vacios',
        'error'
      )
      return;
    }
    loadFile("https://backendg1c2.herokuapp.com/files/anexo3.docx", function (
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
        datoCedula: ced,
        datoParalelo: par,
        datoCiclo: cic,
        correoAlumno: corr,
        celularAlumno: cell,
        datoHoras: hor,
        fecha: fec,
        nombreCarrera: carr,
        sigla: sig,
        numeroConvocatoria: conv,
        nombreEmpresa: empn,
        periodoAcademico: "Mayo 2022 - Diciembre 2022",
        nombreResponsablePracticas: res,
        titulo:"LIC",
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
      saveAs(out, "anexo3.docx");
    });
  }




  //Convertir a base 64 un documento

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
    return result;
  }


  //LimpiarCampos

  limpiar() {
    this.solicitudAlumno.fechaEmision = null;
    this.solicitudAlumno.horasPPP = null;
    this.solicitudAlumno.documentoSoliEstudiante = "undefined";
  }

  //LISTAR SOLICITUDES
  listarSolicitudAlumnos() {
    this.solicitudAlumnoService.getSolicitudAlumno().subscribe((resp: any) => {
      console.log(resp.data)
      this.solicitudes = resp.data
    }
    )
  }

}
