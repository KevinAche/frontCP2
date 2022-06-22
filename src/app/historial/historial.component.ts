import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit, DoCheck, OnDestroy {
  public titulo: string;
  public columnasHistorial: any[];

  constructor() {
    this.titulo = "Historial de Busquedas"
  }

  ngOnInit(): void {

  }

  ngDoCheck(): void {
  }

  ngOnDestroy(): void {
  }

}
