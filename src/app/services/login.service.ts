import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../app.component';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public usuario: Usuario = {
    id: 0,
    cpf: "",
    nome: "",
    sexo: "",
    nascimento: "",
    telefone: "",
    endereco: {
      id: 0,
      rua: "",
      numero: 0,
      uf: "",
      cidade: "",
      complemento: "",
      cep: ""
    },
    cartoes: null,
    nivel: "",
    email: "",
    senha: ""
  };

  constructor(private http: HttpClient) {
    this.usuario = {
      id: 0,
      cpf: "",
      nome: "",
      sexo: "",
      nascimento: "",
      telefone: "",
      endereco: {
        id: 0,
        rua: "",
        numero: 0,
        uf: "",
        cidade: "",
        complemento: "",
        cep: ""
      },
      cartoes: null,
      nivel: "",
      email: "",
      senha: ""
    };

    if (localStorage.getItem("usuario")) {
      let usuarioId = localStorage.getItem("usuario");
      this.getById(usuarioId).toPromise()
        .then(res => {
          this.usuario = res;
        })
        .catch(err => {
          console.log(err);
        })
    }

  }

  setUsuario(usuario: Usuario) {
    this.usuario = usuario;
  }

  isAuthenticated() {
    let usuarioId = localStorage.getItem("usuario");
    let isAuthenticated = false;

    if(this.usuario.id > 0 || usuarioId){
      isAuthenticated = true;
    }
    
    return isAuthenticated;
  }

  getById(id): Observable<any> {
    return this.http.get(BASE_URL + "/usuario/busca/" + id);
  }

  login(usuario: Usuario): Observable<any> {
    return this.http.post(BASE_URL + "/usuario/autenticar", usuario);
  }
}
