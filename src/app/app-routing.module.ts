import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ConsultaspppComponent } from './consultasppp/consultasppp.component';
import { LoginComponent } from './login/login.component';
import { RegistroDocentesComponent} from "./registro-docentes/registro-docentes.component";
import { RegistroEmpresasComponent } from './registro-empresas/registro-empresas.component';
import { SeleccionEstudiantesComponent } from './seleccion-estudiantes/seleccion-estudiantes.component';
import {ConsultaConvocatoriaComponent} from './consulta-convocatoria/consulta-convocatoria.component';
import { DesigTutorAcademicoComponent } from './desig-tutor-academico/desig-tutor-academico.component';
import { DesigTutorEmpresarialComponent } from './desig-tutor-empresarial/desig-tutor-empresarial.component';
import { ConsultasEstudiantesAsignadosComponent } from './consulta-estudiantes-asignados/consulta-estudiantes-asignados.components';
import { GestionEmpresaComponent } from './gestion-empresa/gestion-empresa.component';
import { RegistroAsistenciaComponent } from './registro-asistencia/registro-asistencia.component';
import {SolicitudEstudianteComponent} from './solicitud-estudiante/solicitud-estudiante.component';
import {RegistroVisitaComponent} from './registro-visita/registro-visita.component';
import {ConsultasReportesComponent } from './consultas-reportes/consultas-reportes.component';
import { ConsultaEstadoComponent} from './consulta-estado/consulta-estado.component';

const routes: Routes = [
  {path: '', component:HomeComponent },
  {path: 'registro-docente', component:RegistroDocentesComponent},
  {path: 'registro-empresa', component:RegistroEmpresasComponent },
  {path: 'seleccion-estudiantes', component:SeleccionEstudiantesComponent},
  {path: 'consulta-ppp', component:ConsultaspppComponent },
  {path: 'login', component:LoginComponent },
  {path:'home',component:HomeComponent},
  {path:'consulta-convocatoria', component:ConsultaConvocatoriaComponent},
  {path:'cons-est-asignados', component:ConsultasEstudiantesAsignadosComponent},
  {path:'gestion-empresa', component: GestionEmpresaComponent },
  {path:'registro-asistencia', component: RegistroAsistenciaComponent},
  {path:'desig-tutor-academico', component: DesigTutorAcademicoComponent},
  {path:'desig-tutor-empresarial', component: DesigTutorEmpresarialComponent},
  {path:'solicitud-estudiante',component: SolicitudEstudianteComponent},
  {path:'registro-visita',component:RegistroVisitaComponent},
  {path:'consultas-reportes',component:ConsultasReportesComponent},
  {path:'consulta-estado',component:ConsultaEstadoComponent},
  {path:'**',component:PagenotfoundComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
