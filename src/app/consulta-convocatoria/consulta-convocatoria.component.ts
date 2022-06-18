import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';


@Component({
  selector: 'app-consulta-convocatoria',
  templateUrl: './consulta-convocatoria.component.html',
  styleUrls: ['./consulta-convocatoria.component.css']
})
export class ConsultaConvocatoriaComponent implements OnInit, DoCheck, OnDestroy {

  constructor() { }

  ngOnInit(): void {
    console.log("Componente iniciado")

  }

  ngDoCheck(): void {
    console.log("Componente iniciado")
  }

  ngOnDestroy(): void {
    console.log("Componente iniciado")
  }

}
