import { Component, OnInit, ViewChild } from '@angular/core';
import { error } from 'console';
import { Ingresso } from '../models/carrinho';
import { Eventos } from '../models/eventos';
import { EventosService } from '../services/eventos.service';
import { IngressoService } from '../services/ingresso.service';
import { ToastMessageComponent } from '../shared/toast-message/toast-message.component';

@Component({
  selector: 'app-emitir-certificado',
  templateUrl: './emitir-certificado.component.html',
  styleUrls: ['./emitir-certificado.component.css']
})
export class EmitirCertificadoComponent implements OnInit {

  eventos: Eventos[];
  ingressos: Ingresso[];
  selecionados: boolean = false;

  @ViewChild('toast') private toast: ToastMessageComponent;
  constructor(private eventoService: EventosService, private ingressoServive: IngressoService) { }

  ngOnInit(): void {
    this.getEventos();
  }

  getEventos() {
    this.eventoService.getAll().subscribe(
      value => { this.eventos = value; }
    )
  }

  loadIngresso(event) {
    this.ingressos = null;
    let evento = event.target.value;

    if (evento == "#") {
      return;
    }

    this.ingressoServive.getByEvento(evento).subscribe(
      value => {
        this.ingressos = value;
      },
      error => {
        if (error.error.mensagem) {
          this.toast.showToast("W", [error.error.mensagem])
          return;
        }
        if (error.error) {
          let erros = JSON.stringify(error.error);
          erros = erros.split("{").join("");
          erros = erros.split("}").join("")
          erros = erros.split("\"").join("");
          erros = erros.split(":").join(": ");
          let errosA = erros.split(",");
          this.toast.showToast("W", [errosA])
        }
      }
    )

  }

  hasSelecionado() {
    let ingressos = document.querySelectorAll(".emitir-certificado");
    let selecionado = false;
    ingressos.forEach((ingresso) => {
      let i = ingresso as HTMLInputElement;
      if (i.checked) {
        selecionado = true;
      }
    });
    this.selecionados = selecionado;
  }

  emitirCertificado() {
    let ingressos = document.querySelectorAll(".emitir-certificado");
    let ids = [];

    ingressos.forEach((i) => {
      let ingresso = i as HTMLInputElement;
      if (ingresso.checked) {
        let id = ingresso.id;
        let i = parseInt(id.split("-")[1]);
        ids.push(i);
      }
    })

    this.ingressoServive.emitirCertificado(ids).subscribe();
    this.toast.showToast("S", ["Certificados encaminhados para emissão"]);
    this.getEventos();
    this.loadIngresso("#")
    this.selecionados = false;

  }

}
