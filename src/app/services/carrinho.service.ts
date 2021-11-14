import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  constructor(private http : HttpClient) { }

  getPendentes():Observable<any>{
    return this.http.get(`${BASE_URL}/carrinho/pendentes-autorizacao`);
  }

  autorizar(id):Observable<any>{
    return this.http.post(`${BASE_URL}/carrinho/autorizar/${id}`, {});
  }
  negar(id):Observable<any>{
    return this.http.post(`${BASE_URL}/carrinho/negar/${id}`, {});
  }
}
