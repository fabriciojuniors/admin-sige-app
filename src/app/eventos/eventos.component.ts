import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BASE_URL } from '../app.component';
import { Eventos } from '../models/eventos';
import { EventosService } from '../services/eventos.service';
import { ToastMessageComponent } from '../shared/toast-message/toast-message.component';

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
  eventos : Eventos[] = [];
  showLoading = false;
  operacao = "Cadastrar";

  constructor(private eventosService : EventosService) { }

  @ViewChild('closeModal') closeModal: ElementRef;
  @ViewChild('toast') private toast: ToastMessageComponent;

  ngOnInit(): void {
    this.getByPage(1);
  }

  limparEventos(){

  }

  cancelar(){
    this.limparEventos();
  }

  cadastrar(){

  }

  salvar(){

  }

  getByPage(pagina){
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
      .finally( () => {
        this.showLoading = false;
      })
  }
}
