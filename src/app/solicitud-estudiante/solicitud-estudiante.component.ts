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
  public numConvocatoria: any;
  solicitud: SolicitudAlumno = new SolicitudAlumno();
  public id: String;
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

  crearSolicitud(valor: any,ide:any) {
    this.dialogoCrearSolicitud = true;
    this.numConvocatoria = valor;
    this.solicitudAlumno.estado="pendiente";
    this.solicitudAlumno.convocatoria.idConvocatoria=valor;
    this.solicitudAlumno.alumno.idAlumno=ide;
    
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

  generate(nom) {
    loadFile("http://localhost:8082/files/anexo3.docx", function(
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


}
