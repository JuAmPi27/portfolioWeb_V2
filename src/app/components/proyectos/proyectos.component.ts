import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { DatosPortfolioService } from 'src/app/services/datos-portfolio.service';
import { Proyecto } from 'src/assets/data/Proyecto';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  proyectoList: Proyecto[] = [];
  isUserLogged: Boolean = false;

  proyectoForm: FormGroup;


  constructor(
    private datosPortfolio: DatosPortfolioService,
    private authService: AuthService, 
    private formBuilder: FormBuilder) { 

      this.proyectoForm = this.formBuilder.group({
       id: [''],
       nombre: ['', [Validators.required]],
       descripcion: ['', [Validators.required]],
       fechaRealizacion: ['', [Validators.required]] ,
       github: ['', [Validators.required]] 
      });
    }

    ngOnInit(): void {
      this.isUserLogged = this.authService.isUserLogged();
      this.reloaData();
    }

    private reloaData() {
      this.datosPortfolio.obtenerDatosProyecto().subscribe( 
        (data) => {
        this.proyectoList = data;
        console.log(data); //para verificar por consola que nos llega bien la data solicitada
      });
    }

    onSubmit() {
      if (this.proyectoForm.get('id')?.value == '') {
        this.datosPortfolio.guardarNuevoProyecto(this.proyectoForm.value).subscribe(
          (nuevoProyecto: Proyecto) => {
            this.proyectoList.push(nuevoProyecto);
          }
        );
      }
      else {
        this.datosPortfolio.modificarProyecto(this.proyectoForm.value).subscribe(
          () => {
            this.reloaData();
          }
        );
      }
    } 

    onNewProyect() {
      this.clearForm();
    }
  
    onEditProyect(index: number) {
      let proyecto : Proyecto = this.proyectoList[index];
      this.loadForm(proyecto);
    }
  
    onDeleteProyect(index: number) {
      if (confirm("¿Esta seguro que desea borrar este proyecto?")) {
        let proyecto : Proyecto = this.proyectoList[index];
        this.datosPortfolio.borrarProyecto(proyecto.id).subscribe(
          () => {
            this.reloaData();
          }
        );
      }
    }
  
    private clearForm() {
      this.proyectoForm.setValue ({
        id: '', 
        nombre: '',
        descripcion: '', 
        fechaRealizacion: '',
        github: ''
      });
    }
  
    private loadForm(proyecto: Proyecto) {
      this.proyectoForm.setValue({
        id: proyecto.id,
        nombre: proyecto.nombre,
        descripcion: proyecto.descripcion,
        fechaRealizacion: proyecto.fechaRealizacion,
        github: proyecto.github,
      })
    }

}
