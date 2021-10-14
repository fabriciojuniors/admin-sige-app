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
  msgs = [];
  constructor() { }

  ngOnInit(): void {
    let toast = document.getElementById("myToast");
    this.toast = new Toast(toast, {});
  }

  showToast(tipo, mensagem){
    console.log(mensagem);
    
    this.msgs = mensagem;
    let icon = "";
    switch (tipo) {
      case "S":
        icon = "<i class='fas fa-check-circle' style='color: green;'></i>";
        break;
      case "W":
        icon = "<i class='fas fa-exclamation-triangle' style='color: red;'></i>";
        break;
    }

    for(let i = 0; i < mensagem.length; i++){

      let dvToast = document.createElement("div");
      //dvToast.setAttribute("style", "margin-bottom: 30px; margin-left: 5px;")
      dvToast.setAttribute("id", "myToast-"+i);
      dvToast.setAttribute("aria-live", "assertive");
      dvToast.setAttribute("aria-atomic", "true");
      dvToast.setAttribute("data-bs-delay", "5000");
      dvToast.setAttribute("role", "alert");
      dvToast.classList.add("toast");
      dvToast.classList.add("bg-dark");
      dvToast.classList.add("align-items-center");

      let dbBody = document.createElement("div");
      dbBody.classList.add("toast-body");
      dbBody.setAttribute("style", "color: white");
      dbBody.innerHTML = icon + "  " + mensagem[i];

      dvToast.appendChild(dbBody);
      document.getElementById("container").appendChild(dvToast);


      let toast = document.getElementById("myToast-"+i);
      let toastEl = new Toast(toast, {});
      toastEl.show();
    }
    
  }

}
