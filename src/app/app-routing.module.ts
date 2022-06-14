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
import {ProdGuardService as guard} from "./guards/prod-guard.service";
import { GestionEmpresaComponent } from './gestion-empresa/gestion-empresa.component';

const routes: Routes = [
  {path: '', component:HomeComponent },
  {path: 'registro-docente', component:RegistroDocentesComponent},
  {path: 'registro-empresa', component:RegistroEmpresasComponent },
  {path: 'seleccion-estudiantes', component:SeleccionEstudiantesComponent},
  {path: 'consulta-ppp', component:ConsultaspppComponent}, //,canActivate: [guard], data: {expectedRol: ['admin', 'user', 'docente']}},
  {path: 'login', component:LoginComponent },
  {path:'home',component:HomeComponent},
  {path:'consulta-convocatoria', component:ConsultaConvocatoriaComponent},
  
  {path: 'desig-tutor-empresarial', component: DesigTutorEmpresarialComponent },
  {path: 'desig-tutor-academico', component: DesigTutorAcademicoComponent },
  {path: 'gestion-empresa', component:GestionEmpresaComponent },


  {path:'**',component:PagenotfoundComponent}, // Este path siempre debe ir al ultimo para evitar problemas de carga

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
