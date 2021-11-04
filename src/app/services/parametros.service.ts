import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {

  constructor(private http : HttpClient) { }

  save(parametro):Observable<any>{
    return this.http.post(`${BASE_URL}/parametros`, parametro);
  }

  get():Observable<any>{
    return this.http.get(`${BASE_URL}/parametros/1`);
  }
}
