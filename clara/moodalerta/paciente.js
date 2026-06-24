document.addEventListener('DOMContentLoaded', () => {
    // Verificar autenticação
    if (!Auth?.isAuthenticated()) {
        window.location.href = '../index.html';
        return;
    }

    // Carregar informações do usuário
    const sessao = Auth.getSession();
    const userChipName = document.querySelector('.user-chip strong');
    if (userChipName && sessao?.nome) {
        userChipName.textContent = sessao.nome;
    }

    // Adicionar evento ao botão Sair
    const btnSair = document.querySelector('.topbar .primary.ghost');
    if (btnSair) {
        btnSair.addEventListener('click', () => {
            if (confirm('Deseja realmente sair?')) {
                Auth.logout();
            }
        });
    }

    const modal = document.getElementById('emocaoModal');
    const form = document.getElementById('emocaoForm');
    const dayInput = document.getElementById('diaSelecionado');
    const title = document.getElementById('tituloDia');
    const emotionSelect = document.getElementById('emocao');
    const notesField = document.getElementById('observacoes');
    const closeBtn = modal.querySelector('.close-btn');
    const pacienteShell = document.querySelector('.paciente-shell');
    const afetivoSection = document.querySelector('.afetivograma');
    const days = [...document.querySelectorAll('.afetivo-grid .day')];
    const navButtons = [...document.querySelectorAll('.nav-btn[data-target]')];
    const sections = [...document.querySelectorAll('[data-section]')];
    const diarioForm = document.getElementById('diarioForm');
    const diarioLista = document.getElementById('diarioLista');
    const diarioVazio = document.getElementById('diarioVazio');
    const diarioTexto = document.getElementById('diarioTexto');
    const diarioStatus = document.getElementById('diarioStatus');
    const diarioCount = document.getElementById('diarioCount');
    
    // Obter ID do usuário logado
    const getUserId = () => {
        const sessao = Auth?.getSession();
        return sessao?.userId || 'default';
    };
    const userId = getUserId();
    
    console.log('🔑 User ID:', userId);
    console.log('📦 Storage Keys:', {
        afetivograma: `afetivograma-${userId}-${afetivoSection?.dataset.month ?? 'default'}`,
        diario: `diario-${userId}`,
        alarmes: `alarmes-${userId}`,
        anotacoes: `anotacoes-medicas-${userId}`
    });
    
    const storageKey = `afetivograma-${userId}-${afetivoSection?.dataset.month ?? 'default'}`;
    const diaryKey = `diario-${userId}`;
    const intensityClasses = ['leve', 'neutro', 'elevada', 'critica'];

    const ensureDayStructure = (btn) => {
        if (!btn || btn.querySelector('.day-number')) return;
        const numberSpan = document.createElement('span');
        numberSpan.className = 'day-number';
        numberSpan.textContent = btn.dataset.day || '';

        const emotionSpan = document.createElement('span');
        emotionSpan.className = 'day-emotion';
        emotionSpan.textContent = btn.dataset.emotion || '';

        btn.textContent = '';
        btn.append(numberSpan, emotionSpan);
    };

    const updateEmotionLabel = (btn, label) => {
        const emotionSpan = btn?.querySelector('.day-emotion');
        if (emotionSpan) {
            emotionSpan.textContent = label || '';
        }
    };

    let registros = {};
    let diarioRegistros = [];

    const [sectionYear, sectionMonth] = (afetivoSection?.dataset.month || '').split('-').map(Number);
    const hoje = new Date();
    const bloqueioAtivo = !Number.isNaN(sectionYear) && !Number.isNaN(sectionMonth)
        && hoje.getFullYear() === sectionYear && hoje.getMonth() + 1 === sectionMonth;
    const diaAtual = bloqueioAtivo ? hoje.getDate() : null;

    try {
        registros = JSON.parse(localStorage.getItem(storageKey) || '{}');
    } catch (error) {
        console.warn('Não foi possível ler o afetivograma salvo:', error);
    }

    try {
        diarioRegistros = JSON.parse(localStorage.getItem(diaryKey) || '[]');
    } catch (error) {
        console.warn('Não foi possível ler o diário salvo:', error);
    }

    // Carregar dados do Firebase
    const carregarDadosFirebase = async () => {
        if (!window.AfetivogramaFirebase || !window.DiarioFirebase || !window.AlarmesFirebase) {
            console.log('⏳ Aguardando Firebase...');
            return;
        }

        try {
            // Carregar afetivograma do mês atual
            if (sectionYear && sectionMonth) {
                const afetivogramaData = await window.AfetivogramaFirebase.carregarMes(sectionYear, sectionMonth);
                if (afetivogramaData && Object.keys(afetivogramaData).length > 0) {
                    registros = { ...registros, ...afetivogramaData };
                    localStorage.setItem(storageKey, JSON.stringify(registros));
                    console.log('✅ Afetivograma carregado do Firebase:', afetivogramaData);
                    
                    // Aplicar estados nos botões
                    Object.entries(registros).forEach(([dia, info]) => {
                        const btn = findDayButton(Number(dia));
                        if (btn) aplicarEstado(btn, info);
                    });
                } else {
                    console.log('ℹ️ Nenhum registro de afetivograma encontrado');
                }
            }

            // Carregar diário
            const diarioData = await window.DiarioFirebase.carregar();
            if (diarioData && Array.isArray(diarioData) && diarioData.length > 0) {
                diarioRegistros = diarioData;
                localStorage.setItem(diaryKey, JSON.stringify(diarioRegistros));
                renderizarDiario();
                console.log('✅ Diário carregado do Firebase:', diarioData.length, 'registros');
            } else {
                console.log('ℹ️ Nenhum registro de diário encontrado');
            }

            // Carregar alarmes
            const alarmesData = await window.AlarmesFirebase.carregar();
            if (alarmesData && Array.isArray(alarmesData) && alarmesData.length > 0) {
                alarmes = alarmesData;
                salvarAlarmes();
                renderizarAlarmes();
                console.log('✅ Alarmes carregados do Firebase:', alarmesData.length, 'alarmes');
            } else {
                console.log('ℹ️ Nenhum alarme encontrado');
            }

            // Carregar anotações médicas
            if (window.AnotacoesFirebase) {
                const anotacoesData = await window.AnotacoesFirebase.carregar();
                if (anotacoesData && Array.isArray(anotacoesData) && anotacoesData.length > 0) {
                    renderizarAnotacoes(anotacoesData);
                    console.log('✅ Anotações médicas carregadas do Firebase:', anotacoesData.length, 'anotações');
                } else {
                    console.log('ℹ️ Nenhuma anotação médica encontrada');
                }
            }
        } catch (error) {
            console.error('❌ Erro ao carregar dados do Firebase:', error);
        }
    };

    // Tentar carregar após pequeno delay para garantir que Firebase está pronto
    setTimeout(carregarDadosFirebase, 500);

    const findDayButton = (day) => days.find((btn) => btn.dataset.day === String(day));

    const aplicarEstado = (btn, info) => {
        if (!btn) return;
        ensureDayStructure(btn);
        btn.classList.remove(...intensityClasses);
        const intensidade = info?.intensity || btn.dataset.intensity || 'neutro';
        btn.classList.add(intensidade);
        btn.dataset.intensity = intensidade;
        if (info?.emotion) {
            btn.dataset.emotion = info.emotion;
            btn.classList.add('has-entry');
            btn.title = `Dia ${btn.dataset.day} · ${info.emotion} (${intensidade})`;
            updateEmotionLabel(btn, info.emotion);
        } else {
            btn.classList.remove('has-entry');
            btn.title = `Dia ${btn.dataset.day}`;
            delete btn.dataset.emotion;
            updateEmotionLabel(btn, undefined);
        }
        if (info?.note) {
            btn.dataset.note = info.note;
        } else {
            delete btn.dataset.note;
        }
    };

    days.forEach(ensureDayStructure);

    if (diaAtual) {
        days.forEach((btn) => {
            const numero = Number(btn.dataset.day);
            if (Number.isNaN(numero) || numero <= diaAtual) {
                return;
            }
            btn.disabled = true;
            btn.classList.add('locked');
            btn.title = `Dia ${btn.dataset.day} ainda não pode ser preenchido`;
        });
    }

    Object.entries(registros).forEach(([day, info]) => {
        aplicarEstado(findDayButton(day), info);
    });

    const abrirModal = (btn) => {
        if (!btn) return;
        modal.setAttribute('aria-hidden', 'false');
        modal.classList.add('open');
        dayInput.value = btn.dataset.day;
        title.textContent = `Dia ${btn.dataset.day}`;
        emotionSelect.value = btn.dataset.emotion || '';
        notesField.value = registros[btn.dataset.day]?.note || '';
        const intensidadeAtual = btn.dataset.intensity || 'neutro';
        form.querySelectorAll('input[name="intensidade"]').forEach((radio) => {
            radio.checked = radio.value === intensidadeAtual;
        });
    };

    const fecharModal = () => {
        modal.setAttribute('aria-hidden', 'true');
        modal.classList.remove('open');
        form.reset();
    };

    days.forEach((btn) => {
        if (!btn.dataset.day) return;
        ensureDayStructure(btn);
        if (!btn.title) {
            btn.title = `Dia ${btn.dataset.day}`;
        }
        if (btn.disabled) {
            return;
        }
        btn.addEventListener('click', () => abrirModal(btn));
    });

    closeBtn.addEventListener('click', fecharModal);
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            fecharModal();
        }
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const dia = dayInput.value;
        const emocao = emotionSelect.value;
        const intensidade = form.querySelector('input[name="intensidade"]:checked')?.value;
        const nota = notesField.value.trim();

        if (!dia || !emocao || !intensidade) {
            return;
        }

        registros[dia] = { emotion: emocao, intensity: intensidade, note: nota };
        
        // Salvar no localStorage (backup local)
        localStorage.setItem(storageKey, JSON.stringify(registros));
        
        // Salvar no Firebase
        if (window.AfetivogramaFirebase) {
            const sucesso = await window.AfetivogramaFirebase.salvarDia(dia, registros[dia]);
            if (sucesso) {
                console.log('✅ Afetivograma salvo no Firebase!');
            } else {
                console.error('❌ Erro ao salvar no Firebase');
            }
        }
        
        aplicarEstado(findDayButton(dia), registros[dia]);
        fecharModal();
    });

    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
            fecharModal();
        }
    });

    const formatadorData = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
    });

    const atualizarContador = () => {
        if (!diarioTexto || !diarioCount) return;
        diarioCount.textContent = `${diarioTexto.value.length}/${diarioTexto.maxLength}`;
    };

    if (diarioTexto) {
        diarioTexto.addEventListener('input', () => {
            diarioTexto.style.height = 'auto';
            diarioTexto.style.height = `${diarioTexto.scrollHeight}px`;
            atualizarContador();
        });
        atualizarContador();
    }

    const salvarDiario = () => {
        localStorage.setItem(diaryKey, JSON.stringify(diarioRegistros));
    };

    const renderizarDiario = () => {
        if (!diarioLista) return;
        diarioLista.innerHTML = '';
        if (!diarioRegistros.length) {
            if (diarioVazio) {
                diarioVazio.hidden = false;
                diarioLista.appendChild(diarioVazio);
            }
            return;
        }

        if (diarioVazio) {
            diarioVazio.hidden = true;
        }

        const fragment = document.createDocumentFragment();
        const ordenados = diarioRegistros
            .slice()
            .sort((a, b) => b.timestamp - a.timestamp);

        ordenados.forEach((entry, index) => {
            // const sequencial = index + 1; // 1 = mais recente
            // const numero = `#${String(sequencial).padStart(2, '0')}`;
            const item = document.createElement('article');
            item.className = 'diario-entry';
            // item.dataset.entryIndex = numero;

            const header = document.createElement('header');
            // const indice = document.createElement('span');
            // indice.className = 'entry-index';
            // indice.textContent = numero;

            const meta = document.createElement('span');
            meta.className = 'entry-meta';
            meta.textContent = formatadorData.format(new Date(entry.timestamp));

            header.append(meta);
            const texto = document.createElement('div');
            texto.className = 'entry-text';
            const partes = entry.text.split(/\n+/).filter(Boolean);
            if (!partes.length) {
                partes.push(entry.text);
            }
            partes.forEach((parte) => {
                const p = document.createElement('p');
                p.textContent = parte;
                texto.appendChild(p);
            });

            item.append(header, texto);
            fragment.appendChild(item);
        });

        diarioLista.appendChild(fragment);
    };

    renderizarDiario();

    if (diarioForm) {
        diarioForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const text = diarioTexto?.value.trim();

            if (!text) {
                return;
            }

            const entry = {
                id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36),
                text,
                timestamp: Date.now()
            };

            diarioRegistros.unshift(entry);
            diarioRegistros = diarioRegistros.slice(0, 50);
            
            // Salvar no localStorage (backup local)
            salvarDiario();
            
            // Salvar no Firebase
            if (window.DiarioFirebase) {
                const resultado = await window.DiarioFirebase.salvar(text);
                if (resultado.success) {
                    console.log('✅ Diário salvo no Firebase!');
                } else {
                    console.error('❌ Erro ao salvar diário no Firebase');
                }
            }
            
            renderizarDiario();
            diarioForm.reset();
            if (diarioTexto) {
                diarioTexto.style.height = 'auto';
                atualizarContador();
            }
            if (diarioStatus) {
                diarioStatus.textContent = 'Registro salvo';
                setTimeout(() => {
                    diarioStatus.textContent = '';
                }, 2500);
            }
        });
    }

    const mostrarSecao = (alvo) => {
        if (!alvo) return;
        navButtons.forEach((btn) => {
            const ativo = btn.dataset.target === alvo;
            btn.classList.toggle('active', ativo);
            btn.setAttribute('aria-pressed', ativo ? 'true' : 'false');
        });
        sections.forEach((section) => {
            section.hidden = section.dataset.section !== alvo;
        });
    };

    navButtons.forEach((btn) => {
        btn.addEventListener('click', () => mostrarSecao(btn.dataset.target));
    });

    // === FUNCIONALIDADE DE ALARMES ===
    const alarmeModal = document.getElementById('alarmeModal');
    const alarmeForm = document.getElementById('alarmeForm');
    const criarAlarmeBtn = document.getElementById('criarAlarmeBtn');
    const cancelarAlarmeBtn = document.getElementById('cancelarAlarme');
    const alarmesLista = document.getElementById('alarmesLista');
    const alarmesVazio = document.getElementById('alarmesVazio');
    const alarmeModalClose = alarmeModal?.querySelector('.close-btn');
    const alarmesKey = `alarmes-${userId}`;
    
    let alarmes = JSON.parse(localStorage.getItem(alarmesKey) || '[]');
    let editandoAlarmeId = null;

    const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

    const formatarDias = (diasArray) => {
        if (diasArray.length === 7) return 'Todos os dias';
        if (diasArray.length === 5 && !diasArray.includes('0') && !diasArray.includes('6')) return 'Dias úteis';
        if (diasArray.length === 2 && diasArray.includes('0') && diasArray.includes('6')) return 'Fins de semana';
        return diasArray.map(d => diasSemana[parseInt(d)]).join(', ');
    };

    const salvarAlarmes = () => {
        localStorage.setItem(alarmesKey, JSON.stringify(alarmes));
        renderizarAlarmes();
    };

    const abrirModalAlarme = (alarmeId = null) => {
        editandoAlarmeId = alarmeId;
        alarmeModal.setAttribute('aria-hidden', 'false');
        alarmeModal.classList.add('open');
        
        if (alarmeId) {
            const alarme = alarmes.find(a => a.id === alarmeId);
            document.getElementById('tituloAlarme').textContent = 'Editar Alarme';
            document.getElementById('alarmeId').value = alarmeId;
            document.getElementById('alarmeNome').value = alarme.nome;
            document.getElementById('alarmeHorario').value = alarme.horario;
            document.getElementById('alarmeObs').value = alarme.observacoes || '';
            
            // Marcar dias da semana
            const checkboxes = alarmeForm.querySelectorAll('input[name="dias"]');
            checkboxes.forEach(cb => {
                cb.checked = alarme.dias.includes(cb.value);
            });
        } else {
            document.getElementById('tituloAlarme').textContent = 'Novo Alarme';
            alarmeForm.reset();
        }
    };

    const fecharModalAlarme = () => {
        alarmeModal.setAttribute('aria-hidden', 'true');
        alarmeModal.classList.remove('open');
        alarmeForm.reset();
        editandoAlarmeId = null;
    };

    const toggleAlarme = (alarmeId) => {
        const alarme = alarmes.find(a => a.id === alarmeId);
        if (alarme) {
            alarme.ativo = !alarme.ativo;
            salvarAlarmes();
        }
    };

    const excluirAlarme = (alarmeId) => {
        if (confirm('Tem certeza que deseja excluir este alarme?')) {
            alarmes = alarmes.filter(a => a.id !== alarmeId);
            salvarAlarmes();
        }
    };

    const renderizarAlarmes = () => {
        if (!alarmesLista) return;
        
        alarmesLista.innerHTML = '';
        
        if (alarmes.length === 0) {
            if (alarmesVazio) {
                alarmesVazio.hidden = false;
                alarmesLista.appendChild(alarmesVazio);
            }
            return;
        }

        if (alarmesVazio) {
            alarmesVazio.hidden = true;
        }

        const fragment = document.createDocumentFragment();
        
        alarmes.forEach(alarme => {
            const item = document.createElement('div');
            item.className = 'alarme-item';
            
            const info = document.createElement('div');
            info.className = 'alarme-info';
            
            const titulo = document.createElement('h3');
            titulo.className = 'alarme-titulo';
            titulo.textContent = alarme.nome;
            
            const horario = document.createElement('p');
            horario.className = 'alarme-horario';
            horario.textContent = alarme.horario;
            
            const dias = document.createElement('p');
            dias.className = 'alarme-dias';
            dias.textContent = formatarDias(alarme.dias);
            
            info.append(titulo, horario, dias);
            
            if (alarme.observacoes) {
                const obs = document.createElement('p');
                obs.className = 'alarme-obs';
                obs.textContent = alarme.observacoes;
                info.appendChild(obs);
            }
            
            const toggle = document.createElement('button');
            toggle.className = `alarme-toggle ${alarme.ativo ? 'ativo' : ''}`;
            toggle.innerHTML = alarme.ativo ? '🔔' : '🔕';
            toggle.title = alarme.ativo ? 'Desativar alarme' : 'Ativar alarme';
            toggle.addEventListener('click', () => toggleAlarme(alarme.id));
            
            const actions = document.createElement('div');
            actions.className = 'alarme-actions';
            
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Editar';
            editBtn.addEventListener('click', () => abrirModalAlarme(alarme.id));
            
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Excluir';
            deleteBtn.addEventListener('click', () => excluirAlarme(alarme.id));
            
            actions.append(editBtn, deleteBtn);
            item.append(info, toggle, actions);
            fragment.appendChild(item);
        });
        
        alarmesLista.appendChild(fragment);
    };

    // Event listeners para alarmes
    if (criarAlarmeBtn) {
        criarAlarmeBtn.addEventListener('click', () => abrirModalAlarme());
    }

    if (cancelarAlarmeBtn) {
        cancelarAlarmeBtn.addEventListener('click', fecharModalAlarme);
    }

    if (alarmeModalClose) {
        alarmeModalClose.addEventListener('click', fecharModalAlarme);
    }

    if (alarmeModal) {
        alarmeModal.addEventListener('click', (e) => {
            if (e.target === alarmeModal) fecharModalAlarme();
        });
    }

    if (alarmeForm) {
        alarmeForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(alarmeForm);
            const diasSelecionados = formData.getAll('dias');
            
            if (diasSelecionados.length === 0) {
                alert('Selecione pelo menos um dia da semana.');
                return;
            }
            
            const dadosAlarme = {
                nome: formData.get('alarmeNome'),
                horario: formData.get('alarmeHorario'),
                dias: diasSelecionados,
                observacoes: formData.get('alarmeObs')
            };
            
            const novoAlarme = {
                id: editandoAlarmeId || Date.now().toString(),
                ...dadosAlarme,
                ativo: true,
                criado: editandoAlarmeId ? null : new Date().toISOString()
            };
            
            // Atualizar lista local
            if (editandoAlarmeId) {
                const index = alarmes.findIndex(a => a.id === editandoAlarmeId);
                if (index !== -1) {
                    alarmes[index] = { ...alarmes[index], ...novoAlarme };
                    
                    // Atualizar no Firebase
                    if (window.AlarmesFirebase) {
                        await window.AlarmesFirebase.atualizar(editandoAlarmeId, dadosAlarme);
                        console.log('✅ Alarme atualizado no Firebase!');
                    }
                }
            } else {
                alarmes.push(novoAlarme);
                
                // Salvar no Firebase
                if (window.AlarmesFirebase) {
                    const resultado = await window.AlarmesFirebase.criar(dadosAlarme);
                    if (resultado.success) {
                        // Atualizar ID local com o ID do Firebase
                        novoAlarme.id = resultado.alarmeId;
                        alarmes[alarmes.length - 1].id = resultado.alarmeId;
                        console.log('✅ Alarme salvo no Firebase!');
                    }
                }
            }
            
            salvarAlarmes();
            fecharModalAlarme();
        });
    }

    // Funcionalidade dos botões de seleção rápida de dias
    if (alarmeModal) {
        const quickButtons = alarmeModal.querySelectorAll('.quick-btn');
        quickButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const diasSelecionados = btn.dataset.days.split(',');
                const checkboxes = alarmeForm.querySelectorAll('input[name="dias"]');
                
                // Desmarcar todos primeiro
                checkboxes.forEach(cb => cb.checked = false);
                
                // Marcar os dias selecionados
                diasSelecionados.forEach(dia => {
                    const checkbox = alarmeForm.querySelector(`input[name="dias"][value="${dia}"]`);
                    if (checkbox) checkbox.checked = true;
                });

                // Adicionar feedback visual
                btn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    btn.style.transform = '';
                }, 150);
            });
        });
    }

    // === FUNCIONALIDADE DE ANOTAÇÕES MÉDICAS ===
    const anotacoesList = document.getElementById('anotacoesList');
    const anotacoesKey = `anotacoes-medicas-${userId}`;
    
    let anotacoesMedicas = JSON.parse(localStorage.getItem(anotacoesKey) || '[]');

    const formatarDataAnotacao = (timestamp) => {
        const data = new Date(timestamp);
        const hoje = new Date();
        const ontem = new Date(hoje);
        ontem.setDate(hoje.getDate() - 1);

        if (data.toDateString() === hoje.toDateString()) {
            return `Hoje, ${data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
        } else if (data.toDateString() === ontem.toDateString()) {
            return `Ontem, ${data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
        } else {
            return data.toLocaleDateString('pt-BR', { 
                day: '2-digit', 
                month: 'short', 
                year: data.getFullYear() !== hoje.getFullYear() ? 'numeric' : undefined,
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    };

    // Função helper para receber dados do Firebase e renderizar
    const renderizarAnotacoes = (anotacoes) => {
        if (anotacoes && Array.isArray(anotacoes)) {
            anotacoesMedicas = anotacoes;
            localStorage.setItem(anotacoesKey, JSON.stringify(anotacoesMedicas));
            renderizarAnotacoesMedicas();
        }
    };

    const renderizarAnotacoesMedicas = () => {
        if (!anotacoesList) return;

        if (anotacoesMedicas.length === 0) {
            anotacoesList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">📋</div>
                    <h3>Nenhuma anotação médica ainda</h3>
                    <p class="muted-text">Quando seu médico enviar orientações ou observações importantes, elas aparecerão aqui.</p>
                </div>
            `;
            return;
        }

        const fragment = document.createDocumentFragment();
        const ordenadas = anotacoesMedicas
            .slice()
            .sort((a, b) => b.timestamp - a.timestamp);

        ordenadas.forEach(anotacao => {
            const item = document.createElement('div');
            item.className = 'anotacao-medica';

            item.innerHTML = `
                <div class="anotacao-header">
                    <div class="medico-info">
                        <div class="medico-avatar">${anotacao.medico.iniciais}</div>
                        <div class="medico-details">
                            <h4>${anotacao.medico.nome}</h4>
                            <span>${anotacao.medico.especialidade}</span>
                        </div>
                    </div>
                    <div class="anotacao-data">${formatarDataAnotacao(anotacao.timestamp)}</div>
                </div>
                
                ${anotacao.tipo ? `<div class="anotacao-tipo">${anotacao.tipo}</div>` : ''}
                
                <div class="anotacao-conteudo">
                    ${anotacao.conteudo.split('\n').map(linha => `<p>${linha}</p>`).join('')}
                </div>
            `;
            
            fragment.appendChild(item);
        });

        anotacoesList.innerHTML = '';
        anotacoesList.appendChild(fragment);
    };

    // Função para adicionar anotação médica (simulação - futuramente será via API)
    const adicionarAnotacaoMedica = (anotacao) => {
        const novaAnotacao = {
            id: Date.now().toString(),
            timestamp: Date.now(),
            ...anotacao
        };
        
        anotacoesMedicas.unshift(novaAnotacao);
        localStorage.setItem(anotacoesKey, JSON.stringify(anotacoesMedicas));
        renderizarAnotacoesMedicas();
    };

    // Exemplo de anotação para demonstração (remover em produção)
    if (anotacoesMedicas.length === 0) {
        // Adicionar anotação de exemplo apenas uma vez
        setTimeout(() => {
            adicionarAnotacaoMedica({
                medico: {
                    nome: "Dr. Carlos Silva",
                    especialidade: "Psiquiatra",
                    iniciais: "CS"
                },
                tipo: "Orientação",
                prioridade: "media",
                conteudo: "Paciente demonstra boa evolução no controle emocional.\n\nContinuar com o registro diário no afetivograma e manter a rotina de medicação conforme prescrito.\n\nPróxima consulta agendada para revisão do tratamento."
            });
        }, 2000);
    }

    // Inicializar anotações médicas
    renderizarAnotacoesMedicas();

    // Inicializar alarmes
    renderizarAlarmes();

    // Modal de Perfil
    const userChip = document.getElementById('userChip');
    const perfilModal = document.getElementById('perfilModal');
    const perfilCloseBtn = perfilModal?.querySelector('.close-btn');
    const perfilView = document.getElementById('perfilView');
    const perfilEdit = document.getElementById('perfilEdit');
    const editarPerfilBtn = document.getElementById('editarPerfilBtn');
    const cancelarEdicaoBtn = document.getElementById('cancelarEdicaoBtn');
    const salvarPerfilBtn = document.getElementById('salvarPerfilBtn');
    const editActions = document.getElementById('editActions');
    const uploadAvatarBtn = document.getElementById('uploadAvatarBtn');
    const avatarInput = document.getElementById('avatarInput');
    
    // Dados do perfil do usuário
    const perfilKey = `perfil-${userId}`;
    
    // Função para obter dados do usuário atual
    const obterDadosUsuario = () => {
        const sessao = Auth?.getSession();
        const perfilSalvo = JSON.parse(localStorage.getItem(perfilKey) || 'null');
        
        return {
            nome: sessao?.nome || '',
            email: sessao?.email || '',
            nascimento: perfilSalvo?.nascimento || '',
            telefone: perfilSalvo?.telefone || '',
            foto: perfilSalvo?.foto || '',
            id: sessao?.userId || 'USR-' + Date.now(),
            cadastro: perfilSalvo?.cadastro || new Date().toISOString().split('T')[0]
        };
    };
    
    let dadosPerfil = obterDadosUsuario();

    // Função para formatar telefone
    const formatarTelefone = (valor) => {
        if (!valor) return '';
        const numeros = valor.replace(/\D/g, '');
        if (numeros.length === 11) {
            return numeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (numeros.length === 10) {
            return numeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        }
        return valor;
    };

    // Função para formatar data para exibição
    const formatarDataExibicao = (dataISO) => {
        if (!dataISO) return 'Não informado';
        const [ano, mes, dia] = dataISO.split('-');
        return `${dia}/${mes}/${ano}`;
    };

    // Função para atualizar avatar
    const atualizarAvatar = (fotoUrl) => {
        // Avatar no modal
        const avatarLarge = document.getElementById('avatarLarge');
        const avatarPhoto = document.getElementById('avatarPhoto');
        const avatarInitials = avatarLarge?.querySelector('.avatar-initials');
        
        if (fotoUrl && avatarPhoto) {
            avatarPhoto.src = fotoUrl;
            avatarPhoto.style.display = 'block';
            if (avatarInitials) avatarInitials.style.display = 'none';
        } else if (avatarInitials) {
            if (avatarPhoto) avatarPhoto.style.display = 'none';
            avatarInitials.style.display = 'block';
            if (dadosPerfil.nome) {
                const iniciais = dadosPerfil.nome.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
                avatarInitials.textContent = iniciais;
            }
        }
        
        // Avatar no header
        const userAvatar = userChip?.querySelector('.avatar');
        if (userAvatar) {
            // Limpar avatar
            userAvatar.innerHTML = '';
            
            if (fotoUrl) {
                const img = document.createElement('img');
                img.src = fotoUrl;
                img.alt = 'Avatar';
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
                userAvatar.appendChild(img);
            } else if (dadosPerfil.nome) {
                const iniciais = dadosPerfil.nome.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
                userAvatar.textContent = iniciais;
            }
        }
    };

    // Função para atualizar visualização do perfil
    const atualizarVisualizacaoPerfil = () => {
        document.getElementById('perfilNome').textContent = dadosPerfil.nome || 'Não informado';
        document.getElementById('perfilEmail').textContent = dadosPerfil.email || 'Não informado';
        document.getElementById('perfilNascimento').textContent = formatarDataExibicao(dadosPerfil.nascimento);
        document.getElementById('perfilTelefone').textContent = dadosPerfil.telefone || 'Não informado';
        document.getElementById('perfilId').textContent = dadosPerfil.id;
        
        // Atualizar avatar
        atualizarAvatar(dadosPerfil.foto);
        
        // Atualizar nome no header
        const userName = userChip?.querySelector('strong');
        if (userName && dadosPerfil.nome) userName.textContent = dadosPerfil.nome;
    };

    // Função para upload de foto
    const handleUploadFoto = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        
        // Verificar tipo de arquivo
        if (!file.type.startsWith('image/')) {
            alert('Por favor, selecione uma imagem válida.');
            return;
        }
        
        // Verificar tamanho (máximo 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('A imagem deve ter no máximo 5MB.');
            return;
        }
        
        // Ler arquivo como base64
        const reader = new FileReader();
        reader.onload = async (e) => {
            const fotoBase64 = e.target.result;
            dadosPerfil.foto = fotoBase64;
            
            // Salvar no localStorage
            localStorage.setItem(perfilKey, JSON.stringify(dadosPerfil));
            
            // Salvar no Firebase imediatamente
            if (window.Database && window.Database.Usuarios) {
                try {
                    const resultado = await window.Database.Usuarios.atualizar(userId, {
                        foto: fotoBase64
                    });
                    if (resultado.success) {
                        console.log('✅ Foto salva no Firebase!');
                    } else {
                        console.error('❌ Erro ao salvar foto:', resultado.error);
                    }
                } catch (error) {
                    console.error('❌ Erro ao salvar foto no Firebase:', error);
                }
            }
            
            // Atualizar visualização
            atualizarAvatar(fotoBase64);
            
            // Mostrar mensagem de sucesso
            mostrarNotificacao('Foto de perfil atualizada!');
        };
        reader.readAsDataURL(file);
    };

    // Event listener para upload de foto
    if (uploadAvatarBtn && avatarInput) {
        uploadAvatarBtn.addEventListener('click', () => {
            avatarInput.click();
        });
        
        avatarInput.addEventListener('change', handleUploadFoto);
    }

    // Função para abrir modo de edição
    const abrirEdicaoPerfil = () => {
        // Preencher formulário com dados atuais
        document.getElementById('editNome').value = dadosPerfil.nome || '';
        document.getElementById('editEmail').value = dadosPerfil.email || '';
        document.getElementById('editNascimento').value = dadosPerfil.nascimento || '';
        document.getElementById('editTelefone').value = dadosPerfil.telefone || '';
        
        // Alternar visualizações
        perfilView.style.display = 'none';
        perfilEdit.style.display = 'block';
        editarPerfilBtn.style.display = 'none';
        editActions.style.display = 'flex';
    };

    // Função para cancelar edição
    const cancelarEdicaoPerfil = () => {
        perfilView.style.display = 'block';
        perfilEdit.style.display = 'none';
        editarPerfilBtn.style.display = 'block';
        editActions.style.display = 'none';
        
        // Resetar formulário
        perfilEdit.reset();
    };

    // Função para salvar alterações do perfil
    const salvarPerfil = async () => {
        const novoNome = document.getElementById('editNome').value.trim();
        const novoEmail = document.getElementById('editEmail').value.trim();
        const novoNascimento = document.getElementById('editNascimento').value;
        const novoTelefone = document.getElementById('editTelefone').value.trim();
        
        // Validações
        if (!novoNome || !novoEmail) {
            alert('Por favor, preencha o nome e email.');
            return;
        }
        
        // Atualizar dados
        dadosPerfil = {
            ...dadosPerfil,
            nome: novoNome,
            email: novoEmail,
            nascimento: novoNascimento,
            telefone: formatarTelefone(novoTelefone)
        };
        
        // Salvar no localStorage
        localStorage.setItem(perfilKey, JSON.stringify(dadosPerfil));
        
        // Atualizar sessão com novos dados
        const sessao = Auth?.getSession();
        if (sessao) {
            sessao.nome = novoNome;
            sessao.email = novoEmail;
            localStorage.setItem(Auth.SESSION_KEY, JSON.stringify(sessao));
        }
        
        // Salvar no Firebase (se disponível)
        if (window.Database && window.Database.Usuarios) {
            try {
                await window.Database.Usuarios.atualizar(userId, {
                    nome: dadosPerfil.nome,
                    email: dadosPerfil.email,
                    nascimento: dadosPerfil.nascimento || null,
                    telefone: dadosPerfil.telefone || null,
                    foto: dadosPerfil.foto || null
                });
                console.log('✅ Perfil atualizado no Firebase!');
            } catch (error) {
                console.error('Erro ao atualizar perfil no Firebase:', error);
            }
        }
        
        // Atualizar visualização
        atualizarVisualizacaoPerfil();
        
        // Voltar para visualização
        cancelarEdicaoPerfil();
        
        // Mostrar mensagem de sucesso
        mostrarNotificacao('Perfil atualizado com sucesso!');
    };

    // Aplicar máscara de telefone em tempo real
    const inputTelefone = document.getElementById('editTelefone');
    if (inputTelefone) {
        inputTelefone.addEventListener('input', (e) => {
            let valor = e.target.value.replace(/\D/g, '');
            if (valor.length > 11) valor = valor.substring(0, 11);
            
            if (valor.length >= 11) {
                e.target.value = valor.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            } else if (valor.length >= 10) {
                e.target.value = valor.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
            } else if (valor.length >= 6) {
                e.target.value = valor.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
            } else if (valor.length >= 2) {
                e.target.value = valor.replace(/(\d{2})(\d{0,5})/, '($1) $2');
            } else {
                e.target.value = valor;
            }
        });
    }

    // Inicializar perfil
    atualizarVisualizacaoPerfil();

    // Abrir modal de perfil
    if (userChip && perfilModal) {
        userChip.addEventListener('click', () => {
            perfilModal.setAttribute('aria-hidden', 'false');
            perfilModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });

        // Fechar modal de perfil
        perfilCloseBtn?.addEventListener('click', () => {
            perfilModal.setAttribute('aria-hidden', 'true');
            perfilModal.style.display = 'none';
            document.body.style.overflow = '';
            cancelarEdicaoPerfil(); // Voltar para visualização ao fechar
        });

        // Fechar modal com clique fora
        perfilModal.addEventListener('click', (e) => {
            if (e.target === perfilModal) {
                perfilModal.setAttribute('aria-hidden', 'true');
                perfilModal.style.display = 'none';
                document.body.style.overflow = '';
                cancelarEdicaoPerfil();
            }
        });

        // Fechar modal com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && perfilModal.style.display === 'flex') {
                perfilModal.setAttribute('aria-hidden', 'true');
                perfilModal.style.display = 'none';
                document.body.style.overflow = '';
                cancelarEdicaoPerfil();
            }
        });
    }
    
    // Event listeners para edição de perfil
    if (editarPerfilBtn) {
        editarPerfilBtn.addEventListener('click', abrirEdicaoPerfil);
    }
    
    if (cancelarEdicaoBtn) {
        cancelarEdicaoBtn.addEventListener('click', cancelarEdicaoPerfil);
    }
    
    if (salvarPerfilBtn) {
        salvarPerfilBtn.addEventListener('click', salvarPerfil);
    }

    const alvoInicial = navButtons.find((btn) => btn.classList.contains('active'))?.dataset.target
        || sections[0]?.dataset.section;
    mostrarSecao(alvoInicial);
});

// Função para copiar ID da conta
function copiarId() {
    const idElement = document.getElementById('perfilId');
    const id = idElement.textContent;
    
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(id).then(() => {
            mostrarNotificacao('ID copiado para a área de transferência!');
        }).catch(() => {
            fallbackCopyTextToClipboard(id);
        });
    } else {
        fallbackCopyTextToClipboard(id);
    }
}

// Fallback para copiar texto em contextos não seguros
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        mostrarNotificacao('ID copiado para a área de transferência!');
    } catch (err) {
        mostrarNotificacao('Erro ao copiar ID. Tente novamente.');
    }
    
    document.body.removeChild(textArea);
}

// Função para mostrar notificações temporárias
function mostrarNotificacao(mensagem, tipo = 'success') {
    const notificacao = document.createElement('div');
    notificacao.className = `notificacao ${tipo}`;
    notificacao.textContent = mensagem;
    
    notificacao.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${tipo === 'success' ? 'var(--success)' : 'var(--error)'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notificacao);
    
    // Animação de entrada
    setTimeout(() => {
        notificacao.style.transform = 'translateX(0)';
    }, 10);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notificacao.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notificacao.parentNode) {
                document.body.removeChild(notificacao);
            }
        }, 300);
    }, 3000);
}
