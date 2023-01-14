import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';
import Usuario from '../model/usuario';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {
  
  id: string = "";
  
  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  
  
  ngOnInit(): void {
    // Precisamos recuperar o id
    // Com o id buscaremos o registro na api.
    // Com os dados em mãos, preenchemos o form.
    this.id = this.activatedRoute.snapshot.params["id"];

    // O id existe entao, estamos usando a tela para edição.
    if (this.id) {
      this.usersService.retornaUsuario(this.id).subscribe({
        next: (usuario) => {
          console.log(usuario);

          this.cadastroForm = this.formBuilder.group({
            nome: usuario.nome,
            email: usuario.email,
            senha: '',
            permissao: usuario.permissao
          });
        },
        error: (error) => console.error(error)
      })
    }

  }

  cadastroForm = this.formBuilder.group({
    nome: '',
    email: '',
    senha: '',
    permissao: ''
  });

  onSubmit() {
    // Aqui vamos enviar os dados para backend.
    // Interações com camadas de dados devem ser feitas pelo service.
    const usuario = new Usuario(
      this.cadastroForm.value.nome ?? '',
      this.cadastroForm.value.email ?? '',
      this.cadastroForm.value.senha ?? '',
      ''
    );

    // Se tem id, precisamos editar.
    // Se não tem id é pra inserir.
    if (this.id) {
      usuario._id = this.id;
      usuario.permissao = this.cadastroForm.value.permissao ?? '';
      this.usersService.atualizaUsuario(usuario).subscribe({
        next: (retorno) => this.route.navigate(["/home/usuarios"])
      });
    } else {
      this.usersService.adicionaUsuario(usuario).subscribe((retorno) => {
        console.log(retorno);
        this.route.navigate(['/login']);
      });
    }
  }
}
