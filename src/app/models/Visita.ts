export class Visita {
  id?: Number;
  tutoracademico?: String;
  tutorempresarial?: String;
  alumno?: String;
  ciclo?: String;
  empresa?: String;
  observaciones?: String;
  documento?: String;
}

export class InformeVisita {
  idinforme?: Number;
  asunto?: String;
  actividades?: String;
  observaciones?: String;
  horaInicio?: String;
  horaFin?: String;
  fecha?: Date;
}
