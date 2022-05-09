import { Component, OnInit } from '@angular/core';
import { DatosPortfolioService } from 'src/app/services/datos-portfolio.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  isUserLogged: Boolean = false;
  
  constructor(private datosPortfolio: DatosPortfolioService) { }

  ngOnInit(): void {
    
  }

}
