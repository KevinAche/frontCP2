import { Component, OnInit } from '@angular/core';
import { ConvocatoriaService } from '../services/convocatoria.service';
import { SolicitudAlumnoService } from '../services/solicitud-alumno.service';

@Component({
  selector: 'app-consultasppp',
  templateUrl: './consultasppp.component.html',
  styleUrls: ['./consultasppp.component.scss']
})
export class ConsultaspppComponent implements OnInit {

  public convocatorias: Array<any>=[];
  
  constructor(private convocatoriaService: ConvocatoriaService, private solicitudalumnoservice : SolicitudAlumnoService) { }

  ngOnInit(): void {
    this.listarConvocatoria();
  }

  listarConvocatoria(){
    this.convocatoriaService.getConvocatoria().subscribe((resp: any)=>{
      console.log(resp.data)
      this.convocatorias = resp.data
      })
  }
}
