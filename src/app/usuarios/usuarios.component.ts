import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';
import Usuario from '../model/usuario';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  hasError: boolean = false;
  
  constructor(private usuarioService: UsersService) {}

  ngOnInit(): void {
    this.usuarioService.listaUsuarios().subscribe({
      next: (response) => { this.usuarios = response },
      error: (error) => { this.hasError = true }
    });
  }

  remover(id: string):void {
    // Faz a remoção, caso ela tenha sido feita com sucesso, filtro a lista.
    // Poderia fazer também uma chamada para listagem.
    this.usuarioService.removerUsuario(id).subscribe({
      next: (response) => { this.usuarios = this.usuarios.filter(usuario => usuario._id != id)}
    })
  }
}
