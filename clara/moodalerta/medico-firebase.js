// ==================== INTEGRAÇÃO COM BANCO DE DADOS ====================
// Este arquivo contém as integrações do Firebase para a tela do médico

// Variáveis globais
let MEDICO_ID = null;
let MEDICO_ATUAL = null;

// Verificar autenticação ao carregar a página
if (!Auth.requireAuth('medico')) {
    // Já redireciona automaticamente
} else {
    MEDICO_ATUAL = Auth.getSession();
    MEDICO_ID = Auth.getCurrentUserId();
    console.log('Médico autenticado:', MEDICO_ATUAL);
}

// Configuração inicial da interface com dados do médico
document.addEventListener('DOMContentLoaded', async () => {
    if (MEDICO_ID) {
        await carregarDadosMedico();
        await carregarPacientes();
        await carregarTodasAnotacoes();
    }
});

// Carregar dados do médico
async function carregarDadosMedico() {
    const resultado = await Database.Usuarios.buscar(MEDICO_ID);
    
    if (resultado.success && resultado.data) {
        const medico = resultado.data;
        
        // Atualizar header
        const userChip = document.getElementById('userChipMedico');
        if (userChip) {
            const iniciais = medico.nome.split(' ')
                .map(n => n[0])
                .slice(0, 2)
                .join('')
                .toUpperCase();
            
            const avatar = userChip.querySelector('.avatar');
            if (avatar) {
                avatar.textContent = iniciais;
            }
            
            const userName = userChip.querySelector('strong');
            if (userName) {
                userName.textContent = medico.nome;
            }
        }

        // Atualizar modal de perfil
        const perfilModal = document.getElementById('perfilMedicoModal');
        if (perfilModal) {
            const iniciais = medico.nome.split(' ')
                .map(n => n[0])
                .slice(0, 2)
                .join('')
                .toUpperCase();
            
            // Atualizar avatar com iniciais
            const avatarInitials = perfilModal.querySelector('.avatar-initials');
            if (avatarInitials) {
                avatarInitials.textContent = iniciais;
            }
            
            // Atualizar nome e tipo
            const nomeElement = perfilModal.querySelector('.perfil-info h2');
            if (nomeElement) {
                nomeElement.textContent = medico.nome;
            }
            
            const perfilTipo = perfilModal.querySelector('.perfil-tipo');
            if (perfilTipo) {
                perfilTipo.textContent = medico.especialidade || 'Médico';
            }
            
            // Atualizar ID da conta
            const idElement = document.getElementById('perfilMedicoId');
            if (idElement) {
                idElement.textContent = MEDICO_ID;
            }
            
            // Atualizar informações pessoais
            const emailElement = document.getElementById('perfilMedicoEmail');
            if (emailElement) {
                emailElement.textContent = medico.email || '-';
            }
            
            const nascimentoElement = document.getElementById('perfilMedicoNascimento');
            if (nascimentoElement) {
                nascimentoElement.textContent = medico.dataNascimento || 'Não informado';
            }
            
            const telefoneElement = document.getElementById('perfilMedicoTelefone');
            if (telefoneElement) {
                telefoneElement.textContent = medico.telefone || 'Não informado';
            }
            
            // Atualizar data de cadastro
            const cadastroElement = document.getElementById('perfilMedicoCadastro');
            if (cadastroElement && medico.dataCriacao) {
                const data = new Date(medico.dataCriacao);
                const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
                              'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
                cadastroElement.textContent = `${meses[data.getMonth()]} de ${data.getFullYear()}`;
            }
            
            // Carregar foto se existir
            if (medico.foto) {
                const avatarPhoto = document.getElementById('avatarPhotoMedico');
                if (avatarPhoto) {
                    avatarPhoto.src = medico.foto;
                    avatarPhoto.style.display = 'block';
                }
                
                // Atualizar foto no header também
                const headerAvatar = userChip?.querySelector('.avatar');
                if (headerAvatar) {
                    let headerImg = headerAvatar.querySelector('img');
                    if (!headerImg) {
                        headerImg = document.createElement('img');
                        headerAvatar.appendChild(headerImg);
                    }
                    headerImg.src = medico.foto;
                    headerImg.style.width = '100%';
                    headerImg.style.height = '100%';
                    headerImg.style.objectFit = 'cover';
                    headerImg.style.position = 'absolute';
                    headerImg.style.top = '0';
                    headerImg.style.left = '0';
                }
            }
        }
    }
}

// Carregar lista de pacientes
async function carregarPacientes() {
    const resultado = await Database.Relacionamentos.buscarPacientesDoMedico(MEDICO_ID);
    
    if (resultado.success) {
        window.pacientesDoMedico = resultado.data || [];
        atualizarDashboard();
        renderizarListaPacientes();
    }
}

// Atualizar dashboard com estatísticas
async function atualizarDashboard() {
    const totalPacientes = window.pacientesDoMedico ? window.pacientesDoMedico.length : 0;
    
    // Atualizar cards de estatísticas
    const statCards = document.querySelectorAll('.stat-card');
    if (statCards[0]) {
        statCards[0].querySelector('.stat-number').textContent = totalPacientes;
    }

    // Carregar dados adicionais de estatísticas
    let totalAnotacoes = 0;
    let totalRegistrosHoje = 0;

    if (window.pacientesDoMedico) {
        for (const paciente of window.pacientesDoMedico) {
            // Contar anotações
            const anotacoes = await Database.Anotacoes.buscarPorPaciente(paciente.id);
            if (anotacoes.success && anotacoes.data) {
                totalAnotacoes += anotacoes.data.length;
            }

            // Verificar registros de hoje
            const hoje = new Date();
            const afetivo = await Database.Afetivograma.buscarMes(
                paciente.id,
                hoje.getFullYear(),
                hoje.getMonth() + 1
            );
            if (afetivo.success && afetivo.data && afetivo.data[hoje.getDate()]) {
                totalRegistrosHoje++;
            }
        }
    }

    if (statCards[1]) {
        statCards[1].querySelector('.stat-number').textContent = totalAnotacoes;
    }
    if (statCards[3]) {
        statCards[3].querySelector('.stat-number').textContent = totalRegistrosHoje;
    }

    // Carregar pacientes recentes
    await carregarPacientesRecentes();
    await carregarAlertas();
}

// Renderizar grid de pacientes
function renderizarListaPacientes() {
    const grid = document.getElementById('pacientesGrid');
    if (!grid) return;
    
    grid.innerHTML = '';

    if (!window.pacientesDoMedico || window.pacientesDoMedico.length === 0) {
        grid.innerHTML = '<p class="muted-text" style="grid-column: 1/-1; text-align: center; padding: 40px;">Você ainda não tem pacientes cadastrados.</p>';
        return;
    }
    
    window.pacientesDoMedico.forEach(paciente => {
        const iniciais = paciente.nome.split(' ')
            .map(n => n[0])
            .slice(0, 2)
            .join('')
            .toUpperCase();
        
        const card = document.createElement('div');
        card.className = 'paciente-card';
        card.dataset.paciente = paciente.id;
        
        card.innerHTML = `
            <div class="paciente-header">
                <div class="paciente-avatar-grande">${iniciais}</div>
                <div class="paciente-detalhes">
                    <h3>${paciente.nome}</h3>
                    <p>ID: ${paciente.id}</p>
                    <span class="paciente-desde">Paciente desde ${formatarDataCadastro(paciente.dataCadastro)}</span>
                </div>
                <div class="paciente-acoes">
                    <button class="btn-visualizar" onclick="visualizarPacienteFirebase('${paciente.id}')">
                        <span>👁️</span>
                        Visualizar
                    </button>
                </div>
            </div>
            <div class="paciente-resumo">
                <div class="resumo-item">
                    <span class="resumo-label">Último registro:</span>
                    <span class="resumo-valor" id="ultimo-${paciente.id}">Carregando...</span>
                </div>
                <div class="resumo-item">
                    <span class="resumo-label">Humor atual:</span>
                    <span class="resumo-valor" id="humor-${paciente.id}">-</span>
                </div>
                <div class="resumo-item">
                    <span class="resumo-label">Registros:</span>
                    <span class="resumo-valor" id="registros-${paciente.id}">0</span>
                </div>
            </div>
        `;
        
        grid.appendChild(card);
        
        // Carregar dados adicionais do paciente
        carregarResumoPaciente(paciente.id);
    });
}

// Carregar resumo de atividades do paciente
async function carregarResumoPaciente(pacienteId) {
    // Buscar último diário
    const diarios = await Database.Diario.buscar(pacienteId, 1);
    if (diarios.success && diarios.data.length > 0) {
        const ultimoRegistro = diarios.data[0];
        const tempoDecorrido = formatarTempoDecorrido(ultimoRegistro.timestamp);
        document.getElementById(`ultimo-${pacienteId}`).textContent = tempoDecorrido;
    }
    
    // Buscar afetivograma do mês atual
    const hoje = new Date();
    const afetivo = await Database.Afetivograma.buscarMes(
        pacienteId,
        hoje.getFullYear(),
        hoje.getMonth() + 1
    );
    
    if (afetivo.success && afetivo.data) {
        const dias = Object.keys(afetivo.data);
        document.getElementById(`registros-${pacienteId}`).textContent = dias.length;
        
        // Pegar humor do dia atual se existir
        const diaAtual = hoje.getDate();
        if (afetivo.data[diaAtual]) {
            const humor = afetivo.data[diaAtual].emocao;
            document.getElementById(`humor-${pacienteId}`).textContent = humor;
        }
    }
}

// Visualizar paciente específico
window.visualizarPacienteFirebase = async function(pacienteId) {
    // Mudar para aba de acompanhar
    if (window.mostrarSecao) {
        window.mostrarSecao('acompanhar');
    }
    
    // Preencher ID e buscar
    document.getElementById('idPaciente').value = pacienteId;
    await buscarPacienteFirebase();
};

// Buscar paciente por ID
window.buscarPacienteFirebase = async function() {
    const idInput = document.getElementById('idPaciente');
    const pacienteId = idInput.value.trim();
    
    if (!pacienteId) {
        if (window.mostrarNotificacao) {
            window.mostrarNotificacao('Por favor, digite o ID do paciente.', 'error');
        }
        return;
    }

    // Buscar dados do paciente
    const resultado = await Database.Usuarios.buscar(pacienteId);
    
    if (!resultado.success || !resultado.data || resultado.data.tipo !== 'paciente') {
        if (window.mostrarNotificacao) {
            window.mostrarNotificacao('Paciente não encontrado.', 'error');
        }
        document.getElementById('pacienteDetalhado').style.display = 'none';
        return;
    }

    const paciente = resultado.data;
    window.pacienteAtualVisualizando = { ...paciente, id: pacienteId };
    
    // Atualizar interface
    exibirPacienteDetalhadoFirebase(paciente, pacienteId);
    if (window.mostrarNotificacao) {
        window.mostrarNotificacao('Paciente encontrado com sucesso!', 'success');
    }
};

// Exibir detalhes completos do paciente
async function exibirPacienteDetalhadoFirebase(paciente, pacienteId) {
    const iniciais = paciente.nome.split(' ')
        .map(n => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
    
    // Atualizar header
    document.getElementById('avatarDetalhado').textContent = iniciais;
    document.getElementById('nomeDetalhado').textContent = paciente.nome;
    document.getElementById('idDetalhado').textContent = `ID: ${pacienteId}`;
    document.getElementById('desdeDetalhado').textContent = 
        `Paciente desde ${formatarDataCadastro(paciente.dataCadastro)}`;

    // Mostrar container
    document.getElementById('pacienteDetalhado').style.display = 'block';

    // Carregar dados
    await carregarAfetivogramaPaciente(pacienteId);
    await carregarDiarioPaciente(pacienteId);
    await carregarAnotacoesPaciente(pacienteId);
}

// Carregar afetivograma do paciente
async function carregarAfetivogramaPaciente(pacienteId) {
    const hoje = new Date();
    const resultado = await Database.Afetivograma.buscarMes(
        pacienteId,
        hoje.getFullYear(),
        hoje.getMonth() + 1
    );
    
    if (resultado.success) {
        renderizarAfetivogramaFirebase(resultado.data || {});
    }
}

// Renderizar afetivograma
function renderizarAfetivogramaFirebase(dados) {
    const grid = document.getElementById('afetivoGridMedico');
    if (!grid) return;
    
    grid.innerHTML = '';

    for (let dia = 1; dia <= 30; dia++) {
        const dayElement = document.createElement('div');
        
        // Usar intensidade se disponível, senão usar emoção
        let classe = 'neutro';
        let titulo = 'Sem registro';
        
        if (dados[dia]) {
            // Priorizar intensidade
            if (dados[dia].intensidade) {
                classe = dados[dia].intensidade.toLowerCase();
                titulo = `${dados[dia].emocao || ''} - ${dados[dia].intensidade}`;
            } else if (dados[dia].emocao) {
                // Fallback para emoção
                const emocao = dados[dia].emocao.toLowerCase();
                classe = emocao;
                titulo = dados[dia].emocao;
            }
        }
        
        dayElement.className = `afetivo-day ${classe}`;
        dayElement.textContent = dia;
        dayElement.title = titulo;
        grid.appendChild(dayElement);
    }
}

// Carregar diário do paciente
async function carregarDiarioPaciente(pacienteId) {
    const resultado = await Database.Diario.buscar(pacienteId, 20);
    
    if (resultado.success) {
        renderizarDiarioFirebase(resultado.data);
    }
}

// Renderizar diário
function renderizarDiarioFirebase(entradas) {
    const container = document.getElementById('diarioListaMedico');
    if (!container) return;
    
    container.innerHTML = '';

    if (entradas.length === 0) {
        container.innerHTML = '<p class="muted-text">Nenhum registro no diário ainda.</p>';
        return;
    }

    entradas.forEach(entrada => {
        const data = new Date(entrada.timestamp);
        const dataFormatada = data.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        const entradaElement = document.createElement('div');
        entradaElement.className = 'diario-entrada';
        entradaElement.innerHTML = `
            <div class="entrada-header">
                <div class="entrada-data">${dataFormatada}</div>
            </div>
            <div class="entrada-conteudo">
                <p>${entrada.texto}</p>
            </div>
        `;
        container.appendChild(entradaElement);
    });
}

// Carregar anotações do paciente
async function carregarAnotacoesPaciente(pacienteId) {
    const resultado = await Database.Anotacoes.buscarPorPaciente(pacienteId);
    
    if (resultado.success) {
        renderizarAnotacoesFirebase(resultado.data);
    }
}

// Renderizar anotações
function renderizarAnotacoesFirebase(anotacoes) {
    const pacienteContainer = document.getElementById('anotacoesPaciente');
    const privadasContainer = document.getElementById('anotacoesPrivadas');
    
    if (!pacienteContainer || !privadasContainer) return;

    // Filtrar anotações
    const paraPackente = anotacoes.filter(a => a.visibilidade === 'paciente');
    const privadas = anotacoes.filter(a => a.visibilidade === 'privada');

    // Renderizar anotações para paciente
    pacienteContainer.innerHTML = '';
    paraPackente.forEach(anotacao => {
        const data = new Date(anotacao.timestamp).toLocaleDateString('pt-BR');
        const elemento = document.createElement('div');
        elemento.className = 'anotacao-item paciente';
        elemento.innerHTML = `
            <div class="anotacao-header">
                <span class="anotacao-data">${data}</span>
                <span class="anotacao-tipo">${capitalizeFirst(anotacao.tipo)}</span>
            </div>
            <div class="anotacao-conteudo">${anotacao.conteudo}</div>
        `;
        pacienteContainer.appendChild(elemento);
    });

    if (paraPackente.length === 0) {
        pacienteContainer.innerHTML = '<p class="muted-text">Nenhuma anotação para o paciente ainda.</p>';
    }

    // Renderizar anotações privadas
    privadasContainer.innerHTML = '';
    privadas.forEach(anotacao => {
        const data = new Date(anotacao.timestamp).toLocaleDateString('pt-BR');
        const elemento = document.createElement('div');
        elemento.className = 'anotacao-item privada';
        elemento.innerHTML = `
            <div class="anotacao-header">
                <span class="anotacao-data">${data}</span>
                <span class="anotacao-tipo">${capitalizeFirst(anotacao.tipo)}</span>
            </div>
            <div class="anotacao-conteudo">${anotacao.conteudo}</div>
        `;
        privadasContainer.appendChild(elemento);
    });

    if (privadas.length === 0) {
        privadasContainer.innerHTML = '<p class="muted-text">Nenhuma anotação privada ainda.</p>';
    }
}

// Salvar nova anotação
window.salvarAnotacaoFirebase = async function(event) {
    event.preventDefault();
    
    if (!window.pacienteAtualVisualizando) {
        if (window.mostrarNotificacao) {
            window.mostrarNotificacao('Selecione um paciente primeiro.', 'error');
        }
        return;
    }

    const tipo = document.getElementById('tipoAnotacao').value;
    const visibilidade = document.getElementById('visibilidadeAnotacao').value;
    const conteudo = document.getElementById('conteudoAnotacao').value.trim();

    if (!tipo || !visibilidade || !conteudo) {
        if (window.mostrarNotificacao) {
            window.mostrarNotificacao('Preencha todos os campos.', 'error');
        }
        return;
    }

    const resultado = await Database.Anotacoes.criar(
        MEDICO_ID,
        window.pacienteAtualVisualizando.id,
        { tipo, visibilidade, conteudo, prioridade: 'media' }
    );

    if (resultado.success) {
        if (window.mostrarNotificacao) {
            window.mostrarNotificacao('Anotação salva com sucesso!', 'success');
        }
        if (window.fecharModalAnotacao) {
            window.fecharModalAnotacao();
        }
        
        // Recarregar anotações
        await carregarAnotacoesPaciente(window.pacienteAtualVisualizando.id);
        await carregarTodasAnotacoes();
    } else {
        if (window.mostrarNotificacao) {
            window.mostrarNotificacao('Erro ao salvar anotação.', 'error');
        }
    }
};

// Funções auxiliares
function formatarDataCadastro(timestamp) {
    const data = new Date(timestamp);
    return data.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
}

function formatarTempoDecorrido(timestamp) {
    const agora = Date.now();
    const diferenca = agora - timestamp;
    
    const minutos = Math.floor(diferenca / 60000);
    const horas = Math.floor(diferenca / 3600000);
    const dias = Math.floor(diferenca / 86400000);
    
    if (minutos < 60) return `há ${minutos} min`;
    if (horas < 24) return `há ${horas}h`;
    return `há ${dias} dia${dias > 1 ? 's' : ''}`;
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Substituir o submit do formulário de anotação
document.addEventListener('DOMContentLoaded', () => {
    const anotacaoForm = document.getElementById('anotacaoForm');
    if (anotacaoForm) {
        anotacaoForm.removeEventListener('submit', anotacaoForm.onsubmit);
        anotacaoForm.addEventListener('submit', salvarAnotacaoFirebase);
    }
});

// ==================== FUNÇÕES ADICIONAIS ====================

// Carregar pacientes recentes no dashboard
async function carregarPacientesRecentes() {
    const container = document.getElementById('pacientesRecentes');
    if (!container || !window.pacientesDoMedico) return;

    container.innerHTML = '';

    // Pegar até 3 pacientes mais recentes
    const pacientesRecentes = window.pacientesDoMedico.slice(0, 3);

    for (const paciente of pacientesRecentes) {
        const iniciais = paciente.nome.split(' ')
            .map(n => n[0])
            .slice(0, 2)
            .join('')
            .toUpperCase();

        // Buscar último registro
        const diarios = await Database.Diario.buscar(paciente.id, 1);
        let ultimoRegistro = 'Sem registros';
        let statusClass = 'positivo';
        let statusText = 'Estável';

        if (diarios.success && diarios.data.length > 0) {
            ultimoRegistro = formatarTempoDecorrido(diarios.data[0].timestamp);
        }

        // Buscar humor atual
        const hoje = new Date();
        const afetivo = await Database.Afetivograma.buscarMes(
            paciente.id,
            hoje.getFullYear(),
            hoje.getMonth() + 1
        );

        if (afetivo.success && afetivo.data && afetivo.data[hoje.getDate()]) {
            const emocao = afetivo.data[hoje.getDate()].emocao.toLowerCase();
            if (emocao.includes('triste') || emocao.includes('angustia')) {
                statusClass = 'atencao';
                statusText = 'Atenção';
            } else if (emocao.includes('animada') || emocao.includes('tranquila')) {
                statusClass = 'positivo';
                statusText = 'Bem';
            }
        }

        const item = document.createElement('div');
        item.className = 'paciente-item';
        item.style.cursor = 'pointer';
        item.onclick = () => visualizarPacienteFirebase(paciente.id);
        item.innerHTML = `
            <div class="paciente-avatar">${iniciais}</div>
            <div class="paciente-info">
                <h4>${paciente.nome}</h4>
                <p>Último registro: ${ultimoRegistro}</p>
            </div>
            <div class="paciente-status">
                <span class="status-badge ${statusClass}">${statusText}</span>
            </div>
        `;

        container.appendChild(item);
    }
}

// Carregar alertas
async function carregarAlertas() {
    const container = document.getElementById('alertasLista');
    if (!container || !window.pacientesDoMedico) return;

    container.innerHTML = '';

    // Analisar pacientes para gerar alertas
    for (const paciente of window.pacientesDoMedico) {
        const hoje = new Date();
        const afetivo = await Database.Afetivograma.buscarMes(
            paciente.id,
            hoje.getFullYear(),
            hoje.getMonth() + 1
        );

        if (afetivo.success && afetivo.data) {
            // Verificar últimos 3 dias
            let diasTriste = 0;
            for (let i = 0; i < 3; i++) {
                const dia = hoje.getDate() - i;
                if (dia > 0 && afetivo.data[dia]) {
                    const emocao = afetivo.data[dia].emocao.toLowerCase();
                    if (emocao.includes('triste') || emocao.includes('angustia')) {
                        diasTriste++;
                    }
                }
            }

            if (diasTriste >= 2) {
                const alerta = document.createElement('div');
                alerta.className = 'alerta-item urgente';
                alerta.style.cursor = 'pointer';
                alerta.onclick = () => visualizarPacienteFirebase(paciente.id);
                alerta.innerHTML = `
                    <div class="alerta-icon">⚠️</div>
                    <div class="alerta-info">
                        <h4>${paciente.nome} - Humor baixo</h4>
                        <p>Registrou tristeza nos últimos dias</p>
                        <span class="alerta-tempo">Requer atenção</span>
                    </div>
                `;
                container.appendChild(alerta);
            }

            // Verificar registros positivos por 7 dias
            let diasPositivos = 0;
            for (let i = 0; i < 7; i++) {
                const dia = hoje.getDate() - i;
                if (dia > 0 && afetivo.data[dia]) {
                    const emocao = afetivo.data[dia].emocao.toLowerCase();
                    if (emocao.includes('animada') || emocao.includes('tranquila')) {
                        diasPositivos++;
                    }
                }
            }

            if (diasPositivos >= 6) {
                const alerta = document.createElement('div');
                alerta.className = 'alerta-item info';
                alerta.style.cursor = 'pointer';
                alerta.onclick = () => visualizarPacienteFirebase(paciente.id);
                alerta.innerHTML = `
                    <div class="alerta-icon">📊</div>
                    <div class="alerta-info">
                        <h4>${paciente.nome} - Melhora significativa</h4>
                        <p>Registros positivos na última semana</p>
                        <span class="alerta-tempo">Progresso positivo</span>
                    </div>
                `;
                container.appendChild(alerta);
            }
        }
    }

    if (container.children.length === 0) {
        container.innerHTML = '<p class="muted-text">Nenhum alerta no momento.</p>';
    }
}

// Carregar todas as anotações para a seção "Anotações Gerais"
async function carregarTodasAnotacoes() {
    if (!MEDICO_ID) return;

    const resultado = await Database.Anotacoes.buscarPorMedico(MEDICO_ID);
    
    if (resultado.success && resultado.data) {
        window.todasAnotacoes = resultado.data;
        renderizarAnotacoesGerais(resultado.data);
        preencherFiltroPacientes();
    }
}

// Renderizar anotações gerais
async function renderizarAnotacoesGerais(anotacoes) {
    const container = document.getElementById('anotacoesGeralLista');
    if (!container) return;

    container.innerHTML = '';

    if (!anotacoes || anotacoes.length === 0) {
        container.innerHTML = '<p class="muted-text">Nenhuma anotação ainda.</p>';
        return;
    }

    // Ordenar por timestamp (mais recente primeiro)
    anotacoes.sort((a, b) => b.timestamp - a.timestamp);

    for (const anotacao of anotacoes) {
        // Buscar dados do paciente
        const pacienteRes = await Database.Usuarios.buscar(anotacao.pacienteId);
        if (!pacienteRes.success) continue;

        const paciente = pacienteRes.data;
        const iniciais = paciente.nome.split(' ')
            .map(n => n[0])
            .slice(0, 2)
            .join('')
            .toUpperCase();

        const data = new Date(anotacao.timestamp).toLocaleDateString('pt-BR');

        const item = document.createElement('div');
        item.className = 'anotacao-geral';
        item.dataset.tipo = anotacao.visibilidade;
        item.dataset.paciente = anotacao.pacienteId;
        item.innerHTML = `
            <div class="anotacao-cabecalho">
                <div class="paciente-ref" style="cursor: pointer;" onclick="visualizarPacienteFirebase('${anotacao.pacienteId}')">
                    <div class="paciente-avatar-pequeno">${iniciais}</div>
                    <span>${paciente.nome}</span>
                </div>
                <div class="anotacao-meta">
                    <span class="anotacao-data">${data}</span>
                    <span class="anotacao-tipo-badge ${anotacao.visibilidade}">
                        ${anotacao.visibilidade === 'paciente' ? 'Para Paciente' : 'Privada'}
                    </span>
                </div>
            </div>
            <div class="anotacao-conteudo">${anotacao.conteudo}</div>
        `;

        container.appendChild(item);
    }
}

// Preencher filtro de pacientes
function preencherFiltroPacientes() {
    const filtro = document.getElementById('filtroPaciente');
    if (!filtro || !window.pacientesDoMedico) return;

    // Limpar opções antigas (manter "Todos")
    filtro.innerHTML = '<option value="todos">Todos os pacientes</option>';

    // Adicionar pacientes
    window.pacientesDoMedico.forEach(paciente => {
        const option = document.createElement('option');
        option.value = paciente.id;
        option.textContent = paciente.nome;
        filtro.appendChild(option);
    });
}

// Aplicar filtros nas anotações gerais
window.aplicarFiltrosAnotacoes = function() {
    const filtroTipo = document.getElementById('filtroTipo');
    const filtroPaciente = document.getElementById('filtroPaciente');
    
    if (!filtroTipo || !filtroPaciente) return;

    const tipoSelecionado = filtroTipo.value;
    const pacienteSelecionado = filtroPaciente.value;

    const anotacoes = document.querySelectorAll('.anotacao-geral');

    anotacoes.forEach(anotacao => {
        let mostrar = true;

        // Filtro por tipo
        if (tipoSelecionado !== 'todas') {
            const tipo = anotacao.dataset.tipo;
            if (tipo !== tipoSelecionado) {
                mostrar = false;
            }
        }

        // Filtro por paciente
        if (pacienteSelecionado !== 'todos') {
            const paciente = anotacao.dataset.paciente;
            if (paciente !== pacienteSelecionado) {
                mostrar = false;
            }
        }

        anotacao.style.display = mostrar ? 'block' : 'none';
    });
};

// Adicionar listeners aos filtros
document.addEventListener('DOMContentLoaded', () => {
    const filtroTipo = document.getElementById('filtroTipo');
    const filtroPaciente = document.getElementById('filtroPaciente');
    
    if (filtroTipo) {
        filtroTipo.addEventListener('change', aplicarFiltrosAnotacoes);
    }
    if (filtroPaciente) {
        filtroPaciente.addEventListener('change', aplicarFiltrosAnotacoes);
    }
});
