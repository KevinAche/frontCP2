import { Component, OnInit } from '@angular/core';
import { InformeFinalAlumnoService } from '../services/informe-finalizacion-alumo.services';

@Component({
  selector: 'app-info-seguimiento',
  templateUrl: './informe-finalizacion-alumo.components.html'
  
})
export class InformeFinalAlumnoComponent implements OnInit {
  public informeFinal:Array<any>=[];
  constructor(private informeFinalAlumnoService:InformeFinalAlumnoService ) { }

  ngOnInit(): void {
    this.listarInformeFinal();
  }

  public listarInformeFinal(){
    this.informeFinalAlumnoService.getInformeFinalAlumno().subscribe((resp: any)=>{
      console.log(resp.data)
      this.informeFinal= resp.data
    })
  }
  
}
