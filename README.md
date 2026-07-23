# Job Tracker — Gestão pessoal de vagas e candidaturas

Sistema full stack para registrar e acompanhar candidaturas a vagas de emprego: empresa, cargo, status (aplicado, entrevista, oferta, rejeitado, etc.), data de aplicação, link, modalidade, salário pretendido e observações.

- **Backend:** Java 17 + Spring Boot 3 + Spring Data JPA + PostgreSQL
- **Frontend:** Angular 18 (standalone components) + Reactive Forms

## Estrutura

```
job-tracker/
├── backend/          # API REST Spring Boot
├── frontend/          # SPA Angular
└── docker-compose.yml # PostgreSQL via Docker
```

## Pré-requisitos

- Java 17+
- Maven 3.9+ (ou use o wrapper, se adicionar um)
- Node.js 18+ e npm
- Angular CLI (`npm install -g @angular/cli`)
- Docker (opcional, para subir o PostgreSQL rapidamente) ou PostgreSQL instalado localmente

## 1. Subir o banco de dados

Com Docker:

```bash
cd job-tracker
docker compose up -d
```

Isso cria um banco `job_tracker` em `localhost:5432` com usuário `postgres` / senha `postgres`.

Sem Docker: crie manualmente um banco chamado `job_tracker` no seu PostgreSQL e ajuste usuário/senha em
`backend/src/main/resources/application.properties` se necessário.

## 2. Rodar o backend

```bash
cd backend
mvn spring-boot:run
```

A API sobe em `http://localhost:8080`. As tabelas são criadas automaticamente (`ddl-auto=update`).

### Endpoints principais

| Método | Rota                              | Descrição                          |
|--------|------------------------------------|-------------------------------------|
| GET    | `/api/vagas`                       | Lista todas as vagas                |
| GET    | `/api/vagas?status=ENTREVISTA_RH`  | Filtra por status                   |
| GET    | `/api/vagas?empresa=nubank`        | Busca por empresa                   |
| GET    | `/api/vagas/{id}`                  | Busca uma vaga por id                |
| GET    | `/api/vagas/estatisticas`          | Contagem de vagas por status         |
| POST   | `/api/vagas`                       | Cria uma nova vaga                  |
| PUT    | `/api/vagas/{id}`                  | Atualiza uma vaga existente          |
| DELETE | `/api/vagas/{id}`                  | Remove uma vaga                      |

Exemplo de payload (POST/PUT):

```json
{
  "empresa": "Nubank",
  "cargo": "Desenvolvedor Full Stack",
  "link": "https://nubank.com.br/vagas/123",
  "localizacao": "São Paulo, SP",
  "modalidade": "Remoto",
  "salarioPretendido": 9000,
  "dataAplicacao": "2026-07-20",
  "status": "APLICADO",
  "observacoes": "Aplicado via LinkedIn, recrutadora é a Ana."
}
```

## 3. Rodar o frontend

```bash
cd frontend
npm install
ng serve
```

Acesse `http://localhost:4200`. O frontend já está configurado para chamar a API em `http://localhost:8080/api`
(veja `src/environments/environment.ts`).

## Funcionalidades

- Listagem de candidaturas com filtro por status e por empresa
- Cadastro de nova candidatura
- Edição de candidatura existente
- Exclusão de candidatura (com confirmação)
- Validação de campos obrigatórios (empresa, cargo, data, status)
- Tratamento de erros de validação e "não encontrado" no backend (respostas JSON padronizadas)
- CORS já configurado para o Angular rodar em `localhost:4200`

## Possíveis evoluções (boas para citar em entrevista)

- Autenticação (Spring Security + JWT) para uso multiusuário
- Dashboard com gráficos (funil de candidaturas por status, taxa de conversão)
- Deploy do backend (Railway/Render) e frontend (Vercel/Netlify) com CI/CD
- Testes unitários (JUnit + Mockito no backend, Jasmine/Karma no frontend)
- Paginação e ordenação server-side para grandes volumes de dados
- Upload de currículo/anexos vinculados à vaga
