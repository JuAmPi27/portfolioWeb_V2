import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from 'src/assets/data/config/Config';
import { Educacion } from 'src/assets/data/Educacion';
import { Proyecto } from 'src/assets/data/Proyecto';




@Injectable({
  providedIn: 'root'
})
export class DatosPortfolioService {

  constructor(private http: HttpClient) { }

  // === CRUD DATOS PROYECTOS ===
  obtenerDatosProyecto(): Observable<Proyecto[]> {
    return this.http.get<any>(config.baseUrl + "proyecto");
   }
 
   guardarNuevoProyecto (proyecto: Proyecto): Observable<Proyecto> {
     return this.http.post<any> (config.baseUrl + "proyecto/crear", proyecto);
   }
 
   modificarProyecto (proyecto: Proyecto): Observable<any> {
     return this.http.put<any> (config.baseUrl + "proyecto/update", proyecto);
   }
 
   borrarProyecto(id: number): Observable<any> {
     return this.http.delete<any> (config.baseUrl + "proyecto/" + id);
   }


  // === CRUD DATOS HARD-SKILLS ===




  // === CRUD DATOS SOFT-SKILLS ===



  
  // === CRUD DATOS EXPERIENCIA ===




  // === CRUD DATOS EDUCACION ===
  obtenerDatosEducacion(): Observable<Educacion[]> {
   return this.http.get<any>(config.baseUrl + "educacion");
  }

  guardarNuevaEducacion (educacion: Educacion): Observable<Educacion> {
    return this.http.post<any> (config.baseUrl + "educacion/crear", educacion);
  }

  modificarEducacion (educacion: Educacion): Observable<any> {
    return this.http.put<any> (config.baseUrl + "educacion/update", educacion );
  }

  borrarEducacion(id: number): Observable<any> {
    return this.http.delete<any> (config.baseUrl + "educacion/" + id);
  }

  // === CRUD DATOS CURSOS REALIZADOS ===

}

