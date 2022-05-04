import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { DatosPortfolioService } from 'src/app/services/datos-portfolio.service';
import { HardSkill } from 'src/assets/data/HardSkill';

@Component({
  selector: 'app-hard-skill',
  templateUrl: './hard-skill.component.html',
  styleUrls: ['./hard-skill.component.css']
})
export class HardSkillComponent implements OnInit {
  hardSkillList: HardSkill[] = [];
  isUserLogged: Boolean = false;

  hardSkillForm: FormGroup;

  constructor(
    private datosPortfolio: DatosPortfolioService, 
    private authService: AuthService, 
    private formBuilder: FormBuilder) { 

      this.hardSkillForm = this.formBuilder.group({
       id: [''],
       nombre: ['', [Validators.required]],
       progreso: ['', [Validators.required]],
      });
    }
  

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();
    this.reloaData();
  }

  private reloaData() {
    this.datosPortfolio.obtenerDatosHardSkill().subscribe( 
      (data) => {
      this.hardSkillList = data;
      console.log(data); //para verificar por consola que nos llega bien la data solicitada
    });
  }

  onSubmit() {
    if (this.hardSkillForm.get('id')?.value == '') {
      this.datosPortfolio.guardarNuevaHardSkill(this.hardSkillForm.value).subscribe(
        (nuevaHardSkill: HardSkill) => {
          this.hardSkillList.push(nuevaHardSkill);
        }
      );
    }
    else {
      this.datosPortfolio.modificarHardSkill(this.hardSkillForm.value).subscribe(
        () => {
          this.reloaData();
        }
      );
    }
  } 

  onNewHardSkill() {
    this.clearForm();
  }

  onEditHardSkill(index: number) {
    let hard : HardSkill = this.hardSkillList[index];
    this.loadForm(hard);
  }

  onDeleteHardSkill(index: number) {
    if (confirm("¿Esta seguro que desea borrar esta hard-skill?")) {
      let hard : HardSkill = this.hardSkillList[index];
      this.datosPortfolio.borrarHardSkill(hard.id).subscribe(
        () => {
          this.reloaData();
        }
      );
    }
  }

  private clearForm() {
    this.hardSkillForm.setValue ({
      id: '', 
      nombre: '',
      progreso: ''
    });
  }

  private loadForm(hard: HardSkill) {
    this.hardSkillForm.setValue({
      id: hard.id,
      nombre: hard.nombre,
      progreso: hard.progreso,
    });
  }

}
