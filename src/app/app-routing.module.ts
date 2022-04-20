import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatosPersonalesComponent } from './components/datos-personales/datos-personales.component';
import { EducacionComponent } from './components/educacion/educacion.component';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { SkillsComponent } from './components/skills/skills.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'datos', component: DatosPersonalesComponent },
  { path: 'experiencia', component: ExperienciaComponent },
  { path: 'educacion', component: EducacionComponent },
  { path: 'habilidades', component: SkillsComponent },
  { path: 'proyectos', component: ProyectosComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
