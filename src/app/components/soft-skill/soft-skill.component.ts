import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { DatosPortfolioService } from 'src/app/services/datos-portfolio.service';
import { SoftSkill } from 'src/assets/data/SoftSkill';

@Component({
  selector: 'app-soft-skill',
  templateUrl: './soft-skill.component.html',
  styleUrls: ['./soft-skill.component.css']
})
export class SoftSkillComponent implements OnInit {
  softSkillList: SoftSkill[] = [];
  isUserLogged: Boolean = false;

  softSkillForm: FormGroup;

  constructor(
    private datosPortfolio: DatosPortfolioService, 
    private authService: AuthService, 
    private formBuilder: FormBuilder) { 

      this.softSkillForm = this.formBuilder.group({
       id: [''],
       nombre: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(3)]],
       progreso: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(3)]],
      });
    }
  

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();
    this.reloaData();
  }

  private reloaData() {
    this.datosPortfolio.obtenerDatosSoftSkill().subscribe( 
      (data) => {
      this.softSkillList = data;
    });
  }

  onSubmit() {
    if (this.softSkillForm.get('id')?.value == '') {
      this.datosPortfolio.guardarNuevaSoftSkill(this.softSkillForm.value).subscribe(
        (nuevaSoftSkill: SoftSkill) => {
          this.softSkillList.push(nuevaSoftSkill);
        }
      );
    }
    else {
      this.datosPortfolio.modificarSoftSkill(this.softSkillForm.value).subscribe(
        () => {
          this.reloaData();
        }
      );
    }
  } 

  get Nombre() {
    return this.softSkillForm.get('nombre');
  }

  get Progreso() {
    return this.softSkillForm.get('progreso');
  }

  
  onNewSoftSkill() {
    this.clearForm();
  }

  onEditSoftSkill(index: number) {
    let soft : SoftSkill = this.softSkillList[index];
    this.loadForm(soft);
  }

  onDeleteSoftSkill(index: number) {
    if (confirm("¿Esta seguro que desea borrar esta soft-skill?")) {
      let soft : SoftSkill = this.softSkillList[index];
      this.datosPortfolio.borrarSoftSkill(soft.id).subscribe(
        () => {
          this.reloaData();
        }
      );
    }
  }

  private clearForm() {
    this.softSkillForm.setValue ({
      id: '', 
      nombre: '',
      progreso: ''
    });
  }

  private loadForm(soft: SoftSkill) {
    this.softSkillForm.setValue({
      id: soft.id,
      nombre: soft.nombre,
      progreso: soft.progreso,
    });
  }
  

}
