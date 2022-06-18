import {Component, OnInit, Inject} from '@angular/core';
import {AlumnosService} from 'src/app/services/alumnos.service';
import {FormBuilder, FormGroup} from "@angular/forms";
import {DocenteService} from "../services/docente.service";
import {ConfirmationService, LazyLoadEvent, MessageService} from "primeng/api";
import {TutorAService} from "../services/tutorA.service";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import {saveAs} from "file-saver";
import Docxtemplater from "docxtemplater";
import {EmpresaService} from "../services/empresa.service";

function loadFile(url: any, callback: any) {
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
  selector: 'app-desig-tutor-academico',
  templateUrl: './desig-tutor-academico.component.html',
  styleUrls: ['./desig-tutor-academico.component.css'],
})
export class DesigTutorAcademicoComponent implements OnInit {


  constructor(private _alumnoCrud: AlumnosService,
              private _formBuilder: FormBuilder,
              private _docenteCrud: DocenteService,
              private _tutorACrud: TutorAService,
              private _empresasCrud: EmpresaService,
              private _messageService: MessageService) {
  }

  //DATAS PARA RECIBIR DATOS
  dataDocentes: any[];
  dataRowAlumno: any;
  dataAlumnos: any[];
  dataRowDocente: any;
  ObjetoAlumno: any;

  //COLUMNAS DE TABLAS
  columnasEstudiantes: any[];
  conlumnasDocentes: any[];

  //DIALOGOS Y FORMS PARA HACER VISIBLES DIALOGOS Y CONTROLAR INGRESO DE DATOS
  dialogoAsignar: boolean;
  formTutor: FormGroup;

  //DATOS PARA DROPDOWNS
  empresaSeleccionada: any;
  dataEmpresas: any[];
  ddEmpresas = [];


  ngOnInit(): void {
    this.columnasEstudiantes = [
      {field: 'cedula', header: 'Cedula'},
      {field: 'nombres', header: 'Primer nombre'},
      {field: 'apellidos', header: 'Segundo Nombre'},
      {field: 'ciclo', header: 'Primer apellido'},
      {field: 'paralelo', header: 'Segundo Apellido'},
      {field: 'promedio', header: 'Correo'},
      {field: 'carrera', header: 'Carrera'},
      {field: 'nombre_empresa', header: 'Solicitud a empresa'},
      {field: 'aginarta', header: 'Asignar tutor'},
    ];

    this.conlumnasDocentes = [
      {field: 'cedula', header: 'Cedula'},
      {field: 'abrev_titulo', header: 'Abrv. Titulo'},
      {field: 'titulo', header: 'Titulo'},
      {field: 'primer_nombre', header: 'Primer nombre'},
      {field: 'segundo_nombre', header: 'Segundo Nombre'},
      {field: 'primer_apellido', header: 'Primer apellido'},
      {field: 'segundo_apellido', header: 'Segundo Apellido'},
      {field: 'correo', header: 'Correo'},
      {field: 'designarC', header: 'Designar como tutor'}
    ];

    this.obtenerAlumnos();
  }

  obtenerAlumnos(): void {
    this._alumnoCrud.getAlumnosST().then(value => {
      this.dataAlumnos = value['data'];
      this.mostarMensajeCorrecto("Lista de alumnos generada exitosamente");
    })
      .catch(((err) => {
          this.mostrarMensajeError("Problema en listado de estudiantes");
        })
      );
  }

  obtenerEmpresas(): void {
    this._empresasCrud.getEmpresas().then(value => {
      const obj: any = {label: 'empresa', items: []}
      value['data'].forEach(nombres => {
        obj.items.push(nombres.nombreEmpresa)
      })

      obj.items.forEach((valor) => {
        console.log(valor)
        this.ddEmpresas.push(valor.toString())
      })

    }).catch((err) => {
      this.mostrarMensajeError('Error al listar empresas ' + err);
    })
  }


  asignarTutor() {
    // this.dialogoAsginar.open(Dialog);
    this.dialogoAsignar = true;
    this.obtenerDocentes();
  }


  designarDocente() {
    console.log('DOCENTE DESIGNADO COMO TUTOR ACADEMICO')
    if (this.dataRowAlumno != null) {
      if (this.dataRowDocente != null) {
        let docenteG: any;
        let alumnoG: any;
        this._docenteCrud.getDocenteCedula(this.dataRowDocente['cedula']).then(value => {
          docenteG = value['data'];
        });
        this._alumnoCrud.getAlumnoCedula(this.dataRowAlumno['cedula']).then(value => {
          alumnoG = value['data'];
        });

        let nombreDocumento: string = 'anexo6.' + this.dataRowDocente['primer_nombre'] + [this.dataRowDocente['primer_apellido']] + '.docx';
        let tutor: any = {
          docAsignacion: 'fdsfsd'
        };
        let fechaActual = new Date().toLocaleDateString();
        let fechacortada: any[] = fechaActual.split('/');
        console.log(fechaActual)
        let datageneral: any = {
          dia: fechacortada[0],
          mes: this.devolvermes(fechacortada[1]),
          ano: fechacortada[2],
          tituloD: this.dataRowDocente['abrev_titulo'],
          datosE: this.dataRowAlumno['nombres'] + ' ' + this.dataRowAlumno['apellidos'],
          datosD: this.dataRowDocente['primer_nombre'] + ' ' + this.dataRowDocente['segundo_nombre'] + ' ' + this.dataRowDocente['primer_apellido'] + ' ' + this.dataRowDocente['segundo_apellido'],
          carrera: this.dataRowAlumno['carrera'],
          empresa: this.dataRowAlumno['nombre_empresa']
        }
        this._tutorACrud.createTutorAcademico(this.dataRowDocente['cedula'], this.dataRowAlumno['cedula'], tutor).then(value => {
          this.mostarMensajeCorrecto(value['mensaje']);
          this.generate(datageneral, 'http://localhost:8082/files/anexo6.docx', nombreDocumento);
          this.obtenerAlumnos();
          this.dialogoAsignar = false;
        }).catch((err) => {
          this.mostrarMensajeError("No se pudo designar tutor")
        });
      } else {
        this.mostrarMensajeError('El docente no ha sido clickeado')
      }
    } else {
      this.mostrarMensajeError('El alumno no ha sido clickeado');
    }
  }


  obtenerDocentes(): void {
    this._docenteCrud.getDocentes().then(value => {
      this.dataDocentes = value['data'];
      this.mostarMensajeCorrecto('Lista de docentes generada');
      this.obtenerEmpresas();
    })
  }


  lazyLoad(event: LazyLoadEvent): void {
    setTimeout(() => {
      this.obtenerAlumnos();
    }, 0);
  }


  mostrarMensajeError(mensaje: String): void {
    this._messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Incorrecto: ' + mensaje,
      life: 3000,
    });
  }


  mostarMensajeCorrecto(mensaje: String): void {
    this._messageService.add({
      severity: 'success',
      summary: 'Hecho',
      detail: 'Correcto: ' + mensaje,
      life: 3000,
    });
  }


  onRowSelectDocente(event): void {
    if (event.data) {
      this.dataRowDocente = event.data;
      let ob: any = {...this.dataRowDocente};
      console.log(ob);
    }
  }


  onRowUnSelectDocente(event): void {
    if (event.data) {
      this.dataRowDocente = null;
    }
  }


  onRowSelectAlumno(event): void {
    this.ObjetoAlumno = null;
    if (event.data) {
      this.dataRowAlumno = event.data;
      this.ObjetoAlumno = {...this.dataRowAlumno};
      console.log(this.ObjetoAlumno);
    }
  }


  onRowUnSelectAlumno(event): void {
    if (event.data) {
      this.dataRowAlumno = null;
    }
  }


  devolvermes(mes: any): any {
    switch (mes) {
      case '1':
        return 'enero'
        break;

      case '2':
        return 'febrero'
        break;

      case '3':
        return 'marzo'
        break;

      case '4':
        return 'abril'
        break;

      case '5':
        return 'mayo'
        break;

      case '6':
        return 'junio'
        break;

      case '7':
        return 'julio'
        break;

      case '8':
        return 'agosto'
        break;

      case '9':
        return 'septiembre'
        break;

      case '10':
        return 'octubre'
        break;

      case '11':
        return 'noviembre'
        break;

      case '12':
        return 'diciembre'
        break;
    }
  }

//-> PARA CARGA DE ARCHIVOS

  generate(nom: any, anexoRequerido: string, nombreDoc: string) {
    loadFile(anexoRequerido, function (
      error,
      content
    ) {
      if (error) {
        throw error;
      }
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, {paragraphLoop: true, linebreaks: true});
      doc.setData({
        ...nom
      });
      try {
        doc.render();
      } catch (error) {
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

        console.log(JSON.stringify({error: error}, replaceErrors));
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
      saveAs(out, nombreDoc);
    });
  }

  convertFile(docum: any) {
    //console.log(docum)
    //Usage example:
    var file = this.dataURLtoFile(docum, 'Anexo7.pdf');
    //console.log(file);
    saveAs(file, 'Anexo7.pdf');
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


  convertirBase64(e) {

  }
}
