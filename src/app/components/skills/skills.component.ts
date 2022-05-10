import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DatosPortfolioService } from 'src/app/services/datos-portfolio.service';
import { HardSkill } from 'src/assets/data/HardSkill';
import { SoftSkill } from 'src/assets/data/SoftSkill';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  softSkillList: SoftSkill[] = [];
  hardSkillList: HardSkill[] = [];
  isUserLogged: Boolean = false;
  
  constructor(
    private datosPortfolio: DatosPortfolioService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();
    this.reloaDataSoftSkill();
    this.reloaDataHardSkill();
  }

  private reloaDataSoftSkill() {
    this.datosPortfolio.obtenerDatosSoftSkill().subscribe( 
      (data) => {
      this.softSkillList = data;
    });
  }

  private reloaDataHardSkill() {
    this.datosPortfolio.obtenerDatosHardSkill().subscribe( 
      (data) => {
      this.hardSkillList = data;
    });
  }

}