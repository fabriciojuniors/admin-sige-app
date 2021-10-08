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
  usuario = {
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
  showLoading = false;

  constructor(private loginService: LoginService,
    private router: Router) {
    localStorage.clear();
  }

  ngOnInit(): void {

  }

  entrar() {
    this.showLoading = true;
    this.loginService.login(this.usuario).toPromise()
      .then(res => {
        this.showLoading = false;
        let usuario = res;       
        if (usuario.nivel != "A") {
          this.error = "Acesso negado!"
        } else {
          this.loginService.setUsuario(usuario);
          localStorage.setItem("usuario", JSON.stringify(usuario));
          this.router.navigateByUrl("dashboard");
        }
      })
      .catch(err => {
        this.showLoading = false;
        this.error = err.error.mensagem;
      })
  }

}
