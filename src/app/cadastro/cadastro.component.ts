import { Router } from '@angular/router';
import { UsersService } from './../services/users.service';
import { Component } from '@angular/core';
import Usuario from '../model/usuario';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent {
  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private route: Router
  ) {}

  cadastroForm = this.formBuilder.group({
    nome: '',
    email: '',
    senha: '',
  });

  onSubmit() {
    // Aqui vamos enviar os dados para backend.
    // Interações com camadas de dados devem ser feitas pelo service.
    const usuario = new Usuario(
      this.cadastroForm.value.nome ?? '',
      this.cadastroForm.value.email ?? '',
      this.cadastroForm.value.senha ?? ''
    );
    this.usersService.adicionaUsuario(usuario).subscribe((retorno) => {
      console.log(retorno);
      this.route.navigate(['/login']);
    });
  }
}
