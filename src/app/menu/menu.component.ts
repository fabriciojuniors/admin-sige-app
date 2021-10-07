import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  usuario:Usuario;
  constructor(private loginService : LoginService) { 
    this.usuario = this.loginService.usuario;
    console.log("USUARIO: " + this.usuario.nome);
    
  }

  ngOnInit(): void {
  }

}
