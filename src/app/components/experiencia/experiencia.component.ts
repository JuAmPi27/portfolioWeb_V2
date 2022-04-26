import { Component, OnInit } from '@angular/core';
import { DatosPortfolioService } from 'src/app/services/datos-portfolio.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  experienciaList: any;

  constructor(private datosPortfolio: DatosPortfolioService) { }

  ngOnInit(): void {
    //this.datosPortfolio.obtenerDatos().subscribe( data => {
     // this.experienciaList = data.experiencia;
    // });
  }

}
