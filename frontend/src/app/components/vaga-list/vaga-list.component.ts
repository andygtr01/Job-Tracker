import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Vaga, StatusVaga, STATUS_LABELS } from '../../models/vaga.model';
import { VagaService } from '../../services/vaga.service';

@Component({
  selector: 'app-vaga-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './vaga-list.component.html',
  styleUrl: './vaga-list.component.css'
})
export class VagaListComponent implements OnInit {

  vagas: Vaga[] = [];
  carregando = true;
  erro = '';

  filtroStatus: string = '';
  filtroEmpresa: string = '';

  statusLabels = STATUS_LABELS;
  todosStatus = Object.values(StatusVaga);

  constructor(private vagaService: VagaService) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.carregando = true;
    this.erro = '';

    if (this.filtroStatus) {
      this.vagaService.filtrarPorStatus(this.filtroStatus as StatusVaga).subscribe({
        next: (dados) => this.aoCarregar(dados),
        error: () => this.aoFalhar()
      });
    } else if (this.filtroEmpresa) {
      this.vagaService.buscarPorEmpresa(this.filtroEmpresa).subscribe({
        next: (dados) => this.aoCarregar(dados),
        error: () => this.aoFalhar()
      });
    } else {
      this.vagaService.listarTodas().subscribe({
        next: (dados) => this.aoCarregar(dados),
        error: () => this.aoFalhar()
      });
    }
  }

  private aoCarregar(dados: Vaga[]): void {
    this.vagas = dados;
    this.carregando = false;
  }

  private aoFalhar(): void {
    this.erro = 'Não foi possível carregar as vagas. Verifique se o backend está rodando em localhost:8080.';
    this.carregando = false;
  }

  limparFiltros(): void {
    this.filtroStatus = '';
    this.filtroEmpresa = '';
    this.carregar();
  }

  excluir(vaga: Vaga): void {
    if (!vaga.id) return;
    const confirmado = confirm(`Excluir a candidatura para ${vaga.cargo} na ${vaga.empresa}?`);
    if (!confirmado) return;

    this.vagaService.deletar(vaga.id).subscribe({
      next: () => this.carregar(),
      error: () => alert('Erro ao excluir a vaga.')
    });
  }

  corDoStatus(status: StatusVaga): string {
    const cores: Record<string, string> = {
      APLICADO: '#8f9bb3',
      EM_ANALISE: '#4f7cff',
      ENTREVISTA_RH: '#f5a623',
      ENTREVISTA_TECNICA: '#f5a623',
      TESTE_TECNICO: '#f5a623',
      OFERTA_RECEBIDA: '#2ecc71',
      ACEITO: '#27ae60',
      REJEITADO: '#e74c3c',
      DESISTI: '#95a5a6'
    };
    return cores[status] ?? '#8f9bb3';
  }
}
