import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DatosPortfolioService } from 'src/app/services/datos-portfolio.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  miPortfolio: any;
  formLogin: FormGroup;
  
  constructor(
    private datosPortfolio: DatosPortfolioService,
    private authService: AuthService,
    private router: Router, 
    private formBuilder: FormBuilder
    ) {
      this.formLogin = this.formBuilder.group(
        {
          email: ['', [Validators.required, Validators.email]],
          contraseña: ['', [Validators.required, Validators.minLength(7)]]
        }
      );
    }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe( data => {
      this.miPortfolio = data;
    });
  }
  

  onSubmit(event: Event) : void {
    event.preventDefault;

    if(this.authService.login(this.formLogin.value))
      this.router.navigate(['portfolio']);
  }

  get Email() {
    return this.formLogin.get('email');
  }

  get Password() {
    return this.formLogin.get('contraseña');
  }

}
