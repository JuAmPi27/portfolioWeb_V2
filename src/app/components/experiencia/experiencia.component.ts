import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { DatosPortfolioService } from 'src/app/services/datos-portfolio.service';
import { Experiencia } from 'src/assets/data/Experiencia';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  experienciaList: Experiencia[] = [];
  isUserLogged: Boolean = false;

  experienciaForm: FormGroup;

  constructor(
    private datosPortfolio: DatosPortfolioService,
    private authService: AuthService, 
    private formBuilder: FormBuilder) { 
      
      this.experienciaForm = this.formBuilder.group({
        id: [''],
        empresa: ['', [Validators.required]],
        cargo: ['', [Validators.required]],
        pais: ['', [Validators.required]],
        comienzo: ['', [Validators.required]] ,
        fin: ['', [Validators.required]],
        tareas: ['', [Validators.required]]
       });
    }

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();
    this.reloaData();
  }

  private reloaData() {
    this.datosPortfolio.obtenerDatosExperiencia().subscribe( 
      (data) => {
      this.experienciaList = data;
      console.log(data); //para verificar por consola que nos llega bien la data solicitada
    });
  }

  onSubmit() {
    if (this.experienciaForm.get('id')?.value == '') {
      this.datosPortfolio.guardarNuevaExperiencia(this.experienciaForm.value).subscribe(
        (nuevaExperiencia: Experiencia) => {
          this.experienciaList.push(nuevaExperiencia);
        }
      );
    }
    else {
      this.datosPortfolio.modificarExperiencia(this.experienciaForm.value).subscribe(
        () => {
          this.reloaData();
        }
      );
    }
  } 

  onNewExperience() {
    this.clearForm();
  }

  onEditExperience(index: number) {
    let experiencia : Experiencia = this.experienciaList[index];
    this.loadForm(experiencia);
  }

  onDeleteExperience(index: number) {
    if (confirm("¿Esta seguro que desea borrar esta experiencia laboral?")) {
      let experiencia : Experiencia = this.experienciaList[index];
      this.datosPortfolio.borrarExperiencia(experiencia.id).subscribe(
        () => {
          this.reloaData();
        }
      );
    }
  }

  private clearForm() {
    this.experienciaForm.setValue ({
      id: '', 
      empresa: '',
      cargo: '', 
      pais: '',
      comienzo: '',
      fin: '',
      tareas: ''
    });
  }

  private loadForm(experiencia: Experiencia) {
    this.experienciaForm.setValue({
      id: experiencia.id,
      empresa: experiencia.empresa,
      cargo: experiencia.cargo,
      pais: experiencia.pais,
      comienzo: experiencia.comienzo,
      fin: experiencia.fin,
      tareas: experiencia.tareas
    })
  }

}
