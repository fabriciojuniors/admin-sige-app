import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastMessageComponent } from '../shared/toast-message/toast-message.component';

@Component({
  selector: 'app-acompanhar-eventos',
  templateUrl: './acompanhar-eventos.component.html',
  styleUrls: ['./acompanhar-eventos.component.css']
})
export class AcompanharEventosComponent implements OnInit {

  @ViewChild('toast') private toast: ToastMessageComponent;
  constructor() { }

  ngOnInit(): void {
  }

}
