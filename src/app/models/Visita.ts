export class Visita {
  id: any;
  tutoracademico?: String;
  tutorempresarial?: String;
  alumno?: String;
  ciclo?: String;
  empresa?: String;
  observaciones?: String;
  documento?: String;
}

export class InformeVisita {
  idinforme?: any;
  asunto?: String;
  actividades?: String;
  observaciones?: String;
  horaInicio?: String;
  horaFin?: String;
  fecha?: Date;
}
