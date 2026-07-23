import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusVaga, STATUS_LABELS } from '../../models/vaga.model';
import { VagaService } from '../../services/vaga.service';

@Component({
  selector: 'app-vaga-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './vaga-form.component.html',
  styleUrl: './vaga-form.component.css'
})
export class VagaFormComponent implements OnInit {

  form: FormGroup;
  modoEdicao = false;
  vagaId: number | null = null;
  salvando = false;
  erro = '';

  statusLabels = STATUS_LABELS;
  todosStatus = Object.values(StatusVaga);

  constructor(
    private fb: FormBuilder,
    private vagaService: VagaService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      empresa: ['', Validators.required],
      cargo: ['', Validators.required],
      link: [''],
      localizacao: [''],
      modalidade: [''],
      salarioPretendido: [null],
      dataAplicacao: [this.hoje(), Validators.required],
      status: [StatusVaga.APLICADO, Validators.required],
      observacoes: ['']
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.modoEdicao = true;
      this.vagaId = Number(idParam);
      this.vagaService.buscarPorId(this.vagaId).subscribe({
        next: (vaga) => this.form.patchValue(vaga),
        error: () => this.erro = 'Vaga não encontrada.'
      });
    }
  }

  private hoje(): string {
    return new Date().toISOString().substring(0, 10);
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.salvando = true;
    this.erro = '';
    const dados = this.form.value;

    const acao = this.modoEdicao && this.vagaId
      ? this.vagaService.atualizar(this.vagaId, dados)
      : this.vagaService.criar(dados);

    acao.subscribe({
      next: () => this.router.navigate(['/']),
      error: () => {
        this.erro = 'Erro ao salvar a candidatura. Verifique os dados e tente novamente.';
        this.salvando = false;
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/']);
  }
}
