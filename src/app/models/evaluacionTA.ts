import { Empresa } from '../services/empresa';
import { Alumno } from './Alumno';
import { TutorA } from './TutorA';

export class evaluacionTA {
  idEvaluacionTA: number;
  puntajeTotal: number;
  //tutorAcademico: TutorA;
  docEvaluacionTA: any;
  //nombreEmpresa: Empresa;
  opcionA: any;
  opcionB: any;
  opcionC: any;
  opcionD: any;
  opcionE: any;
  numHoras: any;
  desde: any;
  hasta: any;
  alumno: Alumno;
  constructor() {
    this.alumno = new Alumno();
    //this.tutorAcademico = new TutorA();
  }
}
