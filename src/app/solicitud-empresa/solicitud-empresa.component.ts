import { Component, OnInit } from '@angular/core';
import {Solicitud_empresaService} from "../services/solicitud_empresa.service";
import {MessageService} from "primeng/api";
import {TokenService} from "../services/token.service";
import {ResponsableService} from "../services/responsable.service";
import {ResponsablepppService} from "../services/responsableppp.service";
import {ActividadesConvenioService} from "../services/actividades-convenio.service";
import {EmpleadoService} from "../services/empleado.service";
import {Observable, ReplaySubject} from "rxjs";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils";
import {saveAs} from "file-saver";


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
  selector: 'app-solicitud-empresa',
  templateUrl: './solicitud-empresa.component.html',
  styleUrls: ['./solicitud-empresa.component.css']
})
export class SolicitudEmpresaComponent implements OnInit {

  dialogoResponsable: boolean;
  dialogoDatosGenerar: boolean;
  dataResponsable: any[];
  dataRowResponsable: any;
  ObjetoResponsable: any;
  columnasResponsable: any[];
  dataActividadesConvenio: any[];
  columnasActividades: any[];
  dataEmpresa: any[];
  objetoSolicitud: any;
  solicitud: any;
  base64Output: string;

  constructor(private _solicitudEmpresaCrud: Solicitud_empresaService,
              private _messageService: MessageService,
              private _tokenCrud: TokenService,
              private _crudResponsable: ResponsablepppService,
              private _crudActividades: ActividadesConvenioService,
              private _crudEmpleado: EmpleadoService,
  ) {

    this.columnasSolicitudes=[
      {field: 'id_solicitud_empresa', header: 'Id Solicitud'},
      {field: 'fecha_emision', header: 'Fecha Emision'},
      {field: 'fecha_inicio', header: 'Fecha de incio'},
      {field: 'numero_alumnos', header: 'No Alumnos'},
      {field: 'pdf_solicitud', header: 'Documento'},
      {field: 'respuesta', header: 'Respuesta'},
      //{field: 'estado', header: 'Estado'},
      {field: 'empleado', header: 'Empleado que genero'},
      {field: 'responsable', header: 'Responsable PPP'}
    ];
    this.obtenerSolicitudes();

    this.columnasResponsable = [
      {field: 'id_responsableppp', header: 'Id'},
      {field: 'cedula', header: 'Cedula responsable'},
      {field: 'titulo', header: 'Titulo de responsable'},
      {field: 'abrev_titulo', header: 'Abrev titulo'},
      {field: 'nombre_carrera', header: 'Carrera a cargo'},
      {field: 'nombres_r', header: 'Nombres responsable'},
      {field: 'apellidos_r', header: 'Apellidos responsable'},
      {field: 'designarC',header: 'Dirigida ha'},
    ];


    this.columnasActividades=[
      {field: 'area', header: 'Area de activiadad'},
      {field: 'descripcion', header: 'Descripcion '},
    ];

    this.obtenerActividadesConvenio();
  }



  ngOnInit(): void {

  }

  //
  columnasSolicitudes: any[];

  dataSolicitudes: any[];



  obtenerSolicitudes(): void{
    this._solicitudEmpresaCrud.getSolicitudesEmpresa(this._tokenCrud.getUserName()).then(value => {
      this.dataSolicitudes= value['data'];
      this.mostarMensajeCorrecto('Se genero exitosamente listado de solicitudes generadas');
      console.log(this.dataSolicitudes);
    }).catch((err)=>{
      this.mostrarMensajeError('No se genero listado de solicitudes');
    })
  }

  obtenerResponsables(){
    this._crudResponsable.getResponsables().then(value => {
      this.dataResponsable=value['data'];
      this.mostarMensajeCorrecto('EL LISTADO DE REPRESANTES SE GENERO EXITOSAMENTE');
    }).catch((err)=>{
      this.mostarMensajeCorrecto('ERROR AL LISTAR RESPONSABLES')
    })
  }

  anadirResponsable(){
    if(this.ObjetoResponsable!= null){
      console.log(this.ObjetoResponsable);

    }else{
      this.mostrarMensajeError('No puede continuar por que no seleccino ninguna fila');
    }
  }


  obtenerActividadesConvenio():void {
    this._crudEmpleado.getEmpresaLogeado(this._tokenCrud.getUserName()).then(value => {
      this.dataEmpresa=value['data'];
      this._crudActividades.getActividadesEmpresaConvenio(this.dataEmpresa[0].idEmpresa).then(value1 => {
        this.dataActividadesConvenio=value1['data'];
        console.log(this.dataActividadesConvenio)
      })
    })
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

  desplegarResponsables(){
    this.dialogoResponsable = true;
    this.obtenerResponsables();
  }

  onRowSelectResponsable(event): void {
    this.ObjetoResponsable=null;
    if (event.data) {
      this.dataRowResponsable = event.data;
      this.ObjetoResponsable = {...this.dataRowResponsable};
    }
  }

  onRowUnSelectResponsable(event): void {
    if (event.data) {
      this.dataRowResponsable = null;
      this.ObjetoResponsable = null;
    }
  }


  generate(nom: any, anexoRequerido: string, nombreDoc: string):void  {
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
        //console.log(JSON.stringify({error: error}, replaceErrors));
        if (error.properties && error.properties.errors instanceof Array) {
          const errorMessages = error.properties.errors
            .map(function (error) {
              return error.properties.explanation;
            })
            .join("\n");
          //console.log("errorMessages", errorMessages);
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



  checkForMIMEType() {
    var response = this.objetoSolicitud['doc_asignacion'];
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
        docAsignacion: this.base64Output
      };
      this.mostarMensajeCorrecto('El archivo fue cargado con exito')
    });
  }

  convertFile(file : File) : Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => result.next(btoa(event.target.result.toString()));
    console.log(result)
    return result;
  }



}
