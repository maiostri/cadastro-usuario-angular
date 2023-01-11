import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';
import Usuario from '../model/usuario';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  hasError: boolean = false;
  searchField: FormControl = new FormControl();

  constructor(private usuarioService: UsersService) {}

  ngOnInit(): void {
    this.usuarioService.listaUsuarios().subscribe({
      next: (response) => {
        this.usuarios = response;
      },
      error: (error) => {
        this.hasError = true;
      },
    });

    this.searchField.valueChanges // Estou com a referência do observable de mudança
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        // map
        // transformar um valor em outro
        // pega o valor do input e transforma -> fazer uma api e devolver o resultado
        switchMap((pesquisa) => this.usuarioService.buscaUsuario(pesquisa))
      )
      .subscribe((usuarios) => (this.usuarios = usuarios));
  }

  remover(user: Usuario): void {
    // Faz a remoção, caso ela tenha sido feita com sucesso, filtro a lista.
    // Poderia fazer também uma chamada para listagem.
    this.usuarioService.removerUsuario(user).subscribe({
      next: (response) => {
        this.usuarios = this.usuarios.filter(
          (usuario) => usuario._id != user._id
        );
      },
    });
  }
}
