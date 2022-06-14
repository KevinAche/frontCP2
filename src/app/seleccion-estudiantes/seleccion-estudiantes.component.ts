import { Component, OnInit } from '@angular/core';
import { Convocatoria } from '../models/Convocatoria';
import { ConvocatoriaService } from '../services/convocatoria.service';


@Component({
  selector: 'app-registro-empresas',
  templateUrl: './seleccion-estudiantes.component.html',
  styleUrls: ['./seleccion-estudiantes.css']
  
})

/*
export class SeleccionEstudiantesComponent implements OnInit {
  public titulo="SELECCIÓN DE ESTUDIANTES";
  public convocatoriaTitulo="CONVOCATORIAS"
  public listaTitulo ="LISTA DE SOLICITUDES"
  convocatoria: Convocatoria[]=[];

  constructor(private convocatoriaService:ConvocatoriaService) { }

  ngOnInit(): void {
    this.convocatoriaService.getConvocatoria().subscribe(
      convocatoria=> this.convocatoria=this.convocatoria
    );
  }
  
}*/


export class SeleccionEstudiantesComponent implements OnInit {
  public titulo="SELECCIÓN DE ESTUDIANTES";
  public convocatoriaTitulo="CONVOCATORIAS"
  public listaTitulo ="LISTA DE SOLICITUDES"
  public convocatorias: Array<any>=[];
 
  constructor(
    private convocatoriaService: ConvocatoriaService
    ) {

     this.convocatoriaService.getConvocatoria().subscribe((resp: any)=>{
      console.log(resp.data)
      this.convocatorias = resp.data
      })

     }

  ngOnInit(): void {
  }

}