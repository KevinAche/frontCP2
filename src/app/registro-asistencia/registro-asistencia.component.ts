import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ActividadesDiariasService } from '../services/actividades-diarias.service';
import { Anexo9Service } from '../services/anexo9.service';
import { RegistroAsistenciaService } from '../services/registro-asistencia.service';



@Component({
  selector: 'app-registro-asistencia',
  templateUrl: './registro-asistencia.component.html',
  styleUrls: ['./registro-asistencia.component.css']
})



export class RegistroAsistenciaComponent implements OnInit {

  public listaActividades: Array<any> = [];
  public listaAnexo9Datos: Array<any> = [];
  public listaRegistroActividades: Array<any> = [];

  public dis: boolean;
  public cedulaAlumno: any;


  showDialog() {
    this.dis = true;
  }


  constructor(
    private router: Router, private route: ActivatedRoute,
    private actividadesDiariasService: ActividadesDiariasService,
    private anexo9Service: Anexo9Service,
    private registroAsistenciaService: RegistroAsistenciaService
  ) { }


  ngOnInit(): void {
    this.cedulaAlumno = this.route.snapshot.paramMap.get('cedula');
    this.listarActividades();
    this.listarAnexo9();
    this.listarregistroAsistencia();
  }


  //metodos de listar
  public listarActividades() {
    this.actividadesDiariasService.getInformeActividadesDiarias().subscribe((resp: any) => {
      console.log(resp.data)
      this.listaActividades = resp.data
    })
  }


  public listarAnexo9() {
    this.anexo9Service.getAnexo9lista().subscribe((resp: any) => {
      console.log(resp.data)
      this.listaAnexo9Datos = resp.data
    })
  }

  public listarregistroAsistencia() {
    this.registroAsistenciaService.getRegistoAsistencialista().subscribe((resp: any) => {
      console.log(resp.data)
      this.listaRegistroActividades = resp.data
    })
  }


}