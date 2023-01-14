import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token = localStorage.getItem('token') ?? '';

  constructor(private router: Router, private http: HttpClient) {}

  buildHeaders = () =>
    new HttpHeaders().set('X-token', localStorage.getItem('token') ?? '');

  validaLogin = (token: string) =>
    this.http.post(
      'http://localhost:5000/valida',
      { token },
      {
        headers: this.buildHeaders(),
        observe: 'response',
      }
    );

  canActivate(route: ActivatedRouteSnapshot) {
    // Escrevemos uma função que retorne verdadeiro ou falso.
    // Retornando verdadeiro, a rota pode ser acessada.
    // Retornando falso, não.

    if (!this.token) {
      this.router.navigate(['/login']);
    }

    this.validaLogin(this.token).subscribe((retorno) => {
      console.log(route.url[0].toString());

      // Aqui colocamos a lógica de validação de permissões.
      if (
        route.url[0].path.includes('usuarios') &&
        (retorno as any).body.permissao != 'admin'
      ) {
        this.router.navigate(['/home']);
      }
    });
  }

  login = (email: string, senha: string) =>
    this.http.post('http://localhost:5000/login', { email, senha });

  persistToken(token: string) {
    localStorage.setItem('token', token);
    this.token = token;
  }

  getToken() {
    return this.token;
  }
}
