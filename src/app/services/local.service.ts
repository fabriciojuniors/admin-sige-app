import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor(private http : HttpClient) { }

  getPage(pagina: number): Observable<any>{
    return this.http.get(BASE_URL+"/local/?pagina="+pagina);
  }

  salvar(local):Observable<any>{
    return this.http.post(BASE_URL+"/local", local);
  }

  excluir(id):Observable<any>{
    return this.http.delete(BASE_URL+"/local/"+id);
  }
}
