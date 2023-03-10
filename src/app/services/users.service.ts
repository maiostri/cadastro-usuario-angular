import { AuthService } from './auth.service';
import { Observable, Subject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Usuario from '../model/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usuarioAdicionadoSource = new Subject<Usuario>();
  usuarioAdicionadoObservable = this.usuarioAdicionadoSource.asObservable();

  private usuarioRemovidoSource = new Subject<Usuario>();
  usuarioRemovidoObservable = this.usuarioRemovidoSource.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {}

  adicionaUsuario = (usuario: Usuario) =>
    // Estou enviando um Subject para o Observable.
    // Quem estiver "subscribred/inscrito" irá receber o valor.
    this.http
      .post('http://localhost:5000/signup', usuario)
      .pipe(tap((r) => this.usuarioAdicionadoSource.next(usuario)));

  listaUsuarios = (): Observable<Usuario[]> =>
    this.http.get<Usuario[]>('http://localhost:5000/usuarios', {
      headers: this.authService.buildHeaders(),
    });
    
  retornaUsuario = (id: String) =>
    this.http.get<Usuario>(`http://localhost:5000/usuarios/${id}`, {
      headers: this.authService.buildHeaders(),
    });

  atualizaUsuario = (usuario: Usuario) =>
    this.http.put(`http://localhost:5000/usuarios/${usuario._id}`, usuario, {
      headers: this.authService.buildHeaders(),
    });

  removerUsuario = (usuario: Usuario) =>
    this.http
      .delete(`http://localhost:5000/usuarios/${usuario._id}`, {
        headers: this.authService.buildHeaders(),
      })
      .pipe(
        // Operadores para procedimentos que não alteram o fluxo de dados(logs, )
        tap((r) => this.usuarioRemovidoSource.next(usuario))
      );

  buscaUsuario = (nome: string): Observable<Usuario[]> =>
    this.http.get<Usuario[]>(`http://localhost:5000/busca?nome=${nome}`, {
      headers: this.authService.buildHeaders(),
    });
}
