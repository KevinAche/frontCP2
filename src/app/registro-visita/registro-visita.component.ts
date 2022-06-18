import { Component, OnInit } from '@angular/core';
import { InformeVisita, Visita } from '../models/Visita';
import { RegistroVisitaService } from '../services/registro-visita.service';
import swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InformeService } from '../services/Informe.service';
import { TutorAService } from '../services/tutorA.service';

@Component({
  selector: 'app-registro-visita',
  templateUrl: './registro-visita.component.html',
  styleUrls: ['./registro-visita.component.css'],
})
export class RegistroVisitaComponent implements OnInit {
  public registrovisita: Array<any> = [];
  registro: Visita = new Visita();
  informe: InformeVisita = new InformeVisita();
  formInforme: FormGroup;
  dataTutor: any[];

  constructor(
    private registroVisita: RegistroVisitaService,
    private formBuilder: FormBuilder,
    private informeserv: InformeService,
    private tutor: TutorAService
  ) {}

  ngOnInit(): void {
    this.listarRegistroVisita();
    this.listarTutor();

    this.formInforme = this.formBuilder.group({
      fecha: ['', Validators.required],
      horainicio: ['', Validators.required],
      horafin: ['', Validators.required],
      asunto: ['', Validators.required],
      actividades: ['', Validators.required],
      observaciones: ['', Validators.required],
    });
  }

  public listarRegistroVisita() {
    this.registroVisita.getRegistroVisita().subscribe((resp: any) => {
      console.log(resp.data);
      this.registrovisita = resp.data;
    });
  }
  public listarTutor() {
    this.tutor.getTutoresAcademicos().then((value) => {
      this.dataTutor = value['data'];
      console.log(this.dataTutor);
    });
  }

  public create(): void {
    this.registroVisita.createVisita(this.registro).subscribe((Response) => {
      swal.fire('Visita Guardada', `Visita creada con exito!`, 'success');
    });
  }

  public createInformeVisita(): void {
    if (this.formInforme.invalid) {
      swal.fire(
        'Error de entrada',
        'Revise que los campos no esten vacios',
        'error'
      );
      return;
    }
    this.informeserv.createInformeVisita(this.informe).subscribe((Response) => {
      swal.fire(
        'InformeVisita Guardado',
        `InformeVisita creado con exito!`,
        'success'
      );
    });
  }
}
