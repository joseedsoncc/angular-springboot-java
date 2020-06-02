import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profissional } from '../model/profissional.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfissionalService {

  urlLocal = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  listarProfissionais() {
    return this.http.get<Profissional[]>(`${this.urlLocal + `profissionais`}`);
  }

  incluirProfissional(profissional: Profissional) {
    return this.http.post<Profissional>(`${this.urlLocal + `insereProfissional`}`, profissional);
  }

  alterarProfissional(profissional: Profissional) {
    return this.http.put<Profissional>(`${this.urlLocal + `atualizaProfissional`}`, profissional);
  }

  excluirProfissional(profissional: Profissional): Observable<any> {
    return this.http.delete(`${this.urlLocal + `deletaProfissional/${profissional.idProfissional}`}`);
  }
  
  profissionalPorId(profissional: Profissional): Observable<any> {
    return this.http.get<Profissional>(`${this.urlLocal + `profissionalPorId/${profissional.idProfissional}`}`);
  }

  vinculaProfissional(profissional: Profissional) {
    return this.http.put<Profissional>(`${this.urlLocal + `vinculaProfissional`}`, profissional);
  }

  desvinculaProfissional(profissional: Profissional) {
    return this.http.put<Profissional>(`${this.urlLocal + `desvinculaProfissional`}`, profissional);
  }

}
 