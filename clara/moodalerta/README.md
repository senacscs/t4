# MoodAlert

Plataforma de monitoramento de transtorno bipolar que conecta **pacientes** e **médicos**: afetivograma diário, diário online, alarmes de medicação e anotações médicas em tempo real.

Feito em **HTML, CSS e JavaScript puro**, com o **Firebase Realtime Database** como banco. Não precisa instalar nada: basta abrir o `index.html` no navegador (ou publicar a pasta no GitHub Pages).

## Funcionalidades

### Paciente
- **Afetivograma** — calendário do mês com navegação entre meses; em cada dia registra a emoção principal (Tranquila, Neutra, Animada, Ansiosa, Irritada), a intensidade (leve, neutro, elevada, crítica) e observações. Dias futuros ficam bloqueados. Resumo do mês com dias registrados, emoção mais frequente e distribuição das intensidades. Linha **Registro de hoje** no topo (emoção, intensidade e dias consecutivos com registro) e um resumo do mês em uma linha.
- **Diário** — textos de até 1.200 caracteres, do mais recente para o mais antigo, com **busca**, **edição** (marca "editado") e exclusão.
- **Alarmes** — título, horário, dias da semana (atalhos: dias úteis, fins de semana, todos), observações, liga/desliga, editar e excluir; cada cartão mostra **quando o alarme toca de novo**. Com a página aberta, o alarme **toca** (aviso na tela, som e notificação do navegador).
- **Anotações médicas** — orientações que o médico marcou como visíveis, com destaque para as novas e contador no menu.
- **Perfil** — foto, tema claro/escuro, código do paciente para passar ao médico, dados pessoais, médico responsável, editar dados e trocar senha.

### Médico
- **Painel** — pacientes ativos, quem registrou hoje, total de anotações, alertas, atividade recente.
- **Alertas automáticos** (últimos 7 dias) — intensidade crítica, sequência de dias elevados/críticos e pacientes sem registros há 5 dias ou mais.
- **Meus pacientes** — cartões com situação, **faixa colorida dos últimos 14 dias**, última atividade e humor recente; busca por nome; **adicionar paciente pelo código**.
- **Acompanhar** — afetivograma (com navegação entre meses), diário e anotações do paciente; nova anotação (tipo, prioridade, visibilidade); desvincular.
- **Anotações gerais** — todas as anotações, com filtros por visibilidade, tipo e paciente.
- **Perfil** — foto, CRM, especialidade, dados, tema e troca de senha.

### Geral
- Visual clínico: fonte Inter (16px fixos), cantos de 8px, superfícies lisas com borda fina, sem emojis; fundo verde com bolhas desfocadas da versão original.
- Layout responsivo: no celular o menu lateral vira uma barra inferior.
- Tema claro (padrão) e escuro, lembrado no navegador.
- Mensagens de erro claras nos formulários, avisos na tela e confirmação antes de excluir.

## Segurança

O banco é público, então:

- **As senhas nunca são gravadas.** O navegador calcula um hash **PBKDF2-SHA256 (210.000 rodadas, sal aleatório por usuário)** e só esse código vai para o banco. Nem quem administra o banco consegue ver a senha.
- O login não baixa a lista de usuários: procura o e-mail num índice pelo SHA-256 dele.
- Todo texto digitado pelos usuários é exibido como texto puro (sem `innerHTML`), o que impede injeção de código.
- O médico só vê os dados dos pacientes **vinculados** a ele.

Limite: como o banco continua aberto, ele não impede alguém de mexer nos dados direto pela URL do Firebase. Detalhes em [docs/BANCO.md](docs/BANCO.md).

## Estrutura de pastas

```
moodalerta/
├── index.html            Login e cadastro
├── paciente.html         Área do paciente
├── medico.html           Painel do médico
├── assets/
│   ├── css/
│   │   ├── base.css      Tema, botões, campos, modais, avisos
│   │   ├── login.css     Tela de login
│   │   └── app.css       Telas internas (paciente e médico)
│   ├── js/
│   │   ├── ui.js         Tema, elementos seguros, modais, datas
│   │   ├── firebase.js   Configuração do Firebase
│   │   ├── seguranca.js  Hash das senhas (PBKDF2)
│   │   ├── db.js         Leitura e escrita no banco
│   │   ├── auth.js       Cadastro, login e sessão
│   │   ├── afetivograma.js  Calendário (usado pelas duas áreas)
│   │   ├── perfil.js     Modal de perfil
│   │   ├── login.js      Lógica da tela de login
│   │   ├── paciente.js   Lógica da área do paciente
│   │   └── medico.js     Lógica do painel do médico
│   └── img/icone.svg
├── docs/BANCO.md         Estrutura do banco
└── scripts/migrar-banco.mjs  Migração do banco antigo (Node)
```

## Como usar

1. Abra o `index.html` (duplo clique) ou publique a pasta no GitHub Pages.
2. Crie uma conta de **paciente** e outra de **médico** (aba “Cadastrar”).
3. No perfil do paciente, copie o **código** (ex.: `K7P-Q3M`).
4. No painel do médico, vá em **Pacientes → Adicionar paciente** e cole o código.

Se o banco foi preparado com `--demo`, as contas de demonstração estão em `CONTAS-DEMO.md`.

## Migração do banco antigo

O script `scripts/migrar-banco.mjs` (Node 18+) converte o banco da versão anterior: troca as senhas por hash, reorganiza os nós e, com `--demo`, cria contas de exemplo.

```bash
node scripts/migrar-banco.mjs --entrada banco-antigo.json --saida banco-v2.json   # só gera o arquivo
node scripts/migrar-banco.mjs --entrada banco-antigo.json --demo --enviar         # substitui o banco
```

---

Projeto acadêmico (Projeto Integrador).
