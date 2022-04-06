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
  loginForm!: FormGroup;
  form!: FormGroup;
  
  constructor(
    private authService: AuthService,
    private router: Router, 
    private formBuilder: FormBuilder
    ) {
      this.form = this.formBuilder.group(
        {
          email: ['', [Validators.required, Validators.email]],
          contraseña: ['', [Validators.required, Validators.minLength(6)]]
        }
      );
    }

  ngOnInit(): void {
    
  }

  onSubmit(event: Event) : void {
    event.preventDefault;

    if(this.authService.login(this.form.value))
      this.router.navigate(['inicio']);
  }

  get Email() {
    return this.form.get('email');
  }

  get Contraseña() {
    return this.form.get('contraseña');
  }

}
