import { Component, OnInit, ViewChild } from '@angular/core';
import { Parametros } from '../models/parametros';
import { ParametrosService } from '../services/parametros.service';
import { ToastMessageComponent } from '../shared/toast-message/toast-message.component';

@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styleUrls: ['./parametros.component.css']
})
export class ParametrosComponent implements OnInit {

  @ViewChild('toast') private toast: ToastMessageComponent;
  parametros: Parametros = {
    id: 0,
    qtdPessoa: 1,
    percentualCapacidade: 1
  };
  constructor(private service : ParametrosService) { }

  ngOnInit(): void {
    this.service.get().toPromise()
      .then(res => {
        this.parametros = res;
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
  }

  salvar(){
    this.service.save(this.parametros).toPromise()
    .then(res => {
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
  }

}
