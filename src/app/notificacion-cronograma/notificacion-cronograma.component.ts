import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmptyError, Observable, ReplaySubject } from 'rxjs';
import Swal from 'sweetalert2';
import { ActaReunionComponent } from '../acta-reunion/acta-reunion.component';
import { ActaReunion } from '../models/ActaReunion';
import { Actividades } from '../models/actividades';
import { ActividadesAReunion } from '../models/ActividadesAReunion';
import { ActividadesCronograma } from '../models/ActividadesCronograma';
import { Alumno } from '../models/Alumno';
import { Asignatura } from '../models/Asignatura';
import { Convenio } from '../models/Convenio';
import { Docente } from '../models/Docente';
import { Empleado } from '../models/Empleado';
import { ActaReunionService } from '../services/actaReunion.service';
import { AlumnosService } from '../services/alumnos.service';
import { DocenteService } from '../services/docente.service';
import { Empresa } from '../services/empresa';
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import {saveAs} from "file-saver";
import Docxtemplater from "docxtemplater";
import { TableModule } from 'primeng/table';
import { TutorA } from '../models/TutorA';
import { TutorAService } from '../services/tutorA.service';
import { EmpresaService } from '../services/empresa.service';

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}

@Component({
  selector: 'app-notificacion-cronograma',
  templateUrl: './notificacion-cronograma.component.html',
  styleUrls: ['./notificacion-cronograma.component.css']
})
export class NotificacionCronogramaComponent implements OnInit {

  docentes : Docente[];
  docentePPP: any;

  empresas : Empresa[];
  empresaPPP: any;

  alumnos : Alumno[];
  alumnoPPP: any;

  d:String;
  formActa: FormGroup;

  hinicio:Date ;
  hfinal:Date ;

  tutorA: Docente[];
  tutor : TutorA;
  tutord: any;

  actividadselec: Actividades;

  objetoSolicitud: any;
  solicitud: any;
  base64Output: string;

  ObjetoResponsable: any;
  uploadedFiles: any[]=[];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private docenteservice: DocenteService,
    private alumnoservice: AlumnosService,
    private actareunionservice: ActaReunionService,
    private empresaservice: EmpresaService,
    private tutorAservicie: TutorAService

  ){ }

  ngOnInit(): void {
    
    this.docentePPP = new Docente();
    this.alumnoPPP = new Alumno();
    this.tutor = new TutorA();
    this.tutord = new Docente();
    this.empresaPPP = new Empresa();
    this.formActa = this.formBuilder.group({
      fecha: ['', Validators.required],
      docente: ['', Validators.required],
      tutor: ['', Validators.required],
      alumno: ['', Validators.required],
      empresa: ['', Validators.required]
    });

    
    this.listaDocentes();
    this.listaEmpresas();
    this.listaTutoresAcademicos();
    this.listaAlumnos();
  }

  OnChangeReponsable(ev) {
    if (ev.value == null) {}else{
      this.d = ev.value.name;
      this.docentePPP = ev.value;
      this.tutor.docente = this.docentePPP;
    }

  }
  OnChangeEmpresa(ev) {
    if (ev.value == null) {}else{
      this.d = ev.value.name;
      this.empresaPPP = ev.value;
    }
  }

  OnChangeTutorA(ev) {
    if (ev.value == null) {}else{
      this.d = ev.value.name;
      this.tutord = ev.value;
    }
  }

  OnChangeAlumno(ev) {
    if (ev.value == null) {}else{
      this.d = ev.value.name;
      this.alumnoPPP = ev.value;
    }
    this.alumnoservice.getAlumnoByCedula(this.alumnoPPP.cedula).subscribe((resp: any)=>{
      console.log(resp.data[0])
      this.tutor.alumno = resp.data[0];
    });
  }

  listaDocentes(){
    this.docenteservice.getDocentes().subscribe((resp: any)=>{
      console.log(resp.data)
      this.docentes = resp.data;
      this.docentePPP = this.docentes[0];
    }
    )
  }

  listaEmpresas(){
    this.empresaservice.getEmpresasNotificacion().subscribe((resp: any)=>{
      console.log(resp.data)
      this.empresas = resp.data
      this.empresaPPP= resp.data[0];
    }
    )
  }

  listaAlumnos(){
    this.alumnoservice.getAlumnos().then((resp: any)=>{
      console.log(resp.data)
      this.alumnos = resp.data
      this.alumnoPPP = this.alumnos[0];
    }
    )
  }

  listaTutoresAcademicos(){
    this.docenteservice.getDocentes().subscribe((resp: any)=>{
      console.log(resp.data)
      this.tutorA = resp.data;
      this.tutorA = resp.data[0];
    }
    )
  }

  public GenerarNotificacion():void{
    if (this.formActa.invalid) {
      Swal.fire(
        'Campos incompletos',
        'Revise que los campos anteriores no esten vacios',
        'error'
      )
      return;
    }
    this.tutorAservicie.createTutor(this.docentePPP.cedula, this.alumnoPPP.cedula, this.tutor).subscribe(
      Response => {
        
      }
    )
    var fecha=""+ this.formActa.get('fecha').value;
    var abrevR= this.tutord.abrev_titulo;
    var responsable= this.docentePPP.primer_nombre+" "+this.docentePPP.segundo_nombre+" "+this.docentePPP.primer_apellido+" "+this.docentePPP.segundo_apellido;
    var tutor= this.tutord.primer_nombre+" "+this.tutord.segundo_nombre+" "+this.tutord.primer_apellido+" "+this.tutord.segundo_apellido;
    var empresa=this.empresaPPP.nombreEmpresa;
    var alumno=this.alumnoPPP.primer_nombre+" "+this.alumnoPPP.segundo_nombre+" "+this.alumnoPPP.primer_apellido+" "+this.alumnoPPP.segundo_apellido;
    var carrera = this.docentePPP.carrera;    
    this.generardocumento(fecha,abrevR,responsable,tutor,empresa,alumno,carrera);
    //window.location.reload();
  }
  

  generardocumento(fecha:String,abrevR :String,responsable:String, tutor:String, empresa:String, alumno :String, carrera:String) {
    loadFile("https://backendg1c2.herokuapp.com/files/anexo8-1.docx", function(
      error,
      content
    ) {
      if (error) {
        throw error;
      }
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true});
      doc.setData({
        fecha: fecha,
        abrevR: abrevR,
        responsable: responsable,
        tutor: tutor,
        empresa:empresa,
        alumno: alumno,
        carrera: carrera
        
      });
      try {
        doc.render();
      } catch (error) {
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
      saveAs(out, "anexo8" +fecha+alumno+".docx");
      
    });
  }

  // Subir archivos a la base de datos

  checkForMIMEType() {
    var response = this.ObjetoResponsable['pdf_solicitud'];
    //console.log(response)
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
    var byteArrays = [];
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


  dataURLtoFile(dataurl: any, filename: any) {
    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
  }

  onFileSelected(event) {
    this.convertFile(event.files['0']).subscribe(base64 => {
      this.base64Output = base64;
      this.solicitud = {
        pdfSolicitud: this.base64Output
      };
      Swal.fire(
        "Archivo cargado","Archivo cargado con exito","success"
      )
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
