import { CadastroRoutingModule } from './cadastro-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CadastroComponent } from './cadastro.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [CadastroComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CadastroRoutingModule
  ]
})
export class CadastroModule { }
