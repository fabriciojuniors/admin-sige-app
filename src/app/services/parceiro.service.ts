import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class ParceiroService {

  constructor(private http : HttpClient) { }

  getPage(pagina: number): Observable<any>{
    return this.http.get(BASE_URL+"/parceiro/?pagina="+pagina);
  }

  getAll(): Observable<any>{
    return this.http.get(BASE_URL+"/parceiro/all");
  }

  salvar(parceiro):Observable<any>{
    return this.http.post(BASE_URL+"/parceiro", parceiro);
  }

  excluir(id):Observable<any>{
    return this.http.delete(BASE_URL+"/parceiro/"+id);
  }
}
