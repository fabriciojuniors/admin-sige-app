import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginGuard } from '../guards/login.guard';
import { Usuario } from '../models/usuario';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: Usuario = {
    id: 0,
    cpf: "",
    nome: "",
    sexo: "M",
    nascimento: "",
    telefone: "",
    endereco: {
      id: 0,
      rua: "",
      numero: 0,
      uf: "SC",
      cidade: "",
      complemento: "",
      cep: ""
    },
    cartoes: null,
    nivel: "A",
    email: "",
    senha: ""
  };

  error = "";

  constructor(private loginService: LoginService,
    private router: Router) {
      localStorage.clear();
  }

  ngOnInit(): void {

  }

  entrar() {
    this.loginService.login(this.usuario).toPromise()
      .then(res => {
        this.usuario = res;
        this.loginService.setUsuario(this.usuario);
        localStorage.setItem("usuario", this.usuario.id + "");
        this.router.navigateByUrl("dashboard");
      })
      .catch(err => {
        this.error = err.error.mensagem;
      })
  }

}
