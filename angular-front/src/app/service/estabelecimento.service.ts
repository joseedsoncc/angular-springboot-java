import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Estabelecimento } from '../model/estabelecimento.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstabelecimentoService {

  urlLocal = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  listarEstabelecimentos() {
    return this.http.get<Estabelecimento[]>(`${this.urlLocal + `estabelecimentos`}`);
  }

  incluirEstabelecimento(estabelecimento: Estabelecimento) {
    return this.http.post<Estabelecimento>(`${this.urlLocal + `insereEstabelecimento`}`, estabelecimento);
  }

  alterarEstabelecimento(estabelecimento: Estabelecimento) {
    return this.http.put<Estabelecimento>(`${this.urlLocal + `atualizaEstabelecimento`}`, estabelecimento);
  }

  excluirEstabelecimento(estabelecimento: Estabelecimento): Observable<any> {
    return this.http.delete(`${this.urlLocal + `deletaEstabelecimento/${estabelecimento.idEstabelecimento}`}`);
  }

  estabelecimentoPorId(estabelecimento: Estabelecimento): Observable<any> {
    return this.http.get<Estabelecimento>(`${this.urlLocal + `estabelecimentoPorId/${estabelecimento.idEstabelecimento}`}`);
  }

}
