import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from './supplier';

@Injectable({
  providedIn: 'root'
})
export class FornecedoresService {

  url = "http://localhost:3000/suppliers";

  constructor(private http: HttpClient) { }


  listar(): Observable<Supplier[]> {

      return this.http.get<Supplier[]>(this.url);
  }

  criar(obj : Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(this.url, obj);
  }

  alterar(obj : Supplier, id : number): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`,obj);
  }

  remover(obj : Supplier): Observable<void>{
    return this.http.delete<void>(`${this.url}/${obj.id}`);
  }
}
