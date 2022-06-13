import { Component, OnInit } from '@angular/core';
import {Viaje} from './viaje';
import { ViajeService } from './viaje.service';

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.component.html'
  
})
export class ViajeComponent implements OnInit {

  viajes: Viaje[]=[];

  constructor(private viajeService:ViajeService) { }

  ngOnInit(): void {
    this.viajeService.getViaje().subscribe(
      viajes=> this.viajes=viajes
    );
  }

}
