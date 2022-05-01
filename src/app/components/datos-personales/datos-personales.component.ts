import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { DatosPortfolioService } from 'src/app/services/datos-portfolio.service';
import { DatosPersonales } from 'src/assets/data/DatosPersonales';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {
  datosPersonalesList: DatosPersonales[] = [];
  isUserLogged: Boolean = false;

  datosPersonalesForm: FormGroup;
  
  constructor(
    private datosPortfolio: DatosPortfolioService,
    private authService: AuthService, 
    private formBuilder: FormBuilder) { 

      this.datosPersonalesForm = this.formBuilder.group({
       id: [''],
       nombre: ['', [Validators.required]],
       Apellido: ['', [Validators.required]],
       profesion: ['', [Validators.required]],
       ubicacion: ['', [Validators.required]],
       email: ['', [Validators.required]],
       tel: ['', [Validators.required]],
       acercaDe: ['', [Validators.required]],
       img: ['', [Validators.required]]
      });
    }
    

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();
    this.reloaData();
  }


  private reloaData() {
    this.datosPortfolio.obtenerDatosPersonales().subscribe( 
      (data) => {
      this.datosPersonalesList = data;
    });
  }

  onSubmit() {
    if (this.datosPersonalesForm.get('id')?.value == '') {
      this.datosPortfolio.guardarNuevoDatosPersonales(this.datosPersonalesForm.value).subscribe(
        (nuevoDatoPersonal: DatosPersonales) => {
          this.datosPersonalesList.push(nuevoDatoPersonal);
        }
      );
    }
    else {
      this.datosPortfolio.modificarDatosPersonales(this.datosPersonalesForm.value).subscribe(
        () => {
          this.reloaData();
        }
      );
    }
  } 

  onNewDatoPersonal() {
    this.clearForm();
  }

  onEditDatoPersonal(index: number) {
    let datoPersonal : DatosPersonales = this.datosPersonalesList[index];
    this.loadForm(datoPersonal);
  }

  onDeleteDatoPersonal(index: number) {
    if (confirm("¿Esta seguro que desea borrar este dato personal?")) {
      let datoPersonal : DatosPersonales = this.datosPersonalesList[index];
      this.datosPortfolio.borrarDatosPersonales(datoPersonal.id).subscribe(
        () => {
          this.reloaData();
        }
      );
    }
  }

  private clearForm() {
    this.datosPersonalesForm.setValue ({
      id: '', 
      nombre: '',
      apellido: '', 
      profesion: '',
      ubicacion: '',
      email: '',
      tel: '',
      acercaDe: '',
      img: ''
    });
  }

  private loadForm(datoPersonal: DatosPersonales) {
    this.datosPersonalesForm.setValue({
      id: datoPersonal.id,
      nombre: datoPersonal.nombre,
      apellido: datoPersonal.apellido,
      profesion: datoPersonal.profesion,
      ubicacion: datoPersonal.ubicacion,
      email: datoPersonal.email,
      tel: datoPersonal.tel,
      acercaDe: datoPersonal.acercaDe,
      img: datoPersonal.img
    });
  }

}
