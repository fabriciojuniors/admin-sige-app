import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class IngressoService {

  constructor(private http : HttpClient) { }

  getByEvento(id):Observable<any>{
    return this.http.get(`${BASE_URL}/ingresso/evento/${id}`);
  }

  emitirCertificado(ids):Observable<any>{
    return this.http.post(`${BASE_URL}/relatorio/certificado`, ids)
  }
}
