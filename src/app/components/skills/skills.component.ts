import { Component, OnInit } from '@angular/core';
import { DatosPortfolioService } from 'src/app/services/datos-portfolio.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
   softSkillList: any;
   hardSkillList: any;
  
  constructor(private datosPortfolio: DatosPortfolioService) { }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe( data => {
        this.hardSkillList = data.hardSkill;
        console.log(data);
      });
  }

}
