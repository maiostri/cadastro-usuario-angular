import { UsuarioRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UsuariosComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsuarioRoutingModule
  ]
})
export class UsuariosModule { }
