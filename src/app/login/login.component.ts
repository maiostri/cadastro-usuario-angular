import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  hasError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: Router,
  ) {}

  loginForm = this.formBuilder.group({
    email: '',
    senha: '',
  });

  onSubmit() {
    this.authService.login(
      this.loginForm.value.email ?? '',
      this.loginForm.value.senha ?? ''
    ).subscribe({
      next: (retorno) => {
        this.authService.persistToken((retorno as any).accessToken);
        this.route.navigate(["/home"]);
      },
      error: (error) => {
        this.hasError = true;
      }
    } 
    )
  }
}
