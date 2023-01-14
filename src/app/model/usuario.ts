export default class Usuario {
  nome: string = '';
  email: string = '';
  senha: string = '';
  _id: string = '';
  permissao: string = '';

  constructor(nome: string, email: string, senha: string, id: string) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this._id = id;
  }
}
