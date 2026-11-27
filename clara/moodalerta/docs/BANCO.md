# MoodAlert · Estrutura do banco (versão 2)

Firebase **Realtime Database** `moodalerta-default-rtdb`. O banco é **público** (leitura e escrita abertas), por isso:

- **Nenhuma senha é gravada.** Só fica o hash PBKDF2-SHA256 com 210.000 rodadas e um sal aleatório por usuário (`credenciais/`). O mesmo cálculo existe no navegador (`assets/js/seguranca.js`) e no script de migração (`scripts/migrar-banco.mjs`).
- O login não baixa a lista de usuários: ele procura o e-mail num índice cuja chave é o **SHA-256 do e-mail** (`indices/emails/`).

```
/
├── meta/                       versão da estrutura
├── usuarios/{uid}              perfil público da conta
├── credenciais/{uid}           hash da senha (nunca a senha)
├── indices/
│   ├── emails/{sha256(email)}  → uid
│   └── codigos/{ABC-123}       → uid do paciente
├── vinculos/
│   ├── medicos/{medicoId}/{pacienteId}   { desde }
│   └── pacientes/{pacienteId}            { medicoId, desde }
├── afetivogramas/{pacienteId}/{AAAA-MM-DD}
├── diarios/{pacienteId}/{id}
├── alarmes/{pacienteId}/{id}
└── anotacoes/{pacienteId}/{id}
```

## Nós

### `usuarios/{uid}`
| Campo | Tipo | Observação |
|---|---|---|
| nome | string | |
| email | string | minúsculo |
| tipo | `"paciente"` \| `"medico"` | |
| ativo | boolean | `false` bloqueia o login |
| criadoEm | número (ms) | |
| codigo | string | só paciente, ex. `K7P-Q3M` |
| telefone, nascimento | string | opcionais (`nascimento` = `AAAA-MM-DD`) |
| crm, especialidade | string | só médico |
| foto | string | data URL JPEG 256×256 (opcional) |

### `credenciais/{uid}`
`{ algoritmo: "PBKDF2-SHA256", iteracoes: 210000, sal: hex(16 bytes), hash: hex(32 bytes), atualizadoEm }`

### `vinculos`
Um paciente tem no máximo **um** médico. O vínculo é gravado nos dois lados de uma vez (`update` multi-caminho), para o médico listar seus pacientes e o paciente achar seu médico sem varrer o banco.

### `afetivogramas/{pacienteId}/{AAAA-MM-DD}`
`{ emocao, intensidade: "leve"|"neutro"|"elevada"|"critica", observacoes, registradoEm }`

A chave em texto (`2026-11-05`) evita que o Firebase transforme os dias em *array* (problema da versão antiga) e permite buscar um mês com `orderByKey().startAt('2026-11-01').endAt('2026-11-31')`.

### `diarios/{pacienteId}/{id}`
`{ texto, criadoEm }`

### `alarmes/{pacienteId}/{id}`
`{ nome, horario: "HH:MM", dias: [0..6] (0 = domingo), observacoes, ativo, criadoEm, atualizadoEm }`

### `anotacoes/{pacienteId}/{id}`
`{ medicoId, tipo: "orientacao"|"observacao"|"recomendacao"|"alerta", visibilidade: "paciente"|"privada", prioridade: "baixa"|"media"|"alta", conteudo, criadoEm, lida }`

Agrupadas por paciente: a área do paciente lê só o nó dele e mostra só `visibilidade = "paciente"`.

## O que mudou em relação à versão 1

| Antes | Agora |
|---|---|
| `usuarios/{uid}/senha` em texto puro | `credenciais/{uid}` com hash PBKDF2 |
| Login com `orderByChild('email')` (baixava todos os usuários) | `indices/emails/{sha256}` |
| Médico vinculava pelo ID longo do Firebase | Código curto do paciente (`indices/codigos`) |
| `relacionamentos/{id}` | `vinculos/medicos` + `vinculos/pacientes` |
| `afetivogramas/{pid}/{ano}/{mes}/{dia}` (virava array) | `afetivogramas/{pid}/{AAAA-MM-DD}` |
| `anotacoes/{id}` soltas | `anotacoes/{pacienteId}/{id}` |
| `timestamp`, `dataCadastro`, `dataCriacao` misturados | `criadoEm` / `registradoEm` / `atualizadoEm` |

## Limite conhecido

Como o banco continua aberto, quem tiver a URL pode ler e alterar os dados diretamente (inclusive os perfis e os registros). O hash protege as **senhas**, mas não substitui regras de segurança. Para produção, o caminho é usar o Firebase Authentication e regras por usuário.
