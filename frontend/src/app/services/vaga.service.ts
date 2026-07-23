import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vaga, StatusVaga } from '../models/vaga.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VagaService {

  private readonly baseUrl = `${environment.apiUrl}/vagas`;

  constructor(private http: HttpClient) {}

  listarTodas(): Observable<Vaga[]> {
    return this.http.get<Vaga[]>(this.baseUrl);
  }

  buscarPorId(id: number): Observable<Vaga> {
    return this.http.get<Vaga>(`${this.baseUrl}/${id}`);
  }

  filtrarPorStatus(status: StatusVaga): Observable<Vaga[]> {
    return this.http.get<Vaga[]>(`${this.baseUrl}?status=${status}`);
  }

  buscarPorEmpresa(empresa: string): Observable<Vaga[]> {
    return this.http.get<Vaga[]>(`${this.baseUrl}?empresa=${encodeURIComponent(empresa)}`);
  }

  estatisticas(): Observable<Record<string, number>> {
    return this.http.get<Record<string, number>>(`${this.baseUrl}/estatisticas`);
  }

  criar(vaga: Vaga): Observable<Vaga> {
    return this.http.post<Vaga>(this.baseUrl, vaga);
  }

  atualizar(id: number, vaga: Vaga): Observable<Vaga> {
    return this.http.put<Vaga>(`${this.baseUrl}/${id}`, vaga);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
