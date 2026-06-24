// ==================== INTEGRAÇÃO COM BANCO DE DADOS ====================
// Este arquivo contém as integrações do Firebase para a tela do paciente
// Deve ser incluído ANTES do paciente.js principal

// Verificar autenticação ao carregar a página
if (!Auth.requireAuth('paciente')) {
    // Já redireciona automaticamente
}

const USUARIO_ATUAL = Auth.getSession();
const PACIENTE_ID = Auth.getCurrentUserId();

console.log('Paciente autenticado:', USUARIO_ATUAL);

// Configuração inicial da interface com dados do usuário
document.addEventListener('DOMContentLoaded', async () => {
    await carregarDadosUsuario();
    await carregarMedicoResponsavel();
});

// Carregar dados do usuário
async function carregarDadosUsuario() {
    const resultado = await Database.Usuarios.buscar(PACIENTE_ID);
    
    if (resultado.success && resultado.data) {
        const usuario = resultado.data;
        
        // Atualizar nome do usuário no header
        const userChip = document.getElementById('userChip');
        if (userChip) {
            const nomeElement = userChip.querySelector('strong');
            if (nomeElement) {
                nomeElement.textContent = usuario.nome;
            }
            
            // Atualizar avatar com iniciais
            const avatar = userChip.querySelector('.avatar');
            if (avatar) {
                const iniciais = usuario.nome.split(' ')
                    .map(n => n[0])
                    .slice(0, 2)
                    .join('')
                    .toUpperCase();
                avatar.textContent = iniciais;
            }
        }

        // Atualizar informações do perfil (não sobrescrever, apenas se ainda não existe)
        if (!document.getElementById('perfilNome').textContent || document.getElementById('perfilNome').textContent === 'Não informado') {
            document.getElementById('perfilNome').textContent = usuario.nome;
        }
        if (!document.getElementById('perfilEmail').textContent || document.getElementById('perfilEmail').textContent === 'Não informado') {
            document.getElementById('perfilEmail').textContent = usuario.email;
        }
        document.getElementById('perfilId').textContent = PACIENTE_ID;
        
        // Atualizar telefone e nascimento se existirem no banco
        if (usuario.telefone) {
            document.getElementById('perfilTelefone').textContent = usuario.telefone;
        }
        if (usuario.nascimento) {
            const [ano, mes, dia] = usuario.nascimento.split('-');
            document.getElementById('perfilNascimento').textContent = `${dia}/${mes}/${ano}`;
        }
        
        // Atualizar foto de perfil se existir
        if (usuario.foto) {
            // Salvar foto no localStorage do perfil
            const perfilKey = `perfil-${PACIENTE_ID}`;
            const perfilSalvo = JSON.parse(localStorage.getItem(perfilKey) || '{}');
            perfilSalvo.foto = usuario.foto;
            localStorage.setItem(perfilKey, JSON.stringify(perfilSalvo));
            
            // Atualizar avatar visual
            const avatarPhoto = document.getElementById('avatarPhoto');
            const avatarInitials = document.querySelector('.avatar-initials');
            if (avatarPhoto && usuario.foto) {
                avatarPhoto.src = usuario.foto;
                avatarPhoto.style.display = 'block';
                if (avatarInitials) avatarInitials.style.display = 'none';
            }
            
            // Atualizar avatar do header
            const headerAvatar = document.querySelector('.user-chip .avatar');
            if (headerAvatar) {
                headerAvatar.innerHTML = '';
                const img = document.createElement('img');
                img.src = usuario.foto;
                img.alt = 'Avatar';
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
                headerAvatar.appendChild(img);
            }
        }
        
        // Formatar data de cadastro
        const dataCadastro = new Date(usuario.dataCadastro);
        const mesAno = dataCadastro.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
        document.getElementById('perfilCadastro').textContent = 
            mesAno.charAt(0).toUpperCase() + mesAno.slice(1);

        // Atualizar dataset do shell
        const shell = document.querySelector('.paciente-shell');
        if (shell) {
            shell.dataset.user = PACIENTE_ID;
        }
    }
}

// Carregar médico responsável
async function carregarMedicoResponsavel() {
    const resultado = await Database.Relacionamentos.buscarMedicoDoPaciente(PACIENTE_ID);
    
    if (resultado.success && resultado.data) {
        const medico = resultado.data;
        
        // Atualizar card do médico no perfil
        const medicoCard = document.querySelector('.medico-card');
        if (medicoCard) {
            const iniciais = medico.nome.split(' ')
                .map(n => n[0])
                .slice(0, 2)
                .join('')
                .toUpperCase();
            
            medicoCard.querySelector('.medico-avatar-small').textContent = iniciais;
            medicoCard.querySelector('h4').textContent = medico.nome;
            
            const especialidadeText = medico.crm ? 
                `Psiquiatra - CRM ${medico.crm}` : 
                'Psiquiatra';
            medicoCard.querySelector('p').textContent = especialidadeText;
        }
    }
}

// ==================== AFETIVOGRAMA COM FIREBASE ====================
window.AfetivogramaFirebase = {
    salvarDia: async (dia, dados) => {
        const hoje = new Date();
        const ano = hoje.getFullYear();
        const mes = hoje.getMonth() + 1;
        
        const resultado = await Database.Afetivograma.salvar(
            PACIENTE_ID,
            ano,
            mes,
            dia,
            {
                emocao: dados.emotion,
                intensidade: dados.intensity,
                observacoes: dados.note || ''
            }
        );
        
        return resultado.success;
    },

    carregarMes: async (ano, mes) => {
        // Se não receber parâmetros, usar mês atual
        if (!ano || !mes) {
            const hoje = new Date();
            ano = hoje.getFullYear();
            mes = hoje.getMonth() + 1;
        }
        
        console.log(`📅 Carregando afetivograma: ${ano}/${mes} para paciente ${PACIENTE_ID}`);
        
        const resultado = await Database.Afetivograma.buscarMes(PACIENTE_ID, ano, mes);
        
        if (resultado.success) {
            const registros = {};
            const dados = resultado.data || {};
            
            console.log('📦 Dados recebidos do Firebase:', dados);
            
            // Converter formato do Firebase para formato local
            Object.keys(dados).forEach(dia => {
                registros[dia] = {
                    emotion: dados[dia].emocao,
                    intensity: dados[dia].intensidade,
                    note: dados[dia].observacoes
                };
            });
            
            console.log('✅ Registros convertidos:', registros);
            
            return registros;
        }
        
        console.log('⚠️ Nenhum dado encontrado no Firebase');
        return {};
    }
};

// ==================== DIÁRIO COM FIREBASE ====================
window.DiarioFirebase = {
    salvar: async (texto) => {
        console.log('💾 Salvando diário para paciente:', PACIENTE_ID);
        const resultado = await Database.Diario.criar(PACIENTE_ID, texto);
        console.log('Resultado do salvamento:', resultado);
        return resultado;
    },

    carregar: async () => {
        console.log('📖 Carregando diário para paciente:', PACIENTE_ID);
        const resultado = await Database.Diario.buscar(PACIENTE_ID, 50);
        
        console.log('Resultado da busca:', resultado);
        
        if (resultado.success) {
            // Converter para formato esperado pelo código existente
            const registros = resultado.data.map(registro => ({
                id: registro.id,
                text: registro.texto,
                timestamp: registro.timestamp
            }));
            
            console.log('✅ Diário convertido:', registros);
            return registros;
        }
        
        console.log('⚠️ Nenhum registro de diário encontrado');
        return [];
    },

    excluir: async (registroId) => {
        console.log('🗑️ Excluindo registro:', registroId);
        const resultado = await Database.Diario.excluir(PACIENTE_ID, registroId);
        return resultado.success;
    }
};

// ==================== ALARMES COM FIREBASE ====================
window.AlarmesFirebase = {
    criar: async (dadosAlarme) => {
        console.log('⏰ Criando alarme para paciente:', PACIENTE_ID, dadosAlarme);
        const resultado = await Database.Alarmes.criar(PACIENTE_ID, dadosAlarme);
        console.log('Resultado da criação:', resultado);
        return resultado;
    },

    atualizar: async (alarmeId, dados) => {
        console.log('✏️ Atualizando alarme:', alarmeId, dados);
        const resultado = await Database.Alarmes.atualizar(PACIENTE_ID, alarmeId, dados);
        return resultado.success;
    },

    carregar: async () => {
        console.log('📋 Carregando alarmes para paciente:', PACIENTE_ID);
        const resultado = await Database.Alarmes.buscar(PACIENTE_ID);
        console.log('Resultado da busca de alarmes:', resultado);
        return resultado.success ? resultado.data : [];
    },

    excluir: async (alarmeId) => {
        console.log('🗑️ Excluindo alarme:', alarmeId);
        const resultado = await Database.Alarmes.excluir(PACIENTE_ID, alarmeId);
        return resultado.success;
    },

    toggleAtivo: async (alarmeId, ativo) => {
        console.log('🔄 Toggle alarme:', alarmeId, 'ativo:', ativo);
        const resultado = await Database.Alarmes.toggleAtivo(PACIENTE_ID, alarmeId, ativo);
        return resultado.success;
    }
};

// ==================== ANOTAÇÕES MÉDICAS COM FIREBASE ====================
window.AnotacoesFirebase = {
    carregar: async () => {
        const resultado = await Database.Anotacoes.buscarPorPaciente(PACIENTE_ID, 'paciente');
        
        if (resultado.success) {
            // Buscar dados do médico para cada anotação
            const anotacoesComMedico = [];
            
            for (const anotacao of resultado.data) {
                const medico = await Database.Usuarios.buscar(anotacao.medicoId);
                
                if (medico.success && medico.data) {
                    const iniciais = medico.data.nome.split(' ')
                        .map(n => n[0])
                        .slice(0, 2)
                        .join('')
                        .toUpperCase();
                    
                    anotacoesComMedico.push({
                        ...anotacao,
                        medico: {
                            nome: medico.data.nome,
                            especialidade: 'Psiquiatra',
                            iniciais
                        }
                    });
                }
            }
            
            return anotacoesComMedico;
        }
        
        return [];
    },

    marcarLida: async (anotacaoId) => {
        const resultado = await Database.Anotacoes.marcarLida(anotacaoId);
        return resultado.success;
    }
};

// ==================== BOTÃO DE SAIR ====================
document.addEventListener('DOMContentLoaded', () => {
    const btnSair = document.querySelector('.topbar button.primary.ghost');
    if (btnSair) {
        btnSair.addEventListener('click', () => {
            if (confirm('Deseja realmente sair?')) {
                Auth.logout();
            }
        });
    }
});
