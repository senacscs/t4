// Operações de banco de dados para todas as funcionalidades

// Garantir que Firebase está pronto antes de usar
function ensureFirebaseReady() {
    return new Promise((resolve) => {
        if (FirebaseHelper && FirebaseHelper.isReady()) {
            resolve();
        } else {
            const checkReady = setInterval(() => {
                if (FirebaseHelper && FirebaseHelper.isReady()) {
                    clearInterval(checkReady);
                    resolve();
                }
            }, 100);
        }
    });
}

const Database = {
    // ==================== AFETIVOGRAMA ====================
    Afetivograma: {
        // Salvar registro de um dia
        salvar: async (pacienteId, ano, mes, dia, dados) => {
            try {
                await ensureFirebaseReady();
                const path = `afetivogramas/${pacienteId}/${ano}/${mes}/${dia}`;
                const registro = {
                    emocao: dados.emocao,
                    intensidade: dados.intensidade,
                    observacoes: dados.observacoes || '',
                    timestamp: Date.now()
                };
                
                await window.db.ref(path).set(registro);
                return { success: true };
            } catch (error) {
                return { success: false, error: error.message };
            }
        },

        // Buscar afetivograma de um mês
        buscarMes: async (pacienteId, ano, mes) => {
            try {
                await ensureFirebaseReady();
                const snapshot = await window.db.ref(`afetivogramas/${pacienteId}/${ano}/${mes}`).once('value');
                return { success: true, data: snapshot.val() || {} };
            } catch (error) {
                return { success: false, error: error.message };
            }
        },

        // Buscar últimos registros
        buscarUltimos: async (pacienteId, limite = 30) => {
            try {
                await ensureFirebaseReady();
                const snapshot = await window.db.ref(`afetivogramas/${pacienteId}`)
                    .orderByChild('timestamp')
                    .limitToLast(limite)
                    .once('value');
                return { success: true, data: snapshot.val() || {} };
            } catch (error) {
                return { success: false, error: error.message };
            }
        }
    },

    // ==================== DIÁRIO ====================
    Diario: {
        // Criar novo registro
        criar: async (pacienteId, texto) => {
            try {
                await ensureFirebaseReady();
                const registroId = FirebaseHelper.generateId();
                const registro = {
                    texto: texto.trim(),
                    timestamp: Date.now(),
                    dataCriacao: new Date().toISOString()
                };

                await window.db.ref(`diarios/${pacienteId}/${registroId}`).set(registro);
                return { success: true, registroId };
            } catch (error) {
                return { success: false, error: error.message };
            }
        },

        // Buscar registros do diário
        buscar: async (pacienteId, limite = 50) => {
            try {
                await ensureFirebaseReady();
                const snapshot = await window.db.ref(`diarios/${pacienteId}`)
                    .orderByChild('timestamp')
                    .limitToLast(limite)
                    .once('value');
                
                const registros = [];
                snapshot.forEach((child) => {
                    registros.push({
                        id: child.key,
                        ...child.val()
                    });
                });

                // Ordenar do mais recente para o mais antigo
                registros.reverse();
                
                return { success: true, data: registros };
            } catch (error) {
                return { success: false, error: error.message };
            }
        },

        // Excluir registro
        excluir: async (pacienteId, registroId) => {
            try {
                await ensureFirebaseReady();
                await window.db.ref(`diarios/${pacienteId}/${registroId}`).remove();
                return { success: true };
            } catch (error) {
                return { success: false, error: error.message };
            }
        }
    },

    // ==================== ALARMES ====================
    Alarmes: {
        // Criar alarme
        criar: async (pacienteId, dadosAlarme) => {
            try {
                await ensureFirebaseReady();
                const alarmeId = FirebaseHelper.generateId();
                const alarme = {
                    nome: dadosAlarme.nome,
                    horario: dadosAlarme.horario,
                    dias: dadosAlarme.dias,
                    observacoes: dadosAlarme.observacoes || '',
                    ativo: true,
                    dataCriacao: Date.now()
                };

                await window.db.ref(`alarmes/${pacienteId}/${alarmeId}`).set(alarme);
                return { success: true, alarmeId };
            } catch (error) {
                return { success: false, error: error.message };
            }
        },

        // Atualizar alarme
        atualizar: async (pacienteId, alarmeId, dados) => {
            try {
                await ensureFirebaseReady();
                await window.db.ref(`alarmes/${pacienteId}/${alarmeId}`).update(dados);
                return { success: true };
            } catch (error) {
                return { success: false, error: error.message };
            }
        },

        // Buscar alarmes
        buscar: async (pacienteId) => {
            try {
                await ensureFirebaseReady();
                const snapshot = await window.db.ref(`alarmes/${pacienteId}`).once('value');
                const alarmes = [];
                
                snapshot.forEach((child) => {
                    alarmes.push({
                        id: child.key,
                        ...child.val()
                    });
                });

                return { success: true, data: alarmes };
            } catch (error) {
                return { success: false, error: error.message };
            }
        },

        // Excluir alarme
        excluir: async (pacienteId, alarmeId) => {
            try {
                await ensureFirebaseReady();
                await window.db.ref(`alarmes/${pacienteId}/${alarmeId}`).remove();
                return { success: true };
            } catch (error) {
                return { success: false, error: error.message };
            }
        },

        // Ativar/Desativar alarme
        toggleAtivo: async (pacienteId, alarmeId, ativo) => {
            try {
                await ensureFirebaseReady();
                await window.db.ref(`alarmes/${pacienteId}/${alarmeId}`).update({ ativo });
                return { success: true };
            } catch (error) {
                return { success: false, error: error.message };
            }
        }
    },

    // ==================== ANOTAÇÕES MÉDICAS ====================
    Anotacoes: {
        // Criar anotação
        criar: async (medicoId, pacienteId, dadosAnotacao) => {
            try {
                await ensureFirebaseReady();
                const anotacaoId = FirebaseHelper.generateId();
                const anotacao = {
                    medicoId,
                    pacienteId,
                    tipo: dadosAnotacao.tipo,
                    visibilidade: dadosAnotacao.visibilidade,
                    conteudo: dadosAnotacao.conteudo,
                    prioridade: dadosAnotacao.prioridade || 'media',
                    timestamp: Date.now(),
                    lida: false
                };

                await window.db.ref(`anotacoes/${anotacaoId}`).set(anotacao);
                return { success: true, anotacaoId };
            } catch (error) {
                return { success: false, error: error.message };
            }
        },

        // Buscar anotações de um paciente
        buscarPorPaciente: async (pacienteId, visibilidade = null) => {
            try {
                await ensureFirebaseReady();
                let query = window.db.ref('anotacoes').orderByChild('pacienteId').equalTo(pacienteId);
                const snapshot = await query.once('value');
                
                const anotacoes = [];
                snapshot.forEach((child) => {
                    const data = { id: child.key, ...child.val() };
                    
                    // Filtrar por visibilidade se especificado
                    if (!visibilidade || data.visibilidade === visibilidade) {
                        anotacoes.push(data);
                    }
                });

                // Ordenar por timestamp (mais recente primeiro)
                anotacoes.sort((a, b) => b.timestamp - a.timestamp);
                
                return { success: true, data: anotacoes };
            } catch (error) {
                return { success: false, error: error.message };
            }
        },

        // Buscar anotações de um médico
        buscarPorMedico: async (medicoId) => {
            try {
                await ensureFirebaseReady();
                const snapshot = await window.db.ref('anotacoes')
                    .orderByChild('medicoId')
                    .equalTo(medicoId)
                    .once('value');
                
                const anotacoes = [];
                snapshot.forEach((child) => {
                    anotacoes.push({ id: child.key, ...child.val() });
                });

                anotacoes.sort((a, b) => b.timestamp - a.timestamp);
                
                return { success: true, data: anotacoes };
            } catch (error) {
                return { success: false, error: error.message };
            }
        },

        // Marcar como lida
        marcarLida: async (anotacaoId) => {
            try {
                await ensureFirebaseReady();
                await window.db.ref(`anotacoes/${anotacaoId}`).update({ lida: true });
                return { success: true };
            } catch (error) {
                return { success: false, error: error.message };
            }
        },

        // Excluir anotação
        excluir: async (anotacaoId) => {
            try {
                await ensureFirebaseReady();
                await window.db.ref(`anotacoes/${anotacaoId}`).remove();
                return { success: true };
            } catch (error) {
                return { success: false, error: error.message };
            }
        }
    },

    // ==================== RELACIONAMENTOS ====================
    Relacionamentos: {
        // Criar relacionamento médico-paciente
        criar: async (medicoId, pacienteId) => {
            try {
                await ensureFirebaseReady();
                const relacionamentoId = FirebaseHelper.generateId();
                const relacionamento = {
                    medicoId,
                    pacienteId,
                    dataInicio: Date.now(),
                    ativo: true
                };

                await window.db.ref(`relacionamentos/${relacionamentoId}`).set(relacionamento);
                return { success: true, relacionamentoId };
            } catch (error) {
                return { success: false, error: error.message };
            }
        },

        // Buscar médico de um paciente
        buscarMedicoDoPaciente: async (pacienteId) => {
            try {
                await ensureFirebaseReady();
                const snapshot = await window.db.ref('relacionamentos')
                    .orderByChild('pacienteId')
                    .equalTo(pacienteId)
                    .once('value');

                let medicoId = null;
                snapshot.forEach((child) => {
                    const rel = child.val();
                    if (rel.ativo) {
                        medicoId = rel.medicoId;
                    }
                });

                if (!medicoId) {
                    return { success: true, data: null };
                }

                // Buscar dados do médico
                const medicoSnapshot = await window.db.ref(`usuarios/${medicoId}`).once('value');
                const medico = medicoSnapshot.val();

                return { 
                    success: true, 
                    data: medico ? { id: medicoId, ...medico } : null 
                };
            } catch (error) {
                return { success: false, error: error.message };
            }
        },

        // Buscar pacientes de um médico
        buscarPacientesDoMedico: async (medicoId) => {
            try {
                await ensureFirebaseReady();
                const snapshot = await window.db.ref('relacionamentos')
                    .orderByChild('medicoId')
                    .equalTo(medicoId)
                    .once('value');

                const pacientesIds = [];
                snapshot.forEach((child) => {
                    const rel = child.val();
                    if (rel.ativo) {
                        pacientesIds.push(rel.pacienteId);
                    }
                });

                // Buscar dados dos pacientes
                const pacientes = [];
                for (const pacienteId of pacientesIds) {
                    const pacienteSnapshot = await window.db.ref(`usuarios/${pacienteId}`).once('value');
                    const paciente = pacienteSnapshot.val();
                    if (paciente) {
                        pacientes.push({ id: pacienteId, ...paciente });
                    }
                }

                return { success: true, data: pacientes };
            } catch (error) {
                return { success: false, error: error.message };
            }
        }
    },

    // ==================== USUÁRIOS ====================
    Usuarios: {
        // Buscar usuário por ID
        buscar: async (userId) => {
            try {
                await ensureFirebaseReady();
                const snapshot = await window.db.ref(`usuarios/${userId}`).once('value');
                const usuario = snapshot.val();
                
                return { 
                    success: true, 
                    data: usuario ? { id: userId, ...usuario } : null 
                };
            } catch (error) {
                return { success: false, error: error.message };
            }
        },

        // Atualizar perfil
        atualizar: async (userId, dados) => {
            try {
                await ensureFirebaseReady();
                // Campos permitidos para atualização
                const camposPermitidos = ['nome', 'email', 'telefone', 'nascimento', 'foto'];
                const dadosPermitidos = {};
                
                // Filtrar apenas campos permitidos
                Object.keys(dados).forEach(key => {
                    if (camposPermitidos.includes(key) && dados[key] !== undefined) {
                        dadosPermitidos[key] = dados[key];
                    }
                });
                
                await window.db.ref(`usuarios/${userId}`).update(dadosPermitidos);
                console.log('📝 Dados atualizados no Firebase:', Object.keys(dadosPermitidos));
                return { success: true };
            } catch (error) {
                console.error('❌ Erro ao atualizar usuário:', error);
                return { success: false, error: error.message };
            }
        }
    }
};

// Exportar para uso global
window.Database = Database;
