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

const routes: Routes = [
  {path: '', component:HomeComponent },
  {path: 'registro-docente', component:RegistroDocentesComponent},
  {path: 'registro-empresa', component:RegistroEmpresasComponent },
  {path: 'seleccion-estudiantes', component:SeleccionEstudiantesComponent},
  {path: 'consulta-ppp', component:ConsultaspppComponent },
  {path: 'login', component:LoginComponent },
  {path:'home',component:HomeComponent},
  {path:'consulta-convocatoria', component:ConsultaConvocatoriaComponent},
  {path:'**',component:PagenotfoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
