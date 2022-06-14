import { Component, OnInit } from '@angular/core';
import { ConvocatoriaService } from '../services/convocatoria.service';

@Component({
  selector: 'app-consultasppp',
  templateUrl: './consulta-estudiantes-asignados.components.html',
})
export class ConsultasEstudiantesAsignadosComponent implements OnInit {
  public titulo="CONSULTA DE ESTUDIANTES ASIGNADOS";
  public convocatoriaTitulo="CONVOCATORIAS"
  public listaTitulo ="ESTUDIANTES"
  public convocatorias: Array<any>=[];

  constructor(private convocatoriaService: ConvocatoriaService){

  }

  ngOnInit(): void {
    this.listar();
  }

  listar(){
    this.convocatoriaService.getConvocatoria().subscribe((resp: any)=>{
      console.log(resp.data)
      this.convocatorias = resp.data
      })
  }

}
