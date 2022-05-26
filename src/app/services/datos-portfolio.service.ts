import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from 'src/assets/data/config/Config';
import { Curso } from 'src/assets/data/Curso';
import { DatosPersonales } from 'src/assets/data/DatosPersonales';
import { Educacion } from 'src/assets/data/Educacion';
import { Experiencia } from 'src/assets/data/Experiencia';
import { HardSkill } from 'src/assets/data/HardSkill';
import { Proyecto } from 'src/assets/data/Proyecto';
import { SoftSkill } from 'src/assets/data/SoftSkill';




@Injectable({
  providedIn: 'root'
})
export class DatosPortfolioService {

  constructor(private http: HttpClient) { }

  
  // === CRUD DATOS PERSONALES === 
  obtenerDatosPersonales(): Observable<DatosPersonales[]> {
    return this.http.get<any>(config.baseUrl + "datosPersonales");
   }
 
   guardarNuevoDatosPersonales(datosPersonales: DatosPersonales): Observable<DatosPersonales> {
     return this.http.post<any>(config.baseUrl + "datosPersonales/crear", datosPersonales);
   }
 
   modificarDatosPersonales(datosPersonales: DatosPersonales): Observable<any> {
     return this.http.put<any>(config.baseUrl + "datosPersonales/update", datosPersonales);
   }
 
   borrarDatosPersonales(id: number): Observable<any> {
     return this.http.delete<any>(config.baseUrl + "datosPersonales/" + id);
   }


  // === CRUD PROYECTOS ===
  obtenerDatosProyecto(): Observable<Proyecto[]> {
    return this.http.get<any>(config.baseUrl + "proyecto");
   }
 
   guardarNuevoProyecto(proyecto: Proyecto): Observable<Proyecto> {
     return this.http.post<any>(config.baseUrl + "proyecto/crear", proyecto);
   }
 
   modificarProyecto(proyecto: Proyecto): Observable<any> {
     return this.http.put<any>(config.baseUrl + "proyecto/update", proyecto);
   }
 
   borrarProyecto(id: number): Observable<any> {
     return this.http.delete<any>(config.baseUrl + "proyecto/" + id);
   }


  // === CRUD HARD-SKILLS ===
  obtenerDatosHardSkill(): Observable<HardSkill[]> {
    return this.http.get<any>(config.baseUrl + "hardSkill");
   }
 
   guardarNuevaHardSkill(hard: HardSkill): Observable<HardSkill> {
     return this.http.post<any>(config.baseUrl + "hardSkill/crear", hard);
   }
 
   modificarHardSkill(hard: HardSkill): Observable<any> {
     return this.http.put<any>(config.baseUrl + "hardSkill/update", hard);
   }
 
   borrarHardSkill(id: number): Observable<any> {
     return this.http.delete<any>(config.baseUrl + "hardSkill/" + id);
   }


  // === CRUD SOFT-SKILLS ===
  obtenerDatosSoftSkill(): Observable<SoftSkill[]> {
    return this.http.get<any>(config.baseUrl + "softSkill");
   }
 
   guardarNuevaSoftSkill(soft: SoftSkill): Observable<SoftSkill> {
     return this.http.post<any>(config.baseUrl + "softSkill/crear", soft);
   }
 
   modificarSoftSkill(soft: SoftSkill): Observable<any> {
     return this.http.put<any>(config.baseUrl + "softSkill/update", soft);
   }
 
   borrarSoftSkill(id: number): Observable<any> {
     return this.http.delete<any>(config.baseUrl + "softSkill/" + id);
   }


  // === CRUD EXPERIENCIA ===
  obtenerDatosExperiencia(): Observable<Experiencia[]> {
    return this.http.get<any>(config.baseUrl + "experiencia");
   }
 
   guardarNuevaExperiencia(experiencia: Experiencia): Observable<Experiencia> {
     return this.http.post<any>(config.baseUrl + "experiencia/crear", experiencia);
   }
 
   modificarExperiencia(experiencia: Experiencia): Observable<any> {
     return this.http.put<any>(config.baseUrl + "experiencia/update", experiencia);
   }
 
   borrarExperiencia(id: number): Observable<any> {
     return this.http.delete<any>(config.baseUrl + "experiencia/" + id);
   }


  // === CRUD EDUCACION ===
  obtenerDatosEducacion(): Observable<Educacion[]> {
   return this.http.get<any>(config.baseUrl + "educacion");
  }

  guardarNuevaEducacion(educacion: Educacion): Observable<Educacion> {
    return this.http.post<any>(config.baseUrl + "educacion/crear", educacion);
  }

  modificarEducacion(educacion: Educacion): Observable<any> {
    return this.http.put<any>(config.baseUrl + "educacion/update", educacion);
  }

  borrarEducacion(id: number): Observable<any> {
    return this.http.delete<any>(config.baseUrl + "educacion/" + id);
  }

  
  // === CRUD CURSOS ===
  obtenerDatosCursos(): Observable<Curso[]> {
    return this.http.get<any>(config.baseUrl + "curso");
   }
 
   guardarNuevoCurso(curso: Curso): Observable<Curso> {
     return this.http.post<any>(config.baseUrl + "curso/crear", curso);
   }
 
   modificarCurso(curso: Curso): Observable<any> {
     return this.http.put<any>(config.baseUrl + "curso/update", curso);
   }
 
   borrarCurso(id: number): Observable<any> {
     return this.http.delete<any>(config.baseUrl + "curso/" + id);
   }


}

