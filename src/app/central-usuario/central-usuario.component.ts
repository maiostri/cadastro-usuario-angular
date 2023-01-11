import { Subscription } from 'rxjs';
import { UsersService } from './../services/users.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-central-usuario',
  templateUrl: './central-usuario.component.html',
  styleUrls: ['./central-usuario.component.css'],
})
export class CentralUsuarioComponent {
  subscriptionAdicionados: Subscription;
  subscriptionRemovidos: Subscription;

  totalDeUsuariosAdicionados: number = 0;
  totalDeUsuariosRemovidos: number = 0;

  constructor(private userService: UsersService) {
    this.subscriptionAdicionados =
      this.userService.usuarioAdicionadoObservable.subscribe(
        (usuario) => this.totalDeUsuariosAdicionados++
      );

    this.subscriptionRemovidos =
      this.userService.usuarioRemovidoObservable.subscribe(
        (usuario) => this.totalDeUsuariosRemovidos++
      );
  }
}
