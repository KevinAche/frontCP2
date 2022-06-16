import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ConsultaspppComponent } from './consultasppp/consultasppp.component';
import { LoginComponent } from './login/login.component';
import { RegistroDocentesComponent } from "./registro-docentes/registro-docentes.component";
import { RegistroEmpresasComponent } from './registro-empresas/registro-empresas.component';
import { SeleccionEstudiantesComponent } from './seleccion-estudiantes/seleccion-estudiantes.component';
import { ConsultaConvocatoriaComponent } from './consulta-convocatoria/consulta-convocatoria.component';
import { DesigTutorAcademicoComponent } from './desig-tutor-academico/desig-tutor-academico.component';
import { DesigTutorEmpresarialComponent } from './desig-tutor-empresarial/desig-tutor-empresarial.component';
import { ConsultasEstudiantesAsignadosComponent } from './consulta-estudiantes-asignados/consulta-estudiantes-asignados.components';
import { GestionEmpresaComponent } from './gestion-empresa/gestion-empresa.component';
import { RegistroAsistenciaComponent } from './registro-asistencia/registro-asistencia.component';
import { SolicitudEstudianteComponent } from './solicitud-estudiante/solicitud-estudiante.component';
import { RegistroVisitaComponent } from './registro-visita/registro-visita.component';
import { ConsultasReportesComponent } from './consultas-reportes/consultas-reportes.component';
import { InformeFinalAlumnoComponent } from './informe-finalizacion-alumno/informe-finalizacion-alumo.components';
import { EvaluacionEstudianteTutorEmpresarialComponent } from './evaluacion-estudiante-tutor-empresarial/evaluacion-estudiante-tutor-empresarial.components';
import { AnexosdePPPComponent } from './anexosde-ppp/anexosde-ppp.component';
import { ActaReunionComponent } from './acta-reunion/acta-reunion.component';

import { RegistroConvocatoriaComponent } from './registro-convocatoria/registro-convocatoria.component';
import { CertificadoAlumnoComponent } from './certificado-alumno/certificado-alumno.components';
import { RegistroSeguimientoAlumnoComponent } from './registro-seguimiento/registro-seguimiento.components';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'registro-docente', component: RegistroDocentesComponent },
  { path: 'registro-empresa', component: RegistroEmpresasComponent },
  { path: 'seleccion-estudiantes', component: SeleccionEstudiantesComponent },
  { path: 'consulta-ppp', component: ConsultaspppComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'consulta-convocatoria', component: ConsultaConvocatoriaComponent },
  { path: 'cons-est-asignados', component: ConsultasEstudiantesAsignadosComponent },
  { path: 'gestion-empresa', component: GestionEmpresaComponent },
  { path: 'registro-asistencia', component: RegistroAsistenciaComponent },
  { path: 'desig-tutor-academico', component: DesigTutorAcademicoComponent },
  { path: 'desig-tutor-empresarial', component: DesigTutorEmpresarialComponent },
  { path: 'solicitud-estudiante', component: SolicitudEstudianteComponent },
  { path: 'registro-visita', component: RegistroVisitaComponent },
  { path: 'consultas-reportes', component: ConsultasReportesComponent },
  //Franklin
  { path: 'registro-convocatoria', component: RegistroConvocatoriaComponent },
  { path: 'inf-fin-alumno', component: InformeFinalAlumnoComponent },
  { path: 'eva-est-tu-empresarial', component: EvaluacionEstudianteTutorEmpresarialComponent },
  {path:'acta-reunion',component:ActaReunionComponent},
  { path: 'reg-seg-alumno', component: RegistroSeguimientoAlumnoComponent },
  { path: 'cert-alumno', component: CertificadoAlumnoComponent },
  {path:'**',component:PagenotfoundComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
