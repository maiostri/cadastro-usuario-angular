import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Usuario from '../model/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  adicionaUsuario = (usuario: Usuario) =>
    this.http.post('http://localhost:5000/signup', usuario);

  login = (email: string, senha: string) =>
    this.http.post('http://localhost:5000/login', { email, senha });

  validaLogin = (token: string) =>
    this.http.post('http://localhost:5000/valida', { token });
}
