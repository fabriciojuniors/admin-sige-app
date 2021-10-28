import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  constructor(private http : HttpClient) { }

  getPage(pagina: number): Observable<any>{
    return this.http.get(BASE_URL+"/evento/?pagina="+pagina);
  }
}
