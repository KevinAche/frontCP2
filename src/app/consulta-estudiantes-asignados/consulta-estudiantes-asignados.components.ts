import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consultasppp',
  templateUrl: './consulta-estudiantes-asignados.components.html',
})
export class ConsultasEstudiantesAsignadosComponent implements OnInit {
  public titulo="CONSULTA DE ESTUDIANTES ASIGNADOS";
  public convocatoriaTitulo="CONVOCATORIAS"
  public listaTitulo ="ESTUDIANTES"
  constructor() { }

  ngOnInit(): void {
  }

}
