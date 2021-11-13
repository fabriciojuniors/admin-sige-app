import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'admin-sige-app';
}

export const BASE_URL = "https://sige-app.herokuapp.com";
//export const BASE_URL = "http://localhost:8080";
