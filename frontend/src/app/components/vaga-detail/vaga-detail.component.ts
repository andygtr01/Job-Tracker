import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { Vaga, StatusVaga, STATUS_LABELS } from '../../models/vaga.model';
import { VagaService } from '../../services/vaga.service';

@Component({
  selector: 'app-vaga-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './vaga-detail.component.html',
  styleUrl: './vaga-detail.component.css'
})
export class VagaDetailComponent implements OnInit {

  vaga: Vaga | null = null;
  carregando = true;
  erro = '';

  statusLabels = STATUS_LABELS;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vagaService: VagaService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.vagaService.buscarPorId(id).subscribe({
      next: (vaga) => {
        this.vaga = vaga;
        this.carregando = false;
      },
      error: () => {
        this.erro = 'Vaga não encontrada.';
        this.carregando = false;
      }
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

  voltar(): void {
    this.router.navigate(['/']);
  }
}