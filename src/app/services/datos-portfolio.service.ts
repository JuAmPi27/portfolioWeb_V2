import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from 'src/assets/data/config/Config';
import { Educacion } from 'src/assets/data/Educacion';


@Injectable({
  providedIn: 'root'
})
export class DatosPortfolioService {

  constructor(private http: HttpClient) { }

  obtenerDatos(): Observable<any> {
   
    // return this.http.post<any>(config.baseUrl + "educacion");
    return this.http.get('./assets/data/data.json');
  }

  guardarNuevaEducacion (educacion: Educacion): Observable<Educacion> {
    return this.http.post<any> (config.baseUrl + "educacion/crear", educacion);
  }

}

