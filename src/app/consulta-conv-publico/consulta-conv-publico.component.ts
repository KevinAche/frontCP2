import { Component, OnInit } from '@angular/core';
import { ConvocatoriaService } from '../services/convocatoria.service';
import { ConvocatoriaService } from '../services/convenio.service';
import { AlumnosService } from '../services/alumnos.service';

@Component({
  selector: 'app-consulta-conv-publico',
  templateUrl: './consulta-conv-publico.component.html',
  styleUrls: ['./consulta-conv-publico.component.css']
})
export class ConsultaConvPublicoComponent implements OnInit {

    public convocatoriasP: Array<any> = [];
      public convenios: Array<any> = [];
  constructor (private convocatoriaService: ConvocatoriaService, private convenioService:ConvenioService ) { }

  ngOnInit(): void {
  this.listarConvocatorias();
  listarConvenios();
  }
    public listarConvocatorias() {
      this.convocatoriaService.getConvocatoria().subscribe((resp: any) => {
        console.log(resp.data)
        this.convocatoriasP = resp.data
      })
    }
    public listarConvenios() {
          this.convenioService.getConvenio().subscribe((resp: any) => {
            console.log(resp.data)
            this.convenios = resp.data
          })
        }

}
