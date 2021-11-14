import { Component, OnInit, ViewChild } from '@angular/core';
import { Carrinho } from '../models/carrinho';
import { CarrinhoService } from '../services/carrinho.service';
import { ToastMessageComponent } from '../shared/toast-message/toast-message.component';

@Component({
  selector: 'app-autorizar-pagamento',
  templateUrl: './autorizar-pagamento.component.html',
  styleUrls: ['./autorizar-pagamento.component.css']
})
export class AutorizarPagamentoComponent implements OnInit {

  carrinhos:Carrinho[];
  isLoading = false;
  @ViewChild('toast') private toast: ToastMessageComponent;
  constructor(private carrinhoService : CarrinhoService) { }

  ngOnInit(): void {
    this.getPendentes();
    
  }

  getPendentes(){
    this.isLoading = true;
    this.carrinhos = [];
    this.carrinhoService.getPendentes().subscribe(
      value => {this.carrinhos = value; this.isLoading = false}
    )
  }

  autorizar(carrinho){
    this.carrinhoService.autorizar(carrinho.id).subscribe(
      value => {
        this.toast.showToast('S', ['Pagamento aprovado com sucesso.'])
        this.getPendentes();
      }
    )
  }

  negar(carrinho){
    this.carrinhoService.negar(carrinho.id).subscribe(
      value => {
        this.toast.showToast('S', ['Pagamento negado com sucesso.'])
        this.getPendentes();
      }
    )
  }

}
