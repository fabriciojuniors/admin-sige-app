import { Component, Injectable, OnInit } from '@angular/core';
import { Toast } from 'bootstrap';

@Component({
  selector: 'app-toast-message',
  templateUrl: './toast-message.component.html',
  styleUrls: ['./toast-message.component.css']
})
@Injectable()
export class ToastMessageComponent implements OnInit {
  toast: Toast | null = null;
  showSuccess = false;
  showWarning = false;
  mensagem = "";
  constructor() { }

  ngOnInit(): void {
    let toast = document.getElementById("myToast");
    this.toast = new Toast(toast, {});
  }

  showToast(tipo, mensagem){
    this.mensagem = mensagem;

    switch (tipo) {
      case "S":
        this.showSuccess = true;
        this.showWarning = false
        break;
      case "W":
        this.showSuccess = false;
        this.showWarning = true;
        break;
    }

    this.toast.show();
  }

}
