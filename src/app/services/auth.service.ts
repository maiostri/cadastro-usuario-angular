import { UsersService } from './users.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token = localStorage.getItem("token") ?? '';

  constructor(private usersService: UsersService, private router: Router) { }
  
  canActivate(route: ActivatedRouteSnapshot) {
      // Escrevemos uma função que retorne verdadeiro ou falso.
      // Retornando verdadeiro, a rota pode ser acessada.
      // Retornando falso, não.  

      if (!this.token) {
        this.router.navigate(["/login"]);
      }

      this.usersService.validaLogin(this.token).subscribe((retorno) => {
        console.log("validado!");
      })
  }

  persistToken(token: string) {
    this.token = token;
  }
}
