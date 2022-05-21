import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { DatosPortfolioService } from 'src/app/services/datos-portfolio.service';
import { Curso } from 'src/assets/data/Curso';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
  cursosList: Curso[] = [];
  isUserLogged: Boolean = false;

  cursoForm: FormGroup;

  constructor(
    private datosPortfolio: DatosPortfolioService,
    private authService: AuthService, 
    private formBuilder: FormBuilder) { 

      this.cursoForm = this.formBuilder.group({
       id: [''],
       nombre: ['', [Validators.required]],
       lugar: ['', [Validators.required]],
       duracion: ['', [Validators.required]] 
      });
    }

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();
    this.reloaData();
  }

  private reloaData() {
    this.datosPortfolio.obtenerDatosCursos().subscribe( 
      (data) => {
      this.cursosList = data;
    });
  }

  onSubmit() {
    if (this.cursoForm.get('id')?.value == '') {
      this.datosPortfolio.guardarNuevoCurso(this.cursoForm.value).subscribe(
        (nuevoCurso: Curso) => {
          this.cursosList.push(nuevoCurso);
        }
      );
    }
    else {
      this.datosPortfolio.modificarCurso(this.cursoForm.value).subscribe(
        () => {
          this.reloaData();
        }
      );
    }
  } 

  onNewCourse() {
    this.clearForm();
  }

  onEditCourse(index: number) {
    let curso : Curso = this.cursosList[index];
    this.loadForm(curso);
  }

  onDeleteCourse(index: number) {
    if (confirm("¿Esta seguro que desea borrar este curso?")) {
      let curso : Curso = this.cursosList[index];
      this.datosPortfolio.borrarCurso(curso.id).subscribe(
        () => {
          this.reloaData();
        }
      );
    }
  }

  private clearForm() {
    this.cursoForm.setValue ({
      id: '', 
      nombre: '',
      lugar: '', 
      duracion: '',
    });
  }

  private loadForm(curso: Curso) {
    this.cursoForm.setValue({
      id: curso.id,
      nombre: curso.nombre,
      lugar: curso.lugar,
      duracion: curso.duracion,
    })
  }

}
