# Votação 1 vs 2 com Supabase

Este projeto inclui uma página de votação simples (1 vs 2) que usa Supabase como banco de dados e atualiza o placar em tempo real.

- Página da votação: `garcia/supabase/index.html` (ou abra a pasta `garcia/supabase`)
- Lógica do app: `garcia/supabase/vote.js` (ESM, carrega o SDK do Supabase via CDN)
- Configuração de chaves: `garcia/supabase/config.js` (edite este arquivo e preencha suas credenciais)

## 1) Configurar banco no Supabase

Execute no SQL Editor do seu projeto (ajuste nomes conforme preferir):

```sql
-- Tabela de votos
create table if not exists public.votes (
  id uuid primary key default gen_random_uuid(),
  option smallint not null check (option in (1,2)),
  created_at timestamptz not null default now()
);

-- Habilite RLS
alter table public.votes enable row level security;

-- Políticas mínimas (demonstração):
create policy "Allow read" on public.votes
  for select using (true);

create policy "Allow vote" on public.votes
  for insert with check (true);

-- (Opcional) Índice simples
create index if not exists votes_option_idx on public.votes(option);
```

Atenção: As políticas acima permitem que qualquer usuário (chave anônima) faça `select` e `insert`. Em produção, considere controles mais rígidos (ex.: Auth, rate-limit, captchas, verificação por IP, etc.).

## 2) Configurar o front-end

1. Edite `garcia/supabase/config.js` e preencha as variáveis `SUPABASE_URL` e `SUPABASE_ANON_KEY` com os valores do seu projeto Supabase.
  ```js
  export const SUPABASE_URL = "https://SEU-PROJETO.supabase.co";
  export const SUPABASE_ANON_KEY = "SUA-ANON-KEY";
  ```
2. Abra a página `garcia/supabase/index.html` em um servidor HTTP local (necessário porque usamos módulos ES).

### Servindo localmente

- VS Code: use a extensão "Live Server" e abra `css/supabase/index.html`.
- Node (opcional):
  ```powershell
  npx serve .
  ```
- Python (opcional):
  ```powershell
  python -m http.server 8080
  ```
  Depois acesse http://localhost:8080/css/supabase/

## 3) Como funciona

- O arquivo `js/vote.js`:
  - Inicializa o cliente Supabase usando `SUPABASE_URL` e `SUPABASE_ANON_KEY`.
  - Registra votos com `insert({ option })`.
  - Busca a contagem atual via `select('option')` e agrega no cliente.
  - Usa realtime do Supabase para refletir novos votos assim que forem inseridos.
  - Usa `localStorage` para desencorajar múltiplos votos no mesmo navegador.

## 4) Personalizações

- Estilo: ajuste o CSS inline da página `css/supabase/index.html` ou mova para `css/estilo.css`.
- Segurança: implemente autenticação do Supabase e políticas RLS mais específicas para limitar fraudes.
- Performance: para contagem em larga escala, crie uma view/materialized view ou função RPC que já retorne os totais agregados.

## 5) Problemas comuns

- Erro CORS ou import de módulo: sirva a página via HTTP (Live Server). Abertura direta via `file://` pode falhar.
- "Configure js/config.js": copie e preencha `js/config.js` com as chaves do seu projeto.
- "permission denied for table votes": verifique se RLS está habilitado e as políticas de `select` e `insert` foram criadas.
