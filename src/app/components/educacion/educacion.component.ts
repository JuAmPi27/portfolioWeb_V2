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
       titulo: ['', [Validators.required]],
       escuela: ['', [Validators.required]],
       comienzo: ['', [Validators.required]] ,
       fin: ['', [Validators.required]] 
      });

    }

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();
    
    this.datosPortfolio.obtenerDatosEducacion().subscribe( 
      (data) => {
      this.educacionList = data;
      console.log(data); //para verificar por consola que nos llega bien la data solicitada
    });
  }

  onSubmit() {
    this.datosPortfolio.guardarNuevaEducacion(this.educationForm.value).subscribe(
      (nuevaEducacion: Educacion) => {
        console.log(nuevaEducacion);
        this.educacionList.push(nuevaEducacion);
      }
    );
  }

  onNewEducation() {
    this.clearForm();
  }

  onEditEducation(index: number) {
    let educacion : Educacion = this.educacionList[index];
    this.loadForm(educacion);
  }

  onDeleteEducation(index:number) {

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
    })
  }

}
