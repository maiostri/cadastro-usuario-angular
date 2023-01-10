import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Usuario from '../model/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  adicionaUsuario = (usuario: Usuario) =>
    this.http.post('http://localhost:5000/signup', usuario);

  listaUsuarios = (): Observable<Usuario[]> => {
    return this.http.get<Usuario[]>('http://localhost:5000/usuarios', {
      headers: this.authService.buildHeaders(),
    });
  };

  retornaUsuario = (id: String) =>
    this.http.get<Usuario>(`http://localhost:5000/usuarios/${id}`);

  atualizaUsuario = (usuario: Usuario) =>
    this.http.put(`http://localhost:5000/usuarios/${usuario._id}`, usuario);

  removerUsuario = (id: string) =>
    this.http.delete(`http://localhost:5000/usuarios/${id}`);
}
