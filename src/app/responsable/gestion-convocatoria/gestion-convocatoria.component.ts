import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion-convocatoria',
  templateUrl: './gestion-convocatoria.component.html',
  styleUrls: ['./gestion-convocatoria.component.css']
})
export class GestionConvocatoriaComponent implements OnInit {

  //DATA PARA RECIBIR DATOS
  dataSolicitudes: any;
  dataRowSolicitud: any;
  ObjetoSolicitud: any;


  //COLUMNAS DE TABLAS
  columnaSolicitud: any[];


  constructor() { }

  ngOnInit(): void {
    this.columnaSolicitud = [
      {field: 'id_solicitud', header: 'ID'},
      {field: 'empresa', header: 'Empresa'},
      {field: 'fecha_emision', header: 'F.Emisión'},
      {field: 'fecha_inicio', header: 'F.Inicio'},
      {field: 'documento', header: 'Documento'},
      {field: 'nombresE', header: 'Nombre Emp'},
      {field: 'apellidosE', header: 'Apellido Emp'},
      {field: 'generar_conv', header: 'Generar'}
    ];
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

}
