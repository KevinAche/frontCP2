import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ConsultaspppComponent } from './consultasppp/consultasppp.component';
import { LoginComponent } from './login/login.component';
import { RegistroDocentesComponent } from './registro-docentes/registro-docentes.component';
import { RegistroEmpresasComponent } from './registro-empresas/registro-empresas.component';

const routes: Routes = [
  {path: '', component:AppComponent },
  {path: 'registro-docente', component:RegistroDocentesComponent },
  {path: 'registro-empresa', component:RegistroEmpresasComponent },
  {path: 'consulta-ppp', component:ConsultaspppComponent },
  {path: 'login', component:LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
