import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  githubUrl = "https://github.com/JuAmPi27?tab=repositories";
  isUserLogged: Boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();
  }

  logout(): void {
    this.authService.logout();
    this.isUserLogged = false;
    window.location.reload();
  }

}
