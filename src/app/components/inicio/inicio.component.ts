import { Component, OnInit } from '@angular/core';
import { DatosPortfolioService } from 'src/app/services/datos-portfolio.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  
  miPortfolio: any;

  constructor(private datosPortfolio: DatosPortfolioService) { }

  ngOnInit(): void {
    /*this.datosPortfolio.obtenerDatos().subscribe( data => {
      this.miPortfolio = data;
    }); */
  }
}
