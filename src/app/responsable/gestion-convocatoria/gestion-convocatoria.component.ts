import {Component, OnInit} from '@angular/core';
import {Solicitud_empresaService} from "../../services/solicitud_empresa.service";
import {TokenService} from "../../services/token.service";
import {ConvocatoriaService} from "../../services/convocatoria.service";
import {MessageService} from "primeng/api";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AsignaturaService} from "../../services/asignatura.service";
import {ActividadesConvenioService} from "../../services/actividades-convenio.service";

@Component({
  selector: 'app-gestion-convocatoria',
  templateUrl: './gestion-convocatoria.component.html',
  styleUrls: ['./gestion-convocatoria.component.css']
})
export class GestionConvocatoriaComponent implements OnInit {

  //DATA PARA RECIBIR DATOS
  dataSolicitudes: any[];
  dataAsignaturas: any[];
  dataRowSolicitud: any;
  dataRowAsignatura: any;
  ObjetoSolicitud: any;
  ObjetoAsignatura: any;
  asiganturas: any[] = [];
  dataActividades: any[];


  //COLUMNAS DE TABLAS
  columnaSolicitud: any[];
  columasAsignaturas: any[];
  asignColum: any[];
  columnasActividades:any[];


  dialogoDatos: boolean;

  formConvocataria: FormGroup;

  constructor(private _crudSolicitudes: Solicitud_empresaService,
              private _tokenService: TokenService,
              private _convocatoriaService: ConvocatoriaService,
              private _messageService: MessageService,
              private formBuilder: FormBuilder,
              private _crudAsignaturas: AsignaturaService,
              private _crudActividades: ActividadesConvenioService
  ) {

    this.columnaSolicitud = [
      {field: 'pdf_solicitud', header: 'Documento'},
      {field: 'id_solicitud_empresa', header: 'ID'},
      {field: 'nombre_empresa', header: 'Empresa'},
      {field: 'fecha_emision', header: 'F.Emisión'},
      {field: 'fecha_inicio', header: 'F.Inicio'},
      {field: 'nombre_emp', header: 'Nombre Emp'},
      {field: 'apellido_emp', header: 'Apellido Emp'},
      {field: 'generar_conv', header: 'Generar'}
    ];

    this.columasAsignaturas = [
      {field: 'nombreAsignatura', header: 'Nombre Asignatura'},
      {field: 'anadirA', header: 'Anadir asignatura'},
      {field: 'quitarA', header: 'Remover asignatura'},
    ];

    this.columnasActividades = [
      {field: 'area', header: 'Area de activiadad'},
      {field: 'descripcion', header: 'Descripcion '},
    ];

    this.asignColum=[
      {field: 'nombreAsignatura', header: 'Nombre Asignatura'},
    ]

  }

  ngOnInit(): void {

    this.formConvocataria = this.formBuilder.group({
      fechaMaxima: ['', Validators.required],
      ciclos: ['', Validators.required]
    });

    this.obtenerSolicitudes();
  }

  obtenerAsignaturas(): void {
    this._crudAsignaturas.getAsignaturas().then(value => {
      this.dataAsignaturas = value['data'];
    }).catch((errr) => {
      this.mostrarMensajeError('ERRO AL LISTAR ASIGNATURAS');
    })
  }

  quitarAsignatura() {
    if (this.ObjetoAsignatura != null) {
      this.asiganturas.splice(this.asiganturas.indexOf(value => value.idAsignatura == this.ObjetoAsignatura.idAsignatura),1);
      console.log(this.asiganturas);
    } else {
      this.mostrarMensajeError('NO HA SELECCIONADO LA FILA DE LA ASIGNATURA')
    }
  }

  anadirAsignatura() {
    if (this.ObjetoAsignatura != null) {
      this.asiganturas.push(this.ObjetoAsignatura);
      console.log(this.asiganturas);
    } else {
      this.mostrarMensajeError('NO HA SELECCIONADO LA FILA DE LA ASIGNATURA')
    }
  }

  obtenerActivadades(){
    this._crudActividades.getActividadesEmpresaConvenio(this.ObjetoSolicitud.id_empresa).then(value1 => {
      this.dataActividades = value1['data'];
      console.log(this.dataActividades)
    })
  }

  obtenerSolicitudes(): void {
    this._crudSolicitudes.getSolicitudesResponsable().then(value => {
      this.dataSolicitudes = value['data'];
      console.log(this.dataSolicitudes)
      this.mostarMensajeCorrecto('Listado de solicitudes generado exitosamente')
    }).catch((err) => {
      this.mostrarMensajeError('ERROR AL GENERAR LISTADO DE SOLICITUDES')
    })
  }

  cargarDatos(): void {
    if (this.ObjetoSolicitud != null) {
      this.obtenerAsignaturas();
      this.obtenerActivadades();
      this.dialogoDatos = true;
    } else {
      this.mostrarMensajeError('NO HA SELECCIONADO FILA,PARA PODER CARGAR LOS DATOS PREVIOS');
    }
  }

  onRowSelectSolicitud(event): void {
    this.ObjetoSolicitud = null;
    if (event.data) {
      this.dataRowSolicitud = event.data;
      this.ObjetoSolicitud = {...this.dataRowSolicitud};
    }
  }

  onRowUnSelectSolicitud(event): void {
    if (event.data) {
      this.dataRowSolicitud = null;
    }
  }

  onRowSelectAsignatura(event): void {
    this.ObjetoAsignatura = null;
    if (event.data) {
      this.dataRowAsignatura = event.data;
      this.ObjetoAsignatura = {...this.dataRowAsignatura};
    }
  }

  onRowUnSelectAsignatura(event): void {
    if (event.data) {
      this.dataRowAsignatura = null;
      this.ObjetoAsignatura = null;
    }
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

  checkForMIMEType() {
    if (this.ObjetoSolicitud != null) {
      var response = this.ObjetoSolicitud['pdf_solicitud'];
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
    } else {
      this.mostrarMensajeError('NO HA DADO CLICK SOBRE LA FILA DE LA CUAL QUIERE VER EL DOCUMENTO')
    }

  }

}
