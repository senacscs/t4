document.addEventListener('DOMContentLoaded', () => {
    // Elementos principais
    const navButtons = [...document.querySelectorAll('.nav-btn')];
    const panels = [...document.querySelectorAll('.panel')];
    const userChipMedico = document.getElementById('userChipMedico');
    const perfilMedicoModal = document.getElementById('perfilMedicoModal');
    const anotacaoModal = document.getElementById('anotacaoModal');
    const anotacaoForm = document.getElementById('anotacaoForm');
    const idPacienteInput = document.getElementById('idPaciente');
    const pacienteDetalhado = document.getElementById('pacienteDetalhado');
    const btnSair = document.getElementById('btnSair');
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');

    // Menu Toggle para Mobile
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            const isOpen = sidebar.classList.contains('open');
            menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
            const icon = menuToggle.querySelector('ion-icon');
            if (icon) {
                icon.setAttribute('name', isOpen ? 'close-outline' : 'menu-outline');
            }
        });

        // Fechar sidebar ao clicar fora (apenas em mobile)
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && 
                sidebar.classList.contains('open') && 
                !sidebar.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                sidebar.classList.remove('open');
                const icon = menuToggle.querySelector('ion-icon');
                if (icon) {
                    icon.setAttribute('name', 'menu-outline');
                }
            }
        });

        // Fechar sidebar ao clicar em um item de navegação (mobile)
        navButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('open');
                    const icon = menuToggle.querySelector('ion-icon');
                    if (icon) {
                        icon.setAttribute('name', 'menu-outline');
                    }
                }
            });
        });
    }

    // Adicionar evento ao botão Sair
    if (btnSair) {
        btnSair.addEventListener('click', () => {
            if (confirm('Deseja realmente sair?')) {
                Auth.logout();
            }
        });
    }

    // Navegação entre seções (atualizado para usar panels)
    function mostrarSecao(target) {
        // Atualizar botões de navegação
        navButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        });
        const activeBtn = navButtons.find(btn => btn.dataset.target === target);
        if (activeBtn) {
            activeBtn.classList.add('active');
            activeBtn.setAttribute('aria-pressed', 'true');
        }

        // Mostrar panel correspondente
        panels.forEach(panel => {
            panel.setAttribute('hidden', '');
        });
        const activePanel = panels.find(panel => panel.dataset.section === target);
        if (activePanel) {
            activePanel.removeAttribute('hidden');
        }
    }

    // Exportar função para uso global
    window.mostrarSecao = mostrarSecao;

    // Event listeners para navegação
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            mostrarSecao(btn.dataset.target);
        });
    });
    
    // Mostrar primeira seção por padrão
    mostrarSecao('dashboard');
    
    // Upload de foto do médico
    const avatarInputMedico = document.getElementById('avatarInputMedico');
    if (avatarInputMedico) {
        avatarInputMedico.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            if (!file.type.startsWith('image/')) {
                if (window.mostrarNotificacao) {
                    window.mostrarNotificacao('Por favor, selecione uma imagem válida.', 'error');
                }
                return;
            }
            
            const reader = new FileReader();
            reader.onload = async (event) => {
                const fotoUrl = event.target.result;
                
                // Atualizar no Firebase
                if (MEDICO_ID) {
                    const resultado = await Database.Usuarios.atualizar(MEDICO_ID, { foto: fotoUrl });
                    
                    if (resultado.success) {
                        // Atualizar avatar no modal
                        const avatarPhoto = document.getElementById('avatarPhotoMedico');
                        if (avatarPhoto) {
                            avatarPhoto.src = fotoUrl;
                            avatarPhoto.style.display = 'block';
                        }
                        
                        // Atualizar avatar no header
                        const headerAvatar = document.querySelector('#userChipMedico .avatar');
                        if (headerAvatar) {
                            let headerImg = headerAvatar.querySelector('img');
                            if (!headerImg) {
                                headerImg = document.createElement('img');
                                headerAvatar.appendChild(headerImg);
                            }
                            headerImg.src = fotoUrl;
                            headerImg.style.width = '100%';
                            headerImg.style.height = '100%';
                            headerImg.style.objectFit = 'cover';
                            headerImg.style.position = 'absolute';
                            headerImg.style.top = '0';
                            headerImg.style.left = '0';
                        }
                        
                        mostrarNotificacaoSucesso('Foto atualizada com sucesso!');
                    } else {
                        alert('Erro ao atualizar foto. Tente novamente.');
                    }
                }
            };
            reader.readAsDataURL(file);
        });
    }

    // Buscar paciente - agora usa Firebase
    window.buscarPaciente = async function() {
        if (window.buscarPacienteFirebase) {
            await window.buscarPacienteFirebase();
        } else {
            mostrarNotificacao('Sistema ainda carregando...', 'error');
        }
    };

    // Sistema de tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            mostrarTab(btn.dataset.tab);
        });
    });

    function mostrarTab(target) {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));

        const activeBtn = [...tabButtons].find(btn => btn.dataset.tab === target);
        const activePanel = [...tabPanels].find(panel => panel.dataset.panel === target);

        if (activeBtn) activeBtn.classList.add('active');
        if (activePanel) activePanel.classList.add('active');
    }

    // Modal de anotação
    window.abrirModalAnotacao = function() {
        if (!window.pacienteAtualVisualizando) {
            mostrarNotificacao('Selecione um paciente primeiro.', 'error');
            return;
        }

        anotacaoModal.setAttribute('aria-hidden', 'false');
        anotacaoModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };

    window.fecharModalAnotacao = function() {
        anotacaoModal.setAttribute('aria-hidden', 'true');
        anotacaoModal.style.display = 'none';
        document.body.style.overflow = '';
        if (anotacaoForm) anotacaoForm.reset();
    };

    // Fechar modais
    const closeButtons = document.querySelectorAll('.close-btn');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            modal.setAttribute('aria-hidden', 'true');
            modal.style.display = 'none';
            document.body.style.overflow = '';
        });
    });

    // Fechar modal clicando fora
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.setAttribute('aria-hidden', 'true');
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    });

    // Fechar modal com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modalsAbertos = [...document.querySelectorAll('.modal')].filter(modal => 
                modal.style.display === 'flex'
            );
            modalsAbertos.forEach(modal => {
                modal.setAttribute('aria-hidden', 'true');
                modal.style.display = 'none';
                document.body.style.overflow = '';
            });
        }
    });

    // Modal de perfil médico
    if (userChipMedico && perfilMedicoModal) {
        userChipMedico.addEventListener('click', () => {
            perfilMedicoModal.setAttribute('aria-hidden', 'false');
            perfilMedicoModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    }

    // Modal de adicionar paciente
    window.abrirModalAdicionarPaciente = function() {
        const modal = document.getElementById('adicionarPacienteModal');
        if (modal) {
            modal.setAttribute('aria-hidden', 'false');
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    };

    window.fecharModalAdicionarPaciente = function() {
        const modal = document.getElementById('adicionarPacienteModal');
        const form = document.getElementById('adicionarPacienteForm');
        if (modal) {
            modal.setAttribute('aria-hidden', 'true');
            modal.style.display = 'none';
            document.body.style.overflow = '';
            if (form) form.reset();
        }
    };

    // Submeter formulário de adicionar paciente
    const adicionarPacienteForm = document.getElementById('adicionarPacienteForm');
    if (adicionarPacienteForm) {
        adicionarPacienteForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const idPacienteAdicionar = document.getElementById('idPacienteAdicionar');
            const pacienteId = idPacienteAdicionar.value.trim();
            
            if (!pacienteId) {
                if (window.mostrarNotificacao) {
                    window.mostrarNotificacao('Digite o ID do paciente.', 'error');
                }
                return;
            }

            // Verificar se o usuário existe e é paciente
            const usuarioResult = await Database.Usuarios.buscar(pacienteId);
            
            if (!usuarioResult.success || !usuarioResult.data) {
                if (window.mostrarNotificacao) {
                    window.mostrarNotificacao('Paciente não encontrado.', 'error');
                }
                return;
            }

            if (usuarioResult.data.tipo !== 'paciente') {
                if (window.mostrarNotificacao) {
                    window.mostrarNotificacao('Este ID não pertence a um paciente.', 'error');
                }
                return;
            }

            // Criar relacionamento
            const medicoId = Auth.getCurrentUserId();
            const resultado = await Database.Relacionamentos.criar(medicoId, pacienteId);
            
            if (resultado.success) {
                if (window.mostrarNotificacao) {
                    window.mostrarNotificacao('Paciente adicionado com sucesso!', 'success');
                }
                fecharModalAdicionarPaciente();
                
                // Recarregar lista de pacientes
                if (window.location) {
                    window.location.reload();
                }
            } else {
                if (window.mostrarNotificacao) {
                    window.mostrarNotificacao('Erro ao adicionar paciente.', 'error');
                }
            }
        });
    }

    // Funções utilitárias
    function capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    window.mostrarNotificacao = function(mensagem, tipo = 'success') {
        const notificacao = document.createElement('div');
        notificacao.className = `notificacao ${tipo}`;
        notificacao.textContent = mensagem;
        
        notificacao.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${tipo === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            z-index: 10000;
            font-weight: 500;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notificacao);
        
        setTimeout(() => {
            notificacao.style.transform = 'translateX(0)';
        }, 10);
        
        setTimeout(() => {
            notificacao.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notificacao.parentNode) {
                    document.body.removeChild(notificacao);
                }
            }, 300);
        }, 3000);
    };

    // Permitir buscar com Enter
    if (idPacienteInput) {
        idPacienteInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                buscarPaciente();
            }
        });
    }

    // Inicializar dashboard
    mostrarSecao('dashboard');
});

// Função para copiar ID do médico
function copiarIdMedico() {
    const idElement = document.getElementById('perfilMedicoId');
    if (!idElement) return;
    
    const id = idElement.textContent;
    
    // Tentar copiar usando a API moderna
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(id).then(() => {
            mostrarNotificacaoSucesso('ID copiado!');
        }).catch(() => {
            // Fallback se falhar
            copiarIdFallback(id);
        });
    } else {
        // Fallback para navegadores antigos
        copiarIdFallback(id);
    }
}

function copiarIdFallback(texto) {
    const textarea = document.createElement('textarea');
    textarea.value = texto;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        document.execCommand('copy');
        mostrarNotificacaoSucesso('ID copiado!');
    } catch (err) {
        mostrarNotificacaoSucesso('Erro ao copiar');
    }
    
    document.body.removeChild(textarea);
}

function mostrarNotificacaoSucesso(mensagem) {
    // Criar notificação temporária
    const notif = document.createElement('div');
    notif.textContent = mensagem;
    notif.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #34aa7c;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.style.opacity = '0';
        notif.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notif);
        }, 300);
    }, 2000);
}

// Funções de edição de perfil
function ativarEdicaoPerfil() {
    const visualizacao = document.getElementById('perfilVisualizacao');
    const edicaoForm = document.getElementById('perfilEdicaoForm');
    const btnEditar = document.getElementById('btnEditarPerfil');
    const acoesEdicao = document.getElementById('acoesEdicao');
    
    // Preencher formulário com valores atuais
    const email = document.getElementById('perfilMedicoEmail').textContent;
    const nascimento = document.getElementById('perfilMedicoNascimento').textContent;
    const telefone = document.getElementById('perfilMedicoTelefone').textContent;
    
    document.getElementById('editEmail').value = email !== '-' ? email : '';
    document.getElementById('editTelefone').value = telefone !== 'Não informado' && telefone !== '-' ? telefone : '';
    
    // Converter data para formato input
    if (nascimento !== 'Não informado' && nascimento !== '-') {
        // Assumindo formato DD/MM/YYYY
        const partes = nascimento.split('/');
        if (partes.length === 3) {
            document.getElementById('editNascimento').value = `${partes[2]}-${partes[1]}-${partes[0]}`;
        }
    }
    
    // Alternar visualização
    visualizacao.style.display = 'none';
    edicaoForm.style.display = 'block';
    btnEditar.style.display = 'none';
    acoesEdicao.style.display = 'flex';
}

function cancelarEdicaoPerfil() {
    const visualizacao = document.getElementById('perfilVisualizacao');
    const edicaoForm = document.getElementById('perfilEdicaoForm');
    const btnEditar = document.getElementById('btnEditarPerfil');
    const acoesEdicao = document.getElementById('acoesEdicao');
    
    visualizacao.style.display = 'block';
    edicaoForm.style.display = 'none';
    btnEditar.style.display = 'block';
    acoesEdicao.style.display = 'none';
}

async function salvarPerfilMedico() {
    const email = document.getElementById('editEmail').value;
    const nascimento = document.getElementById('editNascimento').value;
    const telefone = document.getElementById('editTelefone').value;
    
    // Validar email
    if (!email) {
        alert('Por favor, preencha o email.');
        return;
    }
    
    try {
        const medicoId = Auth.getCurrentUserId();
        
        // Converter data para formato DD/MM/YYYY
        let dataNascimento = null;
        if (nascimento) {
            const partes = nascimento.split('-');
            dataNascimento = `${partes[2]}/${partes[1]}/${partes[0]}`;
        }
        
        // Atualizar no Firebase
        const dados = {
            email: email,
            dataNascimento: dataNascimento || 'Não informado',
            telefone: telefone || 'Não informado'
        };
        
        await Database.Usuarios.atualizar(medicoId, dados);
        
        // Atualizar visualização
        document.getElementById('perfilMedicoEmail').textContent = email;
        document.getElementById('perfilMedicoNascimento').textContent = dataNascimento || 'Não informado';
        document.getElementById('perfilMedicoTelefone').textContent = telefone || 'Não informado';
        
        // Voltar para visualização
        cancelarEdicaoPerfil();
        
        mostrarNotificacaoSucesso('Perfil atualizado com sucesso!');
    } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
        alert('Erro ao atualizar perfil. Tente novamente.');
    }
}