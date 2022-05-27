import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { DatosPortfolioService } from 'src/app/services/datos-portfolio.service';
import { Educacion } from 'src/assets/data/Educacion';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  educacionList: Educacion[] = [];
  isUserLogged: Boolean = false;

  educationForm: FormGroup;

  constructor(
    private datosPortfolio: DatosPortfolioService, 
    private authService: AuthService, 
    private formBuilder: FormBuilder) { 

      this.educationForm = this.formBuilder.group({
       id: [''],
       titulo: ['', [Validators.required, Validators.minLength(4)]],
       escuela: ['', [Validators.required, Validators.minLength(4)]],
       comienzo: ['', [Validators.required, Validators.minLength(4)]] ,
       fin: ['', [Validators.required, Validators.minLength(4)]] 
      });
    }

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();
    this.reloaData();
  }

  onSubmit() {
    console.log(this.educationForm.value);
    if (this.educationForm.get('id')?.value == '') {
      this.datosPortfolio.guardarNuevaEducacion(this.educationForm.value).subscribe(
        (nuevaEducacion: Educacion) => {
          this.educacionList.push(nuevaEducacion);
          alert("Se ha guardado correctamente"); // VER SI FUNCIONA EL MENSAJE DE EXITO
        }
      ); 
    } else {
      this.datosPortfolio.modificarEducacion(this.educationForm.value).subscribe(
        () => {
          this.reloaData();
          alert("Se ha modificado correctamente"); // VER SI FUNCIONA EL MENSAJE DE EXITO
        }
      );
    }
  } 


  get Titulo() {
    return this.educationForm.get('titulo');
  }

  get Escuela() {
    return this.educationForm.get('escuela');
  }

  get Comienzo() {
    return this.educationForm.get('comienzo');
  }

  get Fin() {
    return this.educationForm.get('fin');
  }


  onNewEducation() {
    this.clearForm();
  }

  onEditEducation(index: number) {
    let educacion: Educacion = this.educacionList[index];
    this.loadForm(educacion);
  }

  onDeleteEducation(index: number) {
    if (confirm("¿Esta seguro que desea borrar esta educación?")) {
    let educacion : Educacion = this.educacionList[index];
      this.datosPortfolio.borrarEducacion(educacion.id).subscribe(
        () => {
          this.reloaData();
        }
      );
    }
  }

  private reloaData() {
    this.datosPortfolio.obtenerDatosEducacion().subscribe( 
      (data) => {
      this.educacionList = data;
    });
  }

  private clearForm() {
    this.educationForm.setValue ({
      id: '', 
      titulo: '',
      escuela: '', 
      comienzo: '',
      fin: ''
    });
  }

  private loadForm(educacion: Educacion) {
    this.educationForm.setValue({
      id: educacion.id,
      titulo: educacion.titulo,
      escuela: educacion.escuela,
      comienzo: educacion.comienzo,
      fin: educacion.fin,
    });
  }

}
