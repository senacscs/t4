#!/usr/bin/env node
/* =========================================================
   MoodAlert · Migração do banco (v1 → v2)

   O que faz:
   - Lê o banco antigo (arquivo JSON exportado ou direto da URL)
   - Troca as senhas em texto puro por hash PBKDF2-SHA256
     (o mesmo de assets/js/seguranca.js)
   - Reorganiza os nós (ver docs/BANCO.md)
   - Opcional: cria contas de demonstração com dados de exemplo

   Uso (Node 18+):
     node scripts/migrar-banco.mjs --entrada banco-antigo.json --saida banco-v2.json
     node scripts/migrar-banco.mjs --entrada banco-antigo.json --demo --saida banco-v2.json
     node scripts/migrar-banco.mjs --entrada banco-antigo.json --demo --enviar

   --enviar SUBSTITUI o banco inteiro pela versão nova.
   Faça backup do JSON antigo antes (o próprio --entrada já é um).
   ========================================================= */
import { pbkdf2Sync, randomBytes, createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';

const URL_BANCO = 'https://moodalerta-default-rtdb.firebaseio.com';
const ITERACOES = 210000;
const ALFABETO = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const PUSH_CHARS = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';

// ---------- Argumentos ----------
const args = process.argv.slice(2);
const opcao = (nome) => {
    const i = args.indexOf(`--${nome}`);
    return i === -1 ? null : (args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : true);
};
const entrada = opcao('entrada');
const saida = opcao('saida');
const comDemo = !!opcao('demo');
const enviar = !!opcao('enviar');

// ---------- Utilitários (iguais ao navegador) ----------
const sha256 = (texto) => createHash('sha256').update(texto).digest('hex');
const chaveEmail = (email) => sha256(String(email).trim().toLowerCase());

function criarCredencial(senha, criadoEm = Date.now()) {
    const sal = randomBytes(16).toString('hex');
    const hash = pbkdf2Sync(String(senha).normalize('NFKC'), Buffer.from(sal, 'hex'), ITERACOES, 32, 'sha256').toString('hex');
    return { algoritmo: 'PBKDF2-SHA256', iteracoes: ITERACOES, sal, hash, atualizadoEm: criadoEm };
}

function gerarCodigo(usados) {
    let codigo;
    do {
        const letras = Array.from(randomBytes(6), (b) => ALFABETO[b % ALFABETO.length]).join('');
        codigo = `${letras.slice(0, 3)}-${letras.slice(3)}`;
    } while (usados.has(codigo));
    usados.add(codigo);
    return codigo;
}

/** ID no mesmo formato do push() do Firebase (ordenável por tempo). */
let ultimoTempo = 0;
let ultimosAleatorios = [];
function pushId(tempo = Date.now()) {
    const repetido = tempo === ultimoTempo;
    ultimoTempo = tempo;
    let id = '';
    let t = tempo;
    for (let i = 7; i >= 0; i--) { id = PUSH_CHARS[t % 64] + id; t = Math.floor(t / 64); }
    if (!repetido) {
        ultimosAleatorios = Array.from(randomBytes(12), (b) => b % 64);
    } else {
        let i = 11;
        while (i >= 0 && ultimosAleatorios[i] === 63) { ultimosAleatorios[i] = 0; i--; }
        ultimosAleatorios[i]++;
    }
    return id + ultimosAleatorios.map((n) => PUSH_CHARS[n]).join('');
}

const pad = (n) => String(n).padStart(2, '0');
const chaveData = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const entradas = (valor) => (Array.isArray(valor) ? valor.map((v, i) => [String(i), v]) : Object.entries(valor || {})).filter(([, v]) => v != null);

// ---------- Leitura ----------
async function lerAntigo() {
    if (entrada && entrada !== true) return JSON.parse(readFileSync(entrada, 'utf8'));
    const resposta = await fetch(`${URL_BANCO}/.json`);
    if (!resposta.ok) throw new Error(`Falha ao ler o banco: HTTP ${resposta.status}`);
    return resposta.json();
}

// ---------- Conversão ----------
function migrar(antigo) {
    if (antigo && antigo.meta && antigo.meta.versao >= 2) {
        throw new Error('Este banco já está na versão 2. Nada a migrar.');
    }

    const novo = {
        meta: { versao: 2, migradoEm: Date.now(), observacao: 'Senhas guardadas só como hash PBKDF2-SHA256. Estrutura em docs/BANCO.md.' },
        usuarios: {},
        credenciais: {},
        indices: { emails: {}, codigos: {} },
        vinculos: { medicos: {}, pacientes: {} },
        afetivogramas: {},
        diarios: {},
        alarmes: {},
        anotacoes: {}
    };
    const codigos = new Set();
    const relatorio = { usuarios: 0, emailsDuplicados: [], afetivogramas: 0, diarios: 0, alarmes: 0, vinculos: 0, anotacoes: 0 };

    // Usuários + credenciais
    const ordenados = entradas(antigo.usuarios).sort((a, b) => (a[1].dataCadastro || 0) - (b[1].dataCadastro || 0));
    for (const [uid, u] of ordenados) {
        const email = String(u.email || '').trim().toLowerCase();
        const chave = chaveEmail(email);
        if (!email || novo.indices.emails[chave]) {
            relatorio.emailsDuplicados.push(email || uid);
            continue;
        }
        const usuario = {
            nome: String(u.nome || 'Sem nome').trim(),
            email,
            tipo: u.tipo === 'medico' ? 'medico' : 'paciente',
            ativo: u.ativo !== false,
            criadoEm: u.dataCadastro || u.dataCriacao || Date.now()
        };
        if (u.telefone) usuario.telefone = u.telefone;
        if (u.nascimento || u.dataNascimento) usuario.nascimento = u.nascimento || u.dataNascimento;
        if (u.foto) usuario.foto = u.foto;
        if (u.crm) usuario.crm = u.crm;
        if (usuario.tipo === 'medico') usuario.especialidade = u.especialidade || 'Psiquiatria';
        if (usuario.tipo === 'paciente') {
            usuario.codigo = gerarCodigo(codigos);
            novo.indices.codigos[usuario.codigo] = uid;
        }

        novo.usuarios[uid] = usuario;
        novo.indices.emails[chave] = uid;
        // Contas sem senha recebem uma senha aleatória (precisarão de redefinição).
        novo.credenciais[uid] = criarCredencial(u.senha != null ? String(u.senha) : randomBytes(24).toString('hex'), usuario.criadoEm);
        relatorio.usuarios++;
    }

    // Afetivogramas: {pid}/{ano}/{mes}/{dia} (às vezes array) → {pid}/{AAAA-MM-DD}
    for (const [pid, anos] of entradas(antigo.afetivogramas)) {
        if (!novo.usuarios[pid]) continue;
        for (const [ano, meses] of entradas(anos)) {
            for (const [mes, dias] of entradas(meses)) {
                for (const [dia, r] of entradas(dias)) {
                    if (!r || !r.emocao) continue;
                    const chave = `${ano}-${pad(mes)}-${pad(dia)}`;
                    (novo.afetivogramas[pid] ||= {})[chave] = {
                        emocao: r.emocao,
                        intensidade: ['leve', 'neutro', 'elevada', 'critica'].includes(r.intensidade) ? r.intensidade : 'neutro',
                        observacoes: r.observacoes || '',
                        registradoEm: r.timestamp || Date.now()
                    };
                    relatorio.afetivogramas++;
                }
            }
        }
    }

    // Diários
    for (const [pid, registros] of entradas(antigo.diarios)) {
        if (!novo.usuarios[pid]) continue;
        for (const [id, r] of entradas(registros)) {
            if (!r || !r.texto) continue;
            (novo.diarios[pid] ||= {})[id] = { texto: r.texto, criadoEm: r.timestamp || Date.parse(r.dataCriacao) || Date.now() };
            relatorio.diarios++;
        }
    }

    // Alarmes
    for (const [pid, lista] of entradas(antigo.alarmes)) {
        if (!novo.usuarios[pid]) continue;
        for (const [id, a] of entradas(lista)) {
            if (!a || !a.horario) continue;
            const criado = a.dataCriacao || Date.now();
            (novo.alarmes[pid] ||= {})[id] = {
                nome: a.nome || 'Lembrete',
                horario: a.horario,
                dias: entradas(a.dias).map(([, d]) => Number(d)).sort((x, y) => x - y),
                observacoes: a.observacoes || '',
                ativo: a.ativo !== false,
                criadoEm: criado,
                atualizadoEm: criado
            };
            relatorio.alarmes++;
        }
    }

    // Relacionamentos → vínculos (1 médico por paciente; o mais recente vence)
    const rels = entradas(antigo.relacionamentos).map(([, r]) => r).filter((r) => r && r.ativo !== false)
        .sort((a, b) => (a.dataInicio || 0) - (b.dataInicio || 0));
    for (const r of rels) {
        const m = novo.usuarios[r.medicoId];
        const p = novo.usuarios[r.pacienteId];
        if (!m || !p || m.tipo !== 'medico' || p.tipo !== 'paciente') continue;
        const anterior = novo.vinculos.pacientes[r.pacienteId];
        if (anterior) delete novo.vinculos.medicos[anterior.medicoId][r.pacienteId];
        const desde = r.dataInicio || Date.now();
        (novo.vinculos.medicos[r.medicoId] ||= {})[r.pacienteId] = { desde };
        novo.vinculos.pacientes[r.pacienteId] = { medicoId: r.medicoId, desde };
        relatorio.vinculos++;
    }

    // Anotações: anotacoes/{id} → anotacoes/{pacienteId}/{id}
    for (const [id, a] of entradas(antigo.anotacoes)) {
        if (!a || !novo.usuarios[a.pacienteId] || !a.conteudo) continue;
        (novo.anotacoes[a.pacienteId] ||= {})[id] = {
            medicoId: a.medicoId,
            tipo: a.tipo || 'observacao',
            visibilidade: a.visibilidade === 'privada' ? 'privada' : 'paciente',
            prioridade: a.prioridade || 'media',
            conteudo: a.conteudo,
            criadoEm: a.timestamp || Date.now(),
            lida: !!a.lida
        };
        relatorio.anotacoes++;
    }

    return { novo, codigos, relatorio };
}

// ---------- Contas de demonstração ----------
function adicionarDemo(novo, codigos) {
    const senha = `Demo-${randomBytes(3).toString('hex')}`;
    const agora = Date.now();
    const DIA = 86400000;
    const contas = [];

    function conta(nome, email, tipo, extra = {}, diasAtras = 60) {
        const uid = pushId(agora - diasAtras * DIA);
        const usuario = { nome, email, tipo, ativo: true, criadoEm: agora - diasAtras * DIA, ...extra };
        if (tipo === 'paciente') {
            usuario.codigo = gerarCodigo(codigos);
            novo.indices.codigos[usuario.codigo] = uid;
        }
        novo.usuarios[uid] = usuario;
        novo.credenciais[uid] = criarCredencial(senha, usuario.criadoEm);
        novo.indices.emails[chaveEmail(email)] = uid;
        contas.push({ nome, email, tipo, codigo: usuario.codigo });
        return uid;
    }

    const medico = conta('Dra. Helena Duarte', 'medica.demo@moodalert.app', 'medico',
        { especialidade: 'Psiquiatria', crm: '45821/SC', telefone: '(48) 3333-1020' }, 90);
    const lucas = conta('Lucas Ferreira', 'lucas.demo@moodalert.app', 'paciente',
        { telefone: '(48) 99812-4410', nascimento: '1998-04-12' }, 70);
    const marina = conta('Marina Costa', 'marina.demo@moodalert.app', 'paciente',
        { telefone: '(48) 99654-2231', nascimento: '2001-09-30' }, 50);

    const vincular = (pid, diasAtras) => {
        const desde = agora - diasAtras * DIA;
        (novo.vinculos.medicos[medico] ||= {})[pid] = { desde };
        novo.vinculos.pacientes[pid] = { medicoId: medico, desde };
    };
    vincular(lucas, 65);
    vincular(marina, 45);

    // Afetivogramas: Lucas estável, Marina com piora recente (gera alertas no painel).
    const padraoLucas = [['Tranquila', 'leve'], ['Neutra', 'neutro'], ['Animada', 'leve'], ['Tranquila', 'neutro'], ['Neutra', 'leve'], ['Ansiosa', 'neutro']];
    const padraoMarina = [['Neutra', 'neutro'], ['Ansiosa', 'leve'], ['Tranquila', 'leve'], ['Animada', 'neutro'], ['Neutra', 'leve']];
    const recentesMarina = [['Ansiosa', 'elevada'], ['Irritada', 'elevada'], ['Ansiosa', 'critica'], ['Animada', 'elevada'], ['Irritada', 'critica']];
    const obs = { 3: 'Dormi pouco, muita coisa no trabalho.', 9: 'Caminhada no fim da tarde ajudou.', 15: 'Encontro com amigos, me senti bem.', 22: 'Esqueci a medicação de manhã.' };

    for (let d = 40; d >= 0; d--) {
        const data = new Date(agora - d * DIA);
        const chave = chaveData(data);
        if (d % 7 !== 4) {
            const [emocao, intensidade] = padraoLucas[(d * 5 + 2) % padraoLucas.length];
            (novo.afetivogramas[lucas] ||= {})[chave] = { emocao, intensidade, observacoes: obs[d] || '', registradoEm: data.getTime() - 3 * 3600000 };
        }
        if (d <= 38 && d % 6 !== 1) {
            const [emocao, intensidade] = d <= 5 ? recentesMarina[d % recentesMarina.length] : padraoMarina[(d * 3) % padraoMarina.length];
            (novo.afetivogramas[marina] ||= {})[chave] = {
                emocao, intensidade,
                observacoes: d === 1 ? 'Muita agitação, quase não dormi.' : d === 3 ? 'Discussão em casa, fiquei muito irritada.' : '',
                registradoEm: data.getTime() - 2 * 3600000
            };
        }
    }

    const diario = (pid, diasAtras, texto) => {
        const t = agora - diasAtras * DIA - 5 * 3600000;
        (novo.diarios[pid] ||= {})[pushId(t)] = { texto, criadoEm: t };
    };
    diario(lucas, 12, 'Primeira semana registrando todo dia. Percebi que fico mais ansioso nas segundas, quando a semana começa cheia.');
    diario(lucas, 6, 'Voltei a correr de manhã. O humor ficou bem mais estável durante o dia e dormi melhor.');
    diario(lucas, 1, 'Dia tranquilo. Consegui fazer tudo o que tinha planejado e tomei a medicação no horário certo.');
    diario(marina, 9, 'Semana boa, consegui organizar os estudos e sair um pouco.');
    diario(marina, 4, 'Comecei a ficar muito agitada à noite. Pensamentos acelerados, difícil desligar.');
    diario(marina, 1, 'Quase não dormi. Fiquei irritada com tudo hoje e briguei com minha irmã. Quero conversar sobre isso na consulta.');

    const alarme = (pid, nome, horario, dias, observacoes, ativo = true) => {
        const t = agora - 20 * DIA;
        (novo.alarmes[pid] ||= {})[pushId(t)] = { nome, horario, dias, observacoes, ativo, criadoEm: t, atualizadoEm: t };
    };
    alarme(lucas, 'Lítio 300 mg', '08:00', [0, 1, 2, 3, 4, 5, 6], '1 comprimido com o café da manhã');
    alarme(lucas, 'Registrar o afetivograma', '21:30', [0, 1, 2, 3, 4, 5, 6], '');
    alarme(marina, 'Quetiapina 25 mg', '22:00', [0, 1, 2, 3, 4, 5, 6], 'Tomar antes de dormir');
    alarme(marina, 'Terapia', '17:00', [3], 'Sessão semanal', false);

    const anotacao = (pid, diasAtras, tipo, visibilidade, prioridade, conteudo, lida) => {
        const t = agora - diasAtras * DIA;
        (novo.anotacoes[pid] ||= {})[pushId(t)] = { medicoId: medico, tipo, visibilidade, prioridade, conteudo, criadoEm: t, lida };
    };
    anotacao(lucas, 20, 'orientacao', 'paciente', 'media', 'Ótima adesão ao registro diário. Continue anotando o afetivograma todas as noites e mantenha a medicação no mesmo horário.', true);
    anotacao(lucas, 5, 'recomendacao', 'paciente', 'baixa', 'A atividade física está fazendo diferença no seu humor. Tente manter 3 corridas por semana.', false);
    anotacao(lucas, 5, 'observacao', 'privada', 'baixa', 'Quadro estável há 4 semanas. Avaliar redução gradual da frequência das consultas.', false);
    anotacao(marina, 2, 'alerta', 'paciente', 'alta', 'Percebi uma mudança importante nos seus registros desta semana. Antecipei sua consulta para amanhã. Se sentir que não está segura, procure o pronto atendimento ou ligue 188 (CVV).', false);
    anotacao(marina, 2, 'observacao', 'privada', 'alta', 'Sinais de possível episódio hipomaníaco: insônia, irritabilidade e agitação há 5 dias. Reavaliar dose e considerar ajuste.', false);

    return { senha, contas };
}

// ---------- Execução ----------
const antigo = await lerAntigo();
const { novo, codigos, relatorio } = migrar(antigo);
let demo = null;
if (comDemo) demo = adicionarDemo(novo, codigos);

const texto = JSON.stringify(novo);
if (/"senha"\s*:/.test(texto)) throw new Error('Segurança: sobrou um campo "senha" no resultado. Abortado.');

console.log('Migração concluída:');
console.table(relatorio);

if (saida && saida !== true) {
    writeFileSync(saida, JSON.stringify(novo, null, 2));
    console.log(`Arquivo gerado: ${saida}`);
}

if (demo) {
    const linhas = [
        '# Contas de demonstração (banco de teste)',
        '',
        `Geradas em ${new Date().toLocaleString('pt-BR')} pelo scripts/migrar-banco.mjs --demo.`,
        'São contas fictícias para apresentar o projeto. Todas usam a mesma senha.',
        '',
        `**Senha:** \`${demo.senha}\``,
        '',
        '| Conta | E-mail | Tipo | Código |',
        '|---|---|---|---|',
        ...demo.contas.map((c) => `| ${c.nome} | ${c.email} | ${c.tipo} | ${c.codigo || '—'} |`),
        ''
    ];
    writeFileSync(new URL('../CONTAS-DEMO.md', import.meta.url), linhas.join('\n'));
    console.log('Contas de demonstração salvas em CONTAS-DEMO.md');
}

if (enviar) {
    const resposta = await fetch(`${URL_BANCO}/.json`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: texto });
    if (!resposta.ok) throw new Error(`Falha ao enviar: HTTP ${resposta.status} ${await resposta.text()}`);
    console.log('Banco atualizado para a versão 2.');
}
