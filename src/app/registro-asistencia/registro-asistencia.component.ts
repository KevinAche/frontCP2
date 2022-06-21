import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ActividadesDiariasService } from '../services/actividades-diarias.service';
import { Anexo9Service } from '../services/anexo9.service';
import { RegistroAsistenciaService } from '../services/registro-asistencia.service';
import swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActividadesDiarias } from '../models/actividades-diarias';
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}

@Component({
  selector: 'app-registro-asistencia',
  templateUrl: './registro-asistencia.component.html',
  styleUrls: ['./registro-asistencia.component.css']
})



export class RegistroAsistenciaComponent implements OnInit {

  public listaActividades: Array<any> = [];
  public listaAnexo9Datos: Array<any> = [];
  public listaRegistroActividades: Array<any> = [];

  actividadesDiarias: ActividadesDiarias = new ActividadesDiarias();


  public dialogoMiRegistro: boolean;
  public contador = 0;
  public dis: boolean;
  public cedulaAlumno: any;
  formValidacion: FormGroup;



  showDialog(idRegiAsi: any) {
    this.dis = true;
    this.actividadesDiarias.registroA.idRegistroAsistencia = idRegiAsi;

  }


  constructor(
    private router: Router, private route: ActivatedRoute,
    private actividadesDiariasService: ActividadesDiariasService,
    private anexo9Service: Anexo9Service,
    private registroAsistenciaService: RegistroAsistenciaService,
    private formBuilder: FormBuilder,
  ) { }


  ngOnInit(): void {
    this.cedulaAlumno = this.route.snapshot.paramMap.get('cedula');
    this.listarActividades();
    this.listarAnexo9();
    this.listarregistroAsistencia();


    this.formValidacion = this.formBuilder.group({
      fecha: ['', Validators.required],
      numHoras: ['', Validators.required],
      horaLlegada: ['', Validators.required],
      horaSalida: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }



  //metodos de listar
  public listarActividades() {
    this.actividadesDiariasService.getInformeActividadesDiarias().subscribe((resp: any) => {
      console.log(resp.data)
      this.listaActividades = resp.data
    })
  }


  public listarAnexo9() {
    this.anexo9Service.getAnexo9lista().subscribe((resp: any) => {
      console.log(resp.data)
      this.listaAnexo9Datos = resp.data
    })
  }

  public listarregistroAsistencia() {
    this.registroAsistenciaService.getRegistoAsistencialista().subscribe((resp: any) => {
      console.log(resp.data)
      this.listaRegistroActividades = resp.data
    })
  }



  //Metodo de crear actividades

  public create(): void {

    if (this.formValidacion.invalid) {
      swal.fire(
        'Error de entrada',
        'Revise que los campos no esten vacios',
        'error'
      )
      return;
    }


    this.actividadesDiariasService.createregistroActividades(this.actividadesDiarias).subscribe(
      Response => {
        swal.fire(
          'Enviado',
          `Actividad creada con exito!`,
          'success'
        )
        this.listarActividades();
        this.limpiar();

      }
    )

  }


  limpiar() {
    this.actividadesDiarias.fecha = null;
    this.actividadesDiarias.numHoras = null;
    this.actividadesDiarias.horaLlegada = null;
    this.actividadesDiarias.horaSalida = null;
    this.actividadesDiarias.descripcion = null;
  }


  //Metodo de borrar

  borrarActividad(id: ActividadesDiarias) {

    swal.fire({
      title: '¿Estas seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.actividadesDiariasService.deleteActividad(id.idActividadesD).subscribe(
          Response=>{
            this.listaActividades =this.listaActividades.filter(servi=> servi !== id)

            swal.fire(
              'Borrado!',
              'Su actividad ha sido eliminada.',
              'success'
            )
          }
        )

        
        
      }
    })
  }


  //metodo generar documento

  generate(nom:any) {
    
    loadFile("https://backendg1c2.herokuapp.com/files/anexo3.docx", function(
      error,
      content
    ) {
      if (error) {
        throw error;
      }


  
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
      doc.setData({
        rpp: nom,
        numestudiantes: "2501"
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
      saveAs(out, "anexo9.docx");
    });
  }


}