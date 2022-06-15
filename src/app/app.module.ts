import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistroEmpresasComponent } from './registro-empresas/registro-empresas.component';
import { RegistroDocentesComponent } from './registro-docentes/registro-docentes.component';
import { ConsultaspppComponent } from './consultasppp/consultasppp.component';
import { LoginComponent } from './login/login.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import { HomeComponent } from './components/home/home.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { SeleccionEstudiantesComponent } from './seleccion-estudiantes/seleccion-estudiantes.component';
import {MatCardModule} from '@angular/material/card';
import { FooterComponent } from './footer/footer.component';
import { RegistroComponent } from './auth/registro.component';
import { ConsultaConvocatoriaComponent } from './consulta-convocatoria/consulta-convocatoria.component';
import { HttpClientModule } from '@angular/common/http';
import { DesigTutorEmpresarialComponent } from './desig-tutor-empresarial/desig-tutor-empresarial.component';
import { DesigTutorAcademicoComponent } from './desig-tutor-academico/desig-tutor-academico.component';
import { ConsultasEstudiantesAsignadosComponent } from './consulta-estudiantes-asignados/consulta-estudiantes-asignados.components';
import { GestionEmpresaComponent } from './gestion-empresa/gestion-empresa.component';
import {RegistroAsistenciaComponent} from "./registro-asistencia/registro-asistencia.component";
import {TableModule} from "primeng/table";
import {DialogModule} from "primeng/dialog";
import {ButtonModule} from "primeng/button";
import {PanelModule} from "primeng/panel";
import {SolicitudEstudianteComponent} from './solicitud-estudiante/solicitud-estudiante.component';
import {RegistroVisitaComponent} from './registro-visita/registro-visita.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ConsultasReportesComponent } from './consultas-reportes/consultas-reportes.component';
import { ConsultaEstadoComponent } from './consulta-estado/consulta-estado.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistroEmpresasComponent,
    RegistroDocentesComponent,
    ConsultaspppComponent,
    LoginComponent,
    HomeComponent,
    SeleccionEstudiantesComponent,
    PagenotfoundComponent,
    FooterComponent,
    RegistroComponent,
    ConsultaConvocatoriaComponent,
    DesigTutorEmpresarialComponent,
    DesigTutorAcademicoComponent,
    ConsultasEstudiantesAsignadosComponent,
    GestionEmpresaComponent,
    RegistroAsistenciaComponent,
    RegistroVisitaComponent,
    SolicitudEstudianteComponent,
    ConsultasReportesComponent,
    ConsultaEstadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatMenuModule,
    TableModule,
    MatDialogModule,
    DialogModule,
    ButtonModule,
    PanelModule,
    MatExpansionModule,
    MatFormFieldModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
