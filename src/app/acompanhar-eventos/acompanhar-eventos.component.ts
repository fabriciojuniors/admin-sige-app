import { Component, OnInit, ViewChild } from '@angular/core';
import { BASE_URL } from '../app.component';
import { Eventos } from '../models/eventos';
import { EventosService } from '../services/eventos.service';
import { ToastMessageComponent } from '../shared/toast-message/toast-message.component';

@Component({
  selector: 'app-acompanhar-eventos',
  templateUrl: './acompanhar-eventos.component.html',
  styleUrls: ['./acompanhar-eventos.component.css']
})
export class AcompanharEventosComponent implements OnInit {

  @ViewChild('toast') private toast: ToastMessageComponent;
  public proximo: boolean = false;
  paginasTotais: number;
  pagina: number;
  eventos: Eventos[] = [];
  showLoading = false;

  URL_RELATORIO = BASE_URL + "/relatorio/eventos";

  constructor(private eventosService : EventosService) { }

  ngOnInit(): void {
    this.getByPage(1);
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

}
