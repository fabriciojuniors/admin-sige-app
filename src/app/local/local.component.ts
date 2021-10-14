import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Local } from '../models/local';
import { LocalService } from '../services/local.service';
import { ToastMessageComponent } from '../shared/toast-message/toast-message.component';

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.css']
})
export class LocalComponent implements OnInit {

  public proximo: boolean = false;
  paginasTotais: number;
  pagina: number;
  locais: Local[] = [];
  public localCE: Local = {
    id: 0,
    nome: "",
    informacoesAdicionais: "",
    endereco: {
      id: 0,
      rua: "",
      numero: "",
      uf: "#",
      cidade: "",
      complemento: "",
      cep: ""
    },
    capacidade: 1,
    telefone: ""
  };
  tipo: string = "T";
  operacao = "Cadastrar";
  public showloading: boolean = false;
  public error;
  public errorA = [];

  @ViewChild('closeModal') closeModal: ElementRef;
  @ViewChild('toast') private toast: ToastMessageComponent;

  constructor(private localService: LocalService) { }

  ngOnInit(): void {
    this.getByPage(1);
  }

  cancelar(){
    this.limparLocal();
    document.getElementById("collapseEndereco").classList.remove("show");
    this.error = "";
    this.errorA = [];
  }

  limparLocal(){
    this.localCE = {
      id: 0,
      nome: "",
      informacoesAdicionais: "",
      endereco: {
        id: 0,
        rua: "",
        numero: "",
        uf: "#",
        cidade: "",
        complemento: "",
        cep: ""
      },
      capacidade: 1,
      telefone: ""
    };
  }

  cadastrar(){
    this.operacao = "Cadastrar";
    this.limparLocal();
  }

  editar(local){
    this.localCE = local;      
    this.operacao = "Editar";
  }

  getByPage(pagina) {
    if (!this.proximo && pagina > this.pagina) {
      return;
    }

    this.localService.getPage(pagina).toPromise()
      .then(res => {
        this.locais = res.content;
        this.proximo = !res.last;
        this.paginasTotais = res.totalPages;
        this.pagina = res.number + 1;

      })
      .catch(err => {
        console.log(err);
      })
  }

  salvar(){
    this.showloading = true;
    this.localService.salvar(this.localCE).toPromise()
      .then(res => {
        this.getByPage(1);
        this.closeModal.nativeElement.click();
        this.toast.showToast("S", ["Salvo com sucesso."]);
      })
      .catch(err => {        
        if(err.error.mensagem){
          this.errorA.push(err.error.mensagem);
          this.error = err.error.mensagem;
        }else if(err.error){
          let erros = JSON.stringify(err.error);
          erros = erros.split("{").join("");
          erros = erros.split("}").join("")
          erros = erros.split("\"").join("");
          erros = erros.split(":").join(": ");
          let errosA = erros.split(",");
          this.errorA = errosA;
          this.toast.showToast("W", this.errorA);
          
        }else{
          this.error = err.message;
        }        
      })
      .finally( ()=>{
        this.showloading = false;
      });     
    
  }

  excluir(local){
    if(confirm("Confirma a exclusão do local " + local.nome)){
      this.localService.excluir(local.id).toPromise()
        .then(res => {
          this.getByPage(1);
          this.toast.showToast("S", ["Registro excluído com sucesso"]);
        })
        .catch(err => {
          this.toast.showToast("W", [err.error.mensagem  + err.error.detalhes]);
          this.getByPage(1);
        })
    }
    
  }

}
