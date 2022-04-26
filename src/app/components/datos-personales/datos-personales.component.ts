import { Component, OnInit } from '@angular/core';
import { DatosPortfolioService } from 'src/app/services/datos-portfolio.service';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {
  miPortfolio: any;
  
  constructor(private datosPortfolio: DatosPortfolioService) { }

  ngOnInit(): void {
   /* this.datosPortfolio.obtenerDatos().subscribe( data => {
      this.miPortfolio = data;
    }); */
  }

}
