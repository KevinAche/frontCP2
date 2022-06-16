import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eva-est-tut-empresarial',
  templateUrl: './evaluacion-estudiante-tutor-empresarial.components.html'
  
})
export class EvaluacionEstudianteTutorEmpresarialComponent implements OnInit {
  public titulo="EVALUACIÓN ESTUDIANTE POR PARTE DEL TUTOR";
  public indicacion1="Valore el desempeño del practicante, marcando y registrando la calificación en cada uno de los aspectos descritos utilizando los siguientes parametros";
  public indicacion2="(1)Deficiente (5)Regular  (10)Muy bueno  (15)Sobresaliente  (20)";
  public parametroA="a) Asistencia y puntualidad";
  public parametroB="b)Cumplimiento de normas establecidas por la entidad receptora";
  public parametroC="c) Compromiso y responsabilidad frente al trabajo";
  public parametroD="d) Integracion y actitud de colaboración con los miembros del equipo de la empresa";
  public parametroE="e) Valoración de los resultados tomando como base las actividades encomendadas al estudiante, asi como su cumplimiento en los plazos establecidos";
  constructor() { }

  ngOnInit(): void {
  }

}
