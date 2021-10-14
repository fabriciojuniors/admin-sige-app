import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../models/usuario';
import { LoginService } from '../services/login.service';
import { ToastMessageComponent } from '../shared/toast-message/toast-message.component';

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
  public errorA = [];

  @ViewChild('closeModal') closeModal: ElementRef;
  @ViewChild('toast') private toast: ToastMessageComponent;

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
    if(this.usuarioCE.endereco.uf == "#" || this.usuarioCE.endereco.uf == "") this.usuarioCE.endereco.uf = null 
    if(this.usuarioCE.sexo == "#" || this.usuarioCE.sexo == "") this.usuarioCE.sexo = null 
    if(this.usuarioCE.nivel == "#" || this.usuarioCE.nivel == "") this.usuarioCE.nivel = null 
    this.loginService.salvar(this.usuarioCE).toPromise()
      .then(res => {
        this.getAll();
        this.closeModal.nativeElement.click();
        this.toast.showToast("S", ["Salvo com sucesso."]);
      })
      .catch(err => {
        console.log(err);
        
        if(err.error.mensagem){
          this.error = err.error.mensagem;
          this.toast.showToast("W", err.error.mensagem)
        }else if(err.error){
          let erros = JSON.stringify(err.error);
          erros = erros.split("{").join("");
          erros = erros.split("}").join("")
          erros = erros.split("\"").join("");
          erros = erros.split(":").join(": ");
          let errosA = erros.split(",");
          this.errorA = errosA;
          this.toast.showToast("W", this.errorA)
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
    this.errorA = [];
    document.getElementById("collapseEndereco").classList.remove("show");
    document.getElementById("collapseAcesso").classList.remove("show");
  }

  excluir(usuario){
    if(confirm("Confirma a exclusão do usuário " + usuario.nome)){
      this.loginService.excluir(usuario.id).toPromise()
        .then(res => {
          this.getAll();
          this.toast.showToast("S", ["Registro excluído com sucesso"]);
        })
        .catch(err => {
          this.toast.showToast("W", err.error.mensagem  + err.error.detalhes);
          this.getAll();
        })
    }
    
  }

}
