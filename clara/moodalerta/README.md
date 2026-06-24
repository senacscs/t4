# MoodAlert - Sistema de Monitoramento de Transtorno Bipolar

## 📖 Sobre o Projeto

MoodAlert é uma plataforma completa para monitoramento de transtornos bipolares, conectando pacientes e médicos através de:

- **Afetivogramas** - Registro diário de emoções e intensidades
- **Diário Online** - Espaço para registrar pensamentos e acontecimentos
- **Alarmes Configuráveis** - Lembretes para medicações e rotinas
- **Anotações Médicas** - Comunicação direta entre médico e paciente
- **Acompanhamento em Tempo Real** - Médicos podem monitorar seus pacientes

## 🚀 Como Usar

### 1. Configuração Inicial

#### Pré-requisitos
- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Conexão com internet
- Conta Firebase (para o banco de dados)

#### Configurar Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Crie um novo projeto ou use um existente
3. Ative o **Realtime Database**
4. Copie as credenciais do Firebase
5. Edite o arquivo `js/firebase-config.js` e preencha as credenciais:

```javascript
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_PROJETO.firebaseapp.com",
    databaseURL: "https://SEU_PROJETO.firebaseio.com/",
    projectId: "SEU_PROJETO",
    storageBucket: "SEU_PROJETO.appspot.com",
    messagingSenderId: "SEU_MESSAGING_ID",
    appId: "SEU_APP_ID"
};
```

### 2. Popular o Banco com Dados de Teste (Opcional)

1. Abra o arquivo `index.html` no navegador
2. Abra o Console do Desenvolvedor (F12)
3. Carregue o script de população:
   ```javascript
   // Cole o conteúdo de js/popular-banco.js no console
   // Depois execute:
   popularBancoDeDados();
   ```

Isso criará:
- 1 Médico: `carlos.silva@clinica.com` (senha: 123456)
- 2 Pacientes: `clara.dick@email.com` e `maria.alves@email.com` (senha: 123456)
- Dados de exemplo (afetivogramas, diários, alarmes, anotações)

### 3. Criar Conta

#### Como Paciente:
1. Acesse `index.html`
2. Clique em "Cadastrar"
3. Preencha seus dados
4. Selecione "Paciente"
5. Clique em "Criar conta"

#### Como Médico:
1. Acesse `index.html`
2. Clique em "Cadastrar"
3. Preencha seus dados
4. Selecione "Médico"
5. Clique em "Criar conta"

### 4. Fazer Login

1. Na tela inicial, clique em "Entrar"
2. Digite seu email e senha
3. Clique em "Acessar"
4. Você será redirecionado para a interface adequada (Paciente ou Médico)

## 👤 Interface do Paciente

### Afetivograma
- Clique em um dia do calendário
- Selecione sua emoção principal
- Escolha a intensidade (Leve, Neutro, Elevada, Crítica)
- Adicione observações (opcional)
- Clique em "Salvar"

**Os dados são salvos automaticamente no Firebase!**

### Diário
- Digite seu texto na área de diário
- Clique em "Salvar registro"
- Seus registros aparecem abaixo, ordenados do mais recente

**Todos os registros ficam salvos no banco de dados!**

### Alarmes
- Clique em "Criar alarme"
- Preencha:
  - Título do lembrete
  - Horário
  - Dias da semana
  - Observações (opcional)
- Clique em "Salvar alarme"

**Os alarmes são sincronizados com o Firebase!**

### Anotações Médicas
- Veja as orientações que seu médico enviou para você
- Anotações são atualizadas em tempo real

## 👨‍⚕️ Interface do Médico

### Dashboard
- Visão geral de todos os seus pacientes
- Estatísticas e alertas importantes

### Meus Pacientes
- Lista de todos os pacientes vinculados
- Clique em "Visualizar" para ver detalhes

### Acompanhar Paciente
1. Digite o ID do paciente
2. Clique em "Buscar"
3. Veja:
   - **Afetivograma** - Calendário de emoções do mês
   - **Diário** - Registros do paciente
   - **Anotações** - Suas anotações (públicas e privadas)

### Criar Anotação
1. Na aba "Acompanhar", selecione um paciente
2. Vá para "Anotações"
3. Clique em "Nova Anotação"
4. Preencha:
   - Tipo (Orientação, Observação, Recomendação, Alerta)
   - Visibilidade (Paciente vê / Privada)
   - Conteúdo
5. Clique em "Salvar Anotação"

**As anotações visíveis para o paciente aparecem automaticamente na interface dele!**

## 🔗 Vincular Médico e Paciente

### Opção 1: Via Console Firebase
```javascript
// No console do navegador:
await Database.Relacionamentos.criar('ID_DO_MEDICO', 'ID_DO_PACIENTE');
```

### Opção 2: Programaticamente
Adicione esta função no código e chame quando necessário.

### Como encontrar IDs:
1. Paciente: Vá em Perfil e copie o ID da conta
2. Médico: Também disponível no perfil

## 📊 Estrutura de Dados

Todos os dados são salvos no Firebase Realtime Database:

```
moodalert/
├── usuarios/          - Pacientes e médicos
├── relacionamentos/   - Vínculos médico-paciente
├── afetivogramas/     - Registros de emoções
├── diarios/           - Entradas do diário
├── alarmes/           - Lembretes configurados
└── anotacoes/         - Comunicação médico-paciente
```

Veja mais detalhes em `DATABASE_STRUCTURE.md`

## 🔒 Segurança

### Implementado:
- ✅ Validação de email duplicado
- ✅ Verificação de senha
- ✅ Sessão local com localStorage
- ✅ Separação de dados por usuário
- ✅ Anotações privadas (apenas médico vê)

### Recomendado para Produção:
- ⚠️ Usar Firebase Authentication
- ⚠️ Hash de senhas (bcrypt)
- ⚠️ HTTPS obrigatório
- ⚠️ Regras de segurança Firebase
- ⚠️ Validação de dados no servidor
- ⚠️ Rate limiting

## 🛠️ Tecnologias

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Firebase Realtime Database
- **Autenticação**: Sistema custom (recomendado migrar para Firebase Auth)
- **Design**: CSS Grid, Flexbox, Variáveis CSS

## 📁 Estrutura de Arquivos

```
projeto_pi/
├── index.html                    # Tela de login/cadastro
├── style.css                     # Estilos da tela inicial
├── paginas/
│   ├── paciente.html            # Interface do paciente
│   ├── medico.html              # Interface do médico
│   └── css/
│       ├── paciente.css         # Estilos do paciente
│       └── medico.css           # Estilos do médico
├── js/
│   ├── firebase-config.js       # Configuração Firebase
│   ├── auth.js                  # Sistema de autenticação
│   ├── database.js              # Operações do banco
│   ├── login.js                 # Lógica de login/cadastro
│   ├── paciente.js              # Lógica da interface paciente
│   ├── paciente-firebase.js     # Integração Firebase paciente
│   ├── medico.js                # Lógica da interface médico
│   ├── medico-firebase.js       # Integração Firebase médico
│   └── popular-banco.js         # Script de dados de teste
└── DATABASE_STRUCTURE.md        # Documentação do banco
```

## 🐛 Solução de Problemas

### "Firebase não está disponível"
- Verifique se as credenciais em `firebase-config.js` estão corretas
- Confirme que o Realtime Database está ativado no Firebase Console

### "Usuário não encontrado" ao fazer login
- Verifique se cadastrou o usuário antes
- Confirme que o email está correto (case-insensitive)

### Dados não aparecem
- Abra o Console do Desenvolvedor (F12)
- Veja se há erros de JavaScript
- Confirme que está logado
- Verifique se há dados no Firebase Console

### Paciente não vê anotações do médico
- Verifique se a visibilidade da anotação está como "paciente"
- Confirme que médico e paciente estão vinculados em `relacionamentos/`

## 📝 APIs Disponíveis

### Autenticação
```javascript
// Login
await Auth.login(email, senha);

// Registro
await Auth.register({ nome, email, senha, tipo });

// Logout
Auth.logout();

// Verificar sessão
const usuario = Auth.getSession();
```

### Afetivograma
```javascript
// Salvar dia
await Database.Afetivograma.salvar(pacienteId, ano, mes, dia, dados);

// Buscar mês
await Database.Afetivograma.buscarMes(pacienteId, ano, mes);
```

### Diário
```javascript
// Criar registro
await Database.Diario.criar(pacienteId, texto);

// Buscar registros
await Database.Diario.buscar(pacienteId, limite);
```

### Alarmes
```javascript
// Criar
await Database.Alarmes.criar(pacienteId, dadosAlarme);

// Buscar
await Database.Alarmes.buscar(pacienteId);

// Ativar/Desativar
await Database.Alarmes.toggleAtivo(pacienteId, alarmeId, ativo);
```

### Anotações
```javascript
// Criar
await Database.Anotacoes.criar(medicoId, pacienteId, dados);

// Buscar por paciente
await Database.Anotacoes.buscarPorPaciente(pacienteId);
```

### Relacionamentos
```javascript
// Vincular médico-paciente
await Database.Relacionamentos.criar(medicoId, pacienteId);

// Buscar médico do paciente
await Database.Relacionamentos.buscarMedicoDoPaciente(pacienteId);

// Buscar pacientes do médico
await Database.Relacionamentos.buscarPacientesDoMedico(medicoId);
```

## 🎯 Próximos Passos

- [ ] Migrar para Firebase Authentication
- [ ] Implementar notificações push
- [ ] Adicionar gráficos de tendências
- [ ] Chat em tempo real
- [ ] Exportar relatórios PDF
- [ ] App mobile (React Native / Flutter)
- [ ] Suporte a múltiplos idiomas

## 👥 Contas de Teste

Se você executou o script `popular-banco.js`:

**Médico:**
- Email: carlos.silva@clinica.com
- Senha: 123456

**Pacientes:**
- Email: clara.dick@email.com / Senha: 123456
- Email: maria.alves@email.com / Senha: 123456

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique a documentação em `DATABASE_STRUCTURE.md`
2. Veja os logs no Console do Desenvolvedor (F12)
3. Revise a estrutura do Firebase Console

---

**Desenvolvido como projeto acadêmico - Clara Pi**
