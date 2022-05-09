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
  
  formLogin: FormGroup;
  loginError: Boolean = false;
  
  constructor(
    private datosPortfolio: DatosPortfolioService,
    private authService: AuthService,
    private router: Router, 
    private formBuilder: FormBuilder
    ) {
      this.formLogin = this.formBuilder.group(
        {
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(7)]]
        }
      );
    }

  ngOnInit(): void { }
  
  
  onSubmit(event: Event) {
    event.preventDefault;

    this.authService.login(this.formLogin.value).subscribe(
      (response: Boolean) => {
        if (response)
          this.router.navigate(['/inicio']);
        else
          this.loginError = true;
      }
    );
  }

  get Email() {
    return this.formLogin.get('email');
  }

  get Password() {
    return this.formLogin.get('password');
  }

}
