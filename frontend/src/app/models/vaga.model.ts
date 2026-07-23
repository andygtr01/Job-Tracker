export enum StatusVaga {
  APLICADO = 'APLICADO',
  EM_ANALISE = 'EM_ANALISE',
  ENTREVISTA_RH = 'ENTREVISTA_RH',
  ENTREVISTA_TECNICA = 'ENTREVISTA_TECNICA',
  TESTE_TECNICO = 'TESTE_TECNICO',
  OFERTA_RECEBIDA = 'OFERTA_RECEBIDA',
  ACEITO = 'ACEITO',
  REJEITADO = 'REJEITADO',
  DESISTI = 'DESISTI'
}

export const STATUS_LABELS: Record<StatusVaga, string> = {
  [StatusVaga.APLICADO]: 'Aplicado',
  [StatusVaga.EM_ANALISE]: 'Em análise',
  [StatusVaga.ENTREVISTA_RH]: 'Entrevista RH',
  [StatusVaga.ENTREVISTA_TECNICA]: 'Entrevista técnica',
  [StatusVaga.TESTE_TECNICO]: 'Teste técnico',
  [StatusVaga.OFERTA_RECEBIDA]: 'Oferta recebida',
  [StatusVaga.ACEITO]: 'Aceito',
  [StatusVaga.REJEITADO]: 'Rejeitado',
  [StatusVaga.DESISTI]: 'Desisti'
};

export interface Vaga {
  id?: number;
  empresa: string;
  cargo: string;
  link?: string;
  localizacao?: string;
  modalidade?: string;
  salarioPretendido?: number;
  dataAplicacao: string; // formato yyyy-MM-dd
  status: StatusVaga;
  observacoes?: string;
  criadoEm?: string;
  atualizadoEm?: string;
}
