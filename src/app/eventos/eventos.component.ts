import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BASE_URL } from '../app.component';
import { Eventos } from '../models/eventos';
import { EventosService } from '../services/eventos.service';
import { ToastMessageComponent } from '../shared/toast-message/toast-message.component';
import { Local } from '../models/local';
import { Parceiro } from '../models/parceiro';
import { ParceiroService } from '../services/parceiro.service';
import { LocalService } from '../services/local.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  URL_RELATORIO = BASE_URL + "/relatorio/eventos";

  public proximo: boolean = false;
  paginasTotais: number;
  pagina: number;

  local: Local = {
    id: 0,
    nome: "",
    informacoesAdicionais: "",
    endereco: {
      id: 0,
      rua: "",
      numero: "",
      uf: "SC",
      cidade: "",
      complemento: "",
      cep: ""
    },
    capacidade: 1,
    telefone: ""
  }
  locaisListagem = [];

  eventos: Eventos[] = [];

  parceiros: Parceiro[] = [];
  parceirosListagem = [];
  parceiroSelect = 0;
  data = new Date().toISOString().slice(0, 10);
  evento: Eventos = {
    id: 0,
    nome: "",
    detalhes: "",
    data: this.data,
    hora: "00:00",
    duracao: 0,
    local: this.local,
    parceiros: this.parceiros,
    valorIngresso: 0,
    geraCertificado: false
  };

  showLoading = false;
  operacao = "Cadastrar";
  constructor(private eventosService: EventosService, private parceiroService: ParceiroService, private localService: LocalService) { }

  @ViewChild('closeModal') closeModal: ElementRef;
  @ViewChild('toast') private toast: ToastMessageComponent;

  ngOnInit(): void {
    this.getByPage(1);
    this.getByPageParceiro();
    this.getByPageLocal();
  }

  converterImagem(evento) {
    let fileList: FileList = evento.target.files;
    const file: File = fileList[0];
    let reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = () => {
      //this.evento.imagem64 = reader.result.toString();
    }
  }

  limparEventos() {
    this.local = {
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
    }
    this.parceiros = [];
    this.parceiroSelect = 0;
    this.evento = {
      id: 0,
      nome: "",
      detalhes: "",
      data: this.data,
      hora: "00:00",
      duracao: 0,
      local: this.local,
      parceiros: this.parceiros,
      valorIngresso: 0,
      geraCertificado: false
    };
  }

  cancelar() {
    this.operacao = "Cadastrar"
    document.getElementById("collapseEndereco").classList.remove("show");
    document.getElementById("collapseImagem").classList.remove("show");
    document.getElementById("collapseLocal").classList.remove("show");
    this.limparEventos();
  }

  editar(evento) {
    this.operacao = "Editar"
    this.evento = evento;
    this.parceiros = evento.parceiros;
  }

  excluir(evento) {
    if (confirm("Confirma a exclusão do evento?")) {
      this.eventosService.excluir(evento.id).toPromise()
        .then(res => {
          this.getByPage(1);
          this.closeModal.nativeElement.click();
          this.toast.showToast("S", ["Registro excluído com sucesso."]);
        })
        .catch(err => {
          if (err.error.mensagem) {
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
            this.toast.showToast("W", [errosA])
          }
        })
    }
  }

  cadastrar() { }

  async salvar() {
    
    this.showLoading = true;

    if (this.evento.hora.length <= 5) {
      this.evento.hora = `${this.evento.hora}:00`
    }

    if (!this.evento.parceiros || this.evento.parceiros.length == 0) {
      this.evento.parceiros = null;
    }

    await this.localService.getById(this.evento.local.id).toPromise()
      .then(res => {
        this.evento.local = res;
      })
      .catch(err => {
        if (err.error.mensagem) {
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
          this.toast.showToast("W", [errosA])
        }
      })
      .finally(() => {
        this.showLoading = false;
      });

    this.eventosService.salvar(this.evento).toPromise()
      .then(res => {
        this.closeModal.nativeElement.click();
        this.toast.showToast("S", ["Salvo com sucesso."]);
      })
      .catch(err => {
        if (err.error.mensagem) {
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
          this.toast.showToast("W", errosA)
        }
      })
      .finally(() => {
        this.showLoading = false;
        this.getByPage(1);
      });

  }

  getByPage(pagina) {
    if (!this.proximo && pagina > this.pagina) {
      return;
    }
    this.showLoading = true;
    this.eventosService.getPage(pagina).toPromise()
      .then(res => {
        this.eventos = res.content;
        this.proximo = !res.last;
        this.paginasTotais = res.totalPages;
        this.pagina = res.number + 1;
      })
      .catch(err => {
        console.log(err);

      })
      .finally(() => {
        this.showLoading = false;
      })
  }

  getByPageParceiro() {
    this.parceiroService.getAll().toPromise()
      .then(res => {
        this.parceirosListagem = res;

      })
      .catch(err => {
        console.log(err);

      })
  }

  getByPageLocal() {
    this.localService.getAll().toPromise()
      .then(res => {
        this.locaisListagem = res;

      })
      .catch(err => {
        console.log(err);

      })
  }

  addParceiro() {
    if (this.parceiroSelect == 0) {
      return;
    }

    this.parceirosListagem.map((parceiro) => {
      if (parceiro.id == this.parceiroSelect) {
        if (!this.parceiros.includes(parceiro)) {
          this.parceiros.push(parceiro);
        }
      }
    })
  }

  removeParceiro(parceiro) {
    this.parceiros.splice(this.parceiros.indexOf(parceiro), 1);
  }
}
