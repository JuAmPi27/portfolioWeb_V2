import { Component, OnInit } from '@angular/core';
import { DatosPortfolioService } from 'src/app/services/datos-portfolio.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  


  constructor(private datosPortfolio: DatosPortfolioService) { }

  ngOnInit(): void {
    /* this.datosPortfolio.obtenerDatos().subscribe( data => {
      this.proyectoList = data.proyecto;
    }); */
  }

}
