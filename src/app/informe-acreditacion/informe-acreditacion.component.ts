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

  public titulo="INFORME DE ACREDITACION";
  public convocatoriaTitulo="CONVOCATORIAS"
  public listaTitulo ="LISTA DE ESTUDIANTES ACREDITADOS"
  public convocatorias: Array<any>=[];
  public solicitudes: Array<any>=[];
  opcionSeleccionado: string  = '0';
  verSeleccion: string        = '';

  constructor( private convocatoriaService: ConvocatoriaService,private solicitudesalumnoservice : SolicitudAlumnoService) {
    this.verSeleccion="Seleccione una convocatoria";
     }

  ngOnInit(): void {
    this.listarDatos();
    this.listarSolicitudAlumnos();
  }

  public listarDatos(){
    this.convocatoriaService.getConvocatoria().subscribe((resp: any)=>{
      console.log(resp.data)
      this.convocatorias = resp.data
      })
  }

  listarSolicitudAlumnos(){
    this.solicitudesalumnoservice.getSolicitudAlumno().subscribe((resp: any)=>{
      console.log(resp.data)
      this.solicitudes = resp.data
    }
    )
  }

  capturarConvocatoria() {
    this.verSeleccion = this.opcionSeleccionado;
}
//Generar documento

  generate(nomb:any,cedu:any,hora,fech) {
    loadFile("https://backendg1c2.herokuapp.com/files/Informe-Acreditacion.docx", function(
      error,
      content
    ) {
      if (error) {
        throw error;
      }
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
      doc.setData({
        nombre-estudiante: nomb,
        cedula:cedu,
        horas:hora,
        fecha:fech,
        nombreResponsablePracticas:res,
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
      saveAs(out, "Informe-Acreditacion.docx");
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
  }

}
