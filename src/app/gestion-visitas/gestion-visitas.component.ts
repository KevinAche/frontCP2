import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InformeVisita } from '../models/Visita';
import { InformeService } from '../services/Informe.service';

@Component({
  selector: 'app-gestion-visitas',
  templateUrl: './gestion-visitas.component.html',
  styleUrls: ['./gestion-visitas.component.css'],
})
export class GestionVisitasComponent implements OnInit {
  informe: InformeVisita = new InformeVisita();
  formInforme: FormGroup;
  cols: any[];
  dis: boolean;
  informes: InformeVisita[];
  dataInformes: any[];

  showDialog() {
    this.informe.idinforme = null;
    this.informe.fecha = null;
    this.informe.horaInicio = null;
    this.informe.horaFin = null;
    this.informe.asunto = null;
    this.informe.actividades = null;
    this.informe.observaciones = null;
    this.dis = true;
  }

  constructor(
    private informeservice: InformeService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formInforme = this.formBuilder.group({
      idinforme: ['', Validators.required],
      fecha: ['', Validators.required],
      horainicio: ['', Validators.required],
      horafin: ['', Validators.required],
      asunto: ['', Validators.required],
      actividades: ['', Validators.required],
      observaciones: ['', Validators.required],
    });

    this.cols = [
      { field: 'idinforme', header: 'idinforme' },
      { field: 'fecha', header: 'Fecha' },
      { field: 'horainicio', header: 'Hora Inicio' },
      { field: 'horafin', header: 'Hora Fin' },
      { field: 'asunto', header: 'Asunto a tratar' },
      { field: 'actividades', header: 'Actividades' },
      { field: 'observaciones', header: 'Observaciones' },
      { field: 'size', header: 'Acciones' },
    ];
    this.listarInfome();
  }
  listarInfome(): void {
    this.informeservice.getListaInforme().then((value) => {
      this.dataInformes = value['data'];
      console.log(this.dataInformes);
    });
  }
}
