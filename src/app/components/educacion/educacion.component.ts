import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { DatosPortfolioService } from 'src/app/services/datos-portfolio.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  educacionList: any;
  isUserLogged: Boolean = false;


  constructor(
    private datosPortfolio: DatosPortfolioService, 
    private authService: AuthService, 
    private formBuilder: FormBuilder) { 

      /*this.educationForm = this.formBuilder.group({
       id: [''],
       titulo: ['', [Validators.required]],
       escuela: ['', [Validators.required]],
       fin: ['', [Validators.required]] 
      });*/

    }

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();
    
    this.datosPortfolio.obtenerDatos().subscribe( data => {
      this.educacionList = data.educacion;
    });
  }

}
