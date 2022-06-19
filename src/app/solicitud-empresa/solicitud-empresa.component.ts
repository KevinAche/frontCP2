import { Component, OnInit } from '@angular/core';
import {Solicitud_empresaService} from "../services/solicitud_empresa.service";
import {MessageService} from "primeng/api";
import {TokenService} from "../services/token.service";

@Component({
  selector: 'app-solicitud-empresa',
  templateUrl: './solicitud-empresa.component.html',
  styleUrls: ['./solicitud-empresa.component.css']
})
export class SolicitudEmpresaComponent implements OnInit {

  constructor(private _solicitudEmpresaCrud: Solicitud_empresaService,
              private _messageService: MessageService,
              private _tokenCrud: TokenService) {

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

}
