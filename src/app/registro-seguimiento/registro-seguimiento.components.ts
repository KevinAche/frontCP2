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


function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}
function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
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
  base64Output : string;
  formCronograma: FormGroup;
  public cedulaAlumno: any;
 
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
  checkForMIMEType() {
    var response = this.estudiante['doc_asignacion'];
    console.log(response)
    var blob;
    if (response.mimetype == 'pdf') {
      
      blob = this.converBase64toBlob(response.content, 'application/pdf');
    } else if (response.mimetype == 'doc') {
      blob = this.converBase64toBlob(response.content, 'application/msword'); 
        }

    /* application/vnd.openxmlformats-officedocument.wordprocessingml.document */  

    blob = this.converBase64toBlob(response, 'application/pdf');
    var blobURL = URL.createObjectURL(blob);
    window.open(blobURL);
  }
  converBase64toBlob(content, contentType) {
    contentType = contentType || '';
    var sliceSize = 512;
    var byteCharacters = window.atob(content); //method which converts base64 to binary
    var byteArrays = [
    ];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, {
      type: contentType
    }); //statement which creates the blob
    return blob;
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