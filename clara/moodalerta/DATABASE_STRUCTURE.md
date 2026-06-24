# MoodAlert - Estrutura do Banco de Dados Firebase

## 📊 Visão Geral

Este documento descreve a estrutura completa do banco de dados Firebase Realtime Database para o projeto MoodAlert.

## 🗄️ Estrutura do Banco de Dados

```
moodalert/
├── usuarios/
├── relacionamentos/
├── afetivogramas/
├── diarios/
├── alarmes/
└── anotacoes/
```

## 📋 Detalhamento das Coleções

### 1. **usuarios/**
Armazena todos os usuários do sistema (pacientes e médicos).

```javascript
usuarios/{userId}/ {
    nome: string,              // Nome completo do usuário
    email: string,             // Email (normalizado em lowercase)
    senha: string,             // Senha (em produção usar hash)
    tipo: "paciente" | "medico", // Tipo de usuário
    dataCadastro: timestamp,   // Data de criação da conta
    ativo: boolean,            // Conta ativa ou não
    telefone: string,          // Opcional
    dataNascimento: string,    // Opcional
    crm: string                // Apenas para médicos
}
```

**Índices recomendados:**
- `email` - Para buscar usuários por email no login

### 2. **relacionamentos/**
Relaciona médicos com seus pacientes.

```javascript
relacionamentos/{relacionamentoId}/ {
    pacienteId: string,        // ID do paciente
    medicoId: string,          // ID do médico
    dataInicio: timestamp,     // Quando o relacionamento iniciou
    ativo: boolean             // Se o relacionamento está ativo
}
```

**Índices recomendados:**
- `pacienteId` - Para buscar o médico de um paciente
- `medicoId` - Para buscar todos os pacientes de um médico

### 3. **afetivogramas/**
Registros diários de emoções dos pacientes.

```javascript
afetivogramas/{pacienteId}/{ano}/{mes}/{dia}/ {
    emocao: string,            // Emoção principal (Tranquila, Neutra, Animada, etc)
    intensidade: "leve" | "neutro" | "elevada" | "critica",
    observacoes: string,       // Notas adicionais
    timestamp: number          // Quando foi registrado
}
```

**Exemplo de path:**
`afetivogramas/USR123/2025/11/21/`

### 4. **diarios/**
Registros de diário dos pacientes.

```javascript
diarios/{pacienteId}/{registroId}/ {
    texto: string,             // Conteúdo do diário
    timestamp: number,         // Data/hora do registro
    dataCriacao: string        // ISO string da data
}
```

### 5. **alarmes/**
Alarmes/lembretes configurados pelos pacientes.

```javascript
alarmes/{pacienteId}/{alarmeId}/ {
    nome: string,              // Nome do alarme
    horario: string,           // Horário (formato HH:MM)
    dias: array[string],       // Dias da semana [0-6, onde 0=domingo]
    observacoes: string,       // Notas sobre o alarme
    ativo: boolean,            // Se está ativo
    dataCriacao: timestamp     // Quando foi criado
}
```

### 6. **anotacoes/**
Anotações médicas sobre os pacientes.

```javascript
anotacoes/{anotacaoId}/ {
    medicoId: string,          // ID do médico que criou
    pacienteId: string,        // ID do paciente
    tipo: "orientacao" | "observacao" | "recomendacao" | "alerta",
    visibilidade: "paciente" | "privada", // Quem pode ver
    conteudo: string,          // Texto da anotação
    prioridade: "alta" | "media" | "baixa",
    timestamp: number,         // Quando foi criada
    lida: boolean              // Se o paciente já leu (quando visível)
}
```

**Índices recomendados:**
- `pacienteId` - Para buscar anotações de um paciente
- `medicoId` - Para buscar anotações de um médico

## 🔐 Regras de Segurança Firebase

```json
{
  "rules": {
    "usuarios": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    },
    "relacionamentos": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "afetivogramas": {
      "$pacienteId": {
        ".read": "$pacienteId === auth.uid || root.child('relacionamentos').orderByChild('pacienteId').equalTo($pacienteId).exists()",
        ".write": "$pacienteId === auth.uid"
      }
    },
    "diarios": {
      "$pacienteId": {
        ".read": "$pacienteId === auth.uid || root.child('relacionamentos').orderByChild('pacienteId').equalTo($pacienteId).exists()",
        ".write": "$pacienteId === auth.uid"
      }
    },
    "alarmes": {
      "$pacienteId": {
        ".read": "$pacienteId === auth.uid",
        ".write": "$pacienteId === auth.uid"
      }
    },
    "anotacoes": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
```

## 📚 Uso das APIs

### Autenticação

```javascript
// Login
const resultado = await Auth.login(email, senha);
if (resultado.success) {
    // Usuário autenticado
    console.log(resultado.usuario);
}

// Registro
const resultado = await Auth.register({
    nome, email, senha, tipo
});

// Logout
Auth.logout();

// Verificar se está autenticado
if (Auth.isAuthenticated()) {
    // Usuário logado
}
```

### Afetivograma
z
```javascript
// Salvar registro de um dia
await Database.Afetivograma.salvar(pacienteId, ano, mes, dia, {
    emocao: 'Tranquila',
    intensidade: 'neutro',
    observacoes: 'Dia muito bom'
});

// Buscar registros de um mês
const resultado = await Database.Afetivograma.buscarMes(pacienteId, 2025, 11);
```

### Diário

```javascript
// Criar registro
await Database.Diario.criar(pacienteId, 'Texto do diário...');

// Buscar registros
const resultado = await Database.Diario.buscar(pacienteId, 50);

// Excluir registro
await Database.Diario.excluir(pacienteId, registroId);
```

### Alarmes

```javascript
// Criar alarme
await Database.Alarmes.criar(pacienteId, {
    nome: 'Tomar medicação',
    horario: '08:00',
    dias: ['1', '2', '3', '4', '5'],
    observacoes: '1 comprimido'
});

// Buscar alarmes
const resultado = await Database.Alarmes.buscar(pacienteId);

// Ativar/Desativar
await Database.Alarmes.toggleAtivo(pacienteId, alarmeId, true);

// Excluir
await Database.Alarmes.excluir(pacienteId, alarmeId);
```

### Anotações Médicas

```javascript
// Criar anotação
await Database.Anotacoes.criar(medicoId, pacienteId, {
    tipo: 'orientacao',
    visibilidade: 'paciente',
    conteudo: 'Continuar com medicação...',
    prioridade: 'media'
});

// Buscar anotações de um paciente
const resultado = await Database.Anotacoes.buscarPorPaciente(pacienteId);

// Buscar anotações de um médico
const resultado = await Database.Anotacoes.buscarPorMedico(medicoId);
```

### Relacionamentos

```javascript
// Criar relacionamento médico-paciente
await Database.Relacionamentos.criar(medicoId, pacienteId);

// Buscar médico de um paciente
const resultado = await Database.Relacionamentos.buscarMedicoDoPaciente(pacienteId);

// Buscar pacientes de um médico
const resultado = await Database.Relacionamentos.buscarPacientesDoMedico(medicoId);
```

## 🔄 Fluxo de Dados

### Cadastro e Login
1. Usuário se cadastra (paciente ou médico)
2. Dados salvos em `usuarios/`
3. No login, verifica credenciais
4. Cria sessão local com `localStorage`

### Paciente Usa o Sistema
1. Registra emoções → salva em `afetivogramas/`
2. Escreve diário → salva em `diarios/`
3. Configura alarmes → salva em `alarmes/`
4. Visualiza anotações médicas → busca em `anotacoes/` (apenas visibilidade: paciente)

### Médico Acompanha Paciente
1. Busca seus pacientes em `relacionamentos/`
2. Visualiza afetivogramas, diários do paciente
3. Cria anotações → salva em `anotacoes/`
4. Define visibilidade (paciente ou privada)

## 🚀 Próximos Passos

### Em Produção:
1. ✅ Implementar hashing de senhas (bcrypt)
2. ✅ Usar Firebase Authentication ao invés de autenticação manual
3. ✅ Configurar regras de segurança adequadas
4. ✅ Adicionar validação de dados no backend
5. ✅ Implementar rate limiting
6. ✅ Backup automático dos dados
7. ✅ Monitoramento e analytics

### Melhorias Futuras:
- Notificações push para alarmes
- Chat em tempo real médico-paciente
- Exportação de relatórios em PDF
- Gráficos e análises de tendências
- Suporte a múltiplos médicos por paciente
- Sistema de consultas agendadas
