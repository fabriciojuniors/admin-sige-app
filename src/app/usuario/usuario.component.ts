import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../models/usuario';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  public proximo: boolean = false;
  paginasTotais: number;
  pagina: number;
  usuarios: Usuario[] = [];
  public usuarioCE : Usuario = {
    id: 0,
    cpf: "",
    nome: "",
    sexo: "#",
    nascimento: "",
    telefone: "",
    endereco: {
      id: 0,
      rua: "",
      numero: 0,
      uf: "#",
      cidade: "",
      complemento: "",
      cep: ""
    },
    cartoes: null,
    nivel: "#",
    email: "",
    senha: ""
  };
  tipo: string = "T";
  operacao = "Cadastrar";
  public showloading: boolean = false;
  public error;

  @ViewChild('closeModal') closeModal: ElementRef;


  constructor(private loginService: LoginService) { }
  ngOnInit(): void {
    this.getAll();
  }

  limparUsuario(){
    this.usuarioCE = {
      id: 0,
      cpf: "",
      nome: "",
      sexo: "#",
      nascimento: "",
      telefone: "",
      endereco: {
        id: 0,
        rua: "",
        numero: 0,
        uf: "#",
        cidade: "",
        complemento: "",
        cep: ""
      },
      cartoes: null,
      nivel: "#",
      email: "",
      senha: ""
    };
  }

  getAll() {
    this.loginService.getPage(this.tipo, 1).toPromise()
      .then(res => {
        this.usuarios = res.content;
        this.proximo = !res.last;
        this.paginasTotais = res.totalPages;
        this.pagina = res.number + 1;
      })
      .catch(err => {
        console.log(err);
      })
  }

  getByPage(pagina) {    
    if(!this.proximo && pagina > this.pagina){
      return;
    }
    
    this.loginService.getPage(this.tipo, pagina).toPromise()
      .then(res => {
        this.usuarios = res.content;
        this.proximo = !res.last;
        this.paginasTotais = res.totalPages;
        this.pagina = res.number + 1;
        
      })
      .catch(err => {
        console.log(err);
      })
  }

  cadastrar(){
    this.operacao = "Cadastrar";
    this.limparUsuario();
  }

  editar(usuario){
    this.usuarioCE = usuario;      
    this.operacao = "Editar";
  }

  salvar(){
    this.showloading = true;    
    this.loginService.salvar(this.usuarioCE).toPromise()
      .then(res => {
        this.getAll();
        this.closeModal.nativeElement.click();
      })
      .catch(err => {
        if(err.error.mensagem){
          this.error = err.error.mensagem;
        }else{
          this.error = err.message;
        }
      })
      .finally( ()=>{
        this.showloading = false;
      });     
    
  }

  cancelar(){
    this.limparUsuario();
    this.error = "";
  }

}
