import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { UsersService } from './../services/users.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private usuarioService: UsersService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: Router,
  ) {}

  loginForm = this.formBuilder.group({
    email: '',
    senha: '',
  });

  onSubmit() {
    this.usuarioService.login(
      this.loginForm.value.email ?? '',
      this.loginForm.value.senha ?? ''
    ).subscribe((retorno) => {
      this.authService.persistToken((retorno as any).accessToken);
      this.route.navigate(["/home"]);
    })
  }
}
