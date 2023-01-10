import { UsuariosComponent } from './usuarios/usuarios.component';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './home/home.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthService],
    children: [
      {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [AuthService],
      },
      {
        path: 'usuarios/:id',
        component: CadastroComponent,
        canActivate: [AuthService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
