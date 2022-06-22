import { Component, OnInit } from '@angular/core';
import { InformeFinalAlumnoService } from '../services/informe-finalizacion-alumo.services';
import { Observable } from 'rxjs';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-info-seguimiento',
  templateUrl: './informe-finalizacion-alumo.components.html'
  
})
export class InformeFinalAlumnoComponent implements OnInit {
  public informeFinal:Array<any>=[];

  constructor(private informeFinalAlumnoService:InformeFinalAlumnoService ) { }

  base64Output : string;

  ngOnInit(): void {
    this.listarInformeFinal();
  }

  onFileSelected(event) {
    this.convertFile(event.target.files[0]).subscribe(base64 => {
      this.base64Output = base64;
    });
  }

  convertFile(file : File) : Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => result.next(btoa(event.target.result.toString()));
    console.log(result)
    return result;
  }

  public listarInformeFinal(){
    this.informeFinalAlumnoService.getInformeFinalAlumno().subscribe((resp: any)=>{
      console.log(resp.data)
      this.informeFinal= resp.data
    })
  }
  
}
