import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Parceiro } from '../models/parceiro';
import { ParceiroService } from '../services/parceiro.service';
import { ToastMessageComponent } from '../shared/toast-message/toast-message.component';

@Component({
  selector: 'app-parceiro',
  templateUrl: './parceiro.component.html',
  styleUrls: ['./parceiro.component.css']
})
export class ParceiroComponent implements OnInit {
  public proximo: boolean = false;
  paginasTotais: number;
  pagina: number;
  parceiros: Parceiro[] = [];
  showLoadingAll = false;
  public parceiroCE: Parceiro = {
    id: 0,
    cpf: "",
    nome: "",
    sexo: "M",
    nascimento: "1800-01-01",
    telefone: "",
    endereco: {
      id: 0,
      rua: "",
      numero: 0,
      uf: "#",
      cidade: "",
      complemento: "",
      cep: ""
    }
  };
  tipo: string = "T";
  operacao = "Cadastrar";
  public showloading: boolean = false;
  public error;
  public errorA = [];

  @ViewChild('closeModal') closeModal: ElementRef;
  @ViewChild('toast') private toast: ToastMessageComponent;

  constructor(private parceiroService: ParceiroService) { }
  ngOnInit(): void {
    this.getAll();
  }

  limparParceiro() {
    this.parceiroCE = {
      id: 0,
      cpf: "",
      nome: "",
      sexo: "M",
      nascimento: "1800-01-01",
      telefone: "",
      endereco: {
        id: 0,
        rua: "",
        numero: 0,
        uf: "#",
        cidade: "",
        complemento: "",
        cep: ""
      }
    };
  }

  getAll() {
    this.showLoadingAll = true;
    this.parceiroService.getPage(1).toPromise()
      .then(res => {
        this.parceiros = res.content;
        this.proximo = !res.last;
        this.paginasTotais = res.totalPages;
        this.pagina = res.number + 1;
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => { this.showLoadingAll = false })
  }

  getByPage(pagina) {
    if (!this.proximo && pagina > this.pagina) {
      return;
    }
    this.showLoadingAll = true;
    this.parceiroService.getPage(pagina).toPromise()
      .then(res => {
        this.parceiros = res.content;
        this.proximo = !res.last;
        this.paginasTotais = res.totalPages;
        this.pagina = res.number + 1;

      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => { this.showLoadingAll = false })
  }

  cadastrar() {
    this.operacao = "Cadastrar";
    this.limparParceiro();
  }

  editar(Parceiro) {
    this.parceiroCE = Parceiro;
    this.operacao = "Editar";
  }

  salvar() {
    this.showloading = true;
    if (this.parceiroCE.endereco.uf == "#" || this.parceiroCE.endereco.uf == "") this.parceiroCE.endereco.uf = null
    if (this.parceiroCE.sexo == "#" || this.parceiroCE.sexo == "") this.parceiroCE.sexo = null
    this.parceiroService.salvar(this.parceiroCE).toPromise()
      .then(res => {
        this.getAll();
        this.closeModal.nativeElement.click();
        this.toast.showToast("S", ["Salvo com sucesso."]);
      })
      .catch(err => {
        if (err.error.mensagem) {
          this.error = err.error.mensagem;
          this.toast.showToast("W", [err.error.mensagem])
          return;
        }
        if (err.error) {
          let erros = JSON.stringify(err.error);
          erros = erros.split("{").join("");
          erros = erros.split("}").join("")
          erros = erros.split("\"").join("");
          erros = erros.split(":").join(": ");
          let errosA = erros.split(",");
          this.errorA = errosA;
          this.toast.showToast("W", this.errorA)
        } else {
          this.error = err.message;
        }
      })
      .finally(() => {
        this.showloading = false;
      });

  }

  cancelar() {
    this.limparParceiro();
    this.error = "";
    this.errorA = [];
    document.getElementById("collapseEndereco").classList.remove("show");
  }

  excluir(Parceiro) {
    if (confirm("Confirma a exclusão do usuário " + Parceiro.nome)) {
      this.parceiroService.excluir(Parceiro.id).toPromise()
        .then(res => {
          this.getAll();
          this.toast.showToast("S", ["Registro excluído com sucesso"]);
        })
        .catch(err => {
          this.toast.showToast("W", err.error.mensagem + err.error.detalhes);
          this.getAll();
        })
    }

  }

}
