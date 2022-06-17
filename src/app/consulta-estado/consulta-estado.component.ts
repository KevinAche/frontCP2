import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {ConEstadoService} from "../services/conEstado.service";
import {Convocatoria} from "../models/Convocatoria";

@Component({
  selector: 'app-consulta-estado',
  templateUrl: './consulta-estado.component.html',
  styleUrls: ['./consulta-estado.component.css'],
  providers: [ConEstadoService]
})

export class ConsultaEstadoComponent implements OnInit, DoCheck, OnDestroy {
  public titulo: string;
  public columnasConvocatorias: any[];


  constructor(private  _conEstadoService: ConEstadoService ) {
    this.titulo = "Estado de Convocatorias"

  }

  // varible data es la lista de convocatorias y es de tipo any por que no se sabe el ipo que sera

  dataConvocatoria: any[];


  ngOnInit(): void {
    //Probando funcionamiento
    console.log("Componente iniciado On init")
    // console.log(this._conEstadoService.holaMundo());
    this.columnasConvocatorias = [
      {field:'idConvocatoria',header:'Id'},
      {field:'docConvocatoria',header:'Documento'},
      {field:'fechaEmision',header:'Recibido'},
      {field:'fechaMaxima',header:'Hasta'},
      {field:'nombreConvocatoria',header:'Nombre '},
      {field:'SolicitudEmpresa',header:'Id Empresa'}
    ]
    this.obtenerConvocatorias();

  }

  obtenerConvocatorias(): void{
    this._conEstadoService.getConvocatorias().then( value => {
        this.dataConvocatoria = value['data'];
        console.log(this.dataConvocatoria);
      })
  }
  //
  // obtenerConvocatoriasId(id:bigint ): void{
  //   this._conEstadoService.getConvocatorias().then( value => {
  //     this.dataConvocatoria = value['data'];
  //     console.log(this.dataConvocatoria.filter( convocatoria => convocatoria.id == id));
  //   })
  // }

  ngDoCheck(): void {
    console.log("Componente iniciado DoCheck")

  }

  ngOnDestroy(): void {
    console.log("Componente iniciado OnDestroy")
  }


}
