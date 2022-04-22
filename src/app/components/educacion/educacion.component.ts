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
  educacionList: any;
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
    
    this.datosPortfolio.obtenerDatos().subscribe( data => {
      this.educacionList = data.educacion;
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
    console.log(index);
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

}
