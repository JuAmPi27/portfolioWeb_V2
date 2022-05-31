import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { config } from 'src/assets/data/config/Config';
import { LoginDto } from 'src/assets/data/loginDto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient) { }

  public login(credentials: LoginDto) : Observable<Boolean> {
    return this.http.post<Boolean> (config.baseUrl + "login", credentials).pipe(
      tap((response: Boolean) => {
        if (response)
          sessionStorage.setItem("user", "jpbarnetche27");
      })
    );
  }

  public logout() {
    sessionStorage.removeItem("user");
  }

  public isUserLogged(): boolean {
    return sessionStorage.getItem("user") !==null;
  }

}
