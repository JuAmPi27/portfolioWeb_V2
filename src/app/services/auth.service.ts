import { Injectable } from '@angular/core';
import { LoginDto } from 'src/assets/data/loginDto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public login(credentials: LoginDto) : boolean {
   /*if (usuario == "jpbarnetche27") {
      sessionStorage.setItem("user", "jpbarnetche27");
      return true;
    } else {
      this.logout();
      return false;
    }*/
    console.log(credentials);
    return false;
  }

  public logout() {
    sessionStorage.removeItem("user");
  }

  public isUserLogged() : boolean {
    return sessionStorage.getItem("user") !==null;
  }

}
