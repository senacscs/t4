/* =========================================================
   MoodAlert · Modal de perfil (paciente e médico)
   Ver dados, editar, trocar foto, tema e senha.
   O modal é montado aqui para não repetir HTML nas páginas.
   ========================================================= */
(function () {
    'use strict';

    const { el, icone, limpar, datas, toast, Modal, ocupado } = UI;

    function campo(rotulo, input, dica) {
        return el('label', { class: 'field' }, el('span', { text: rotulo }), input, dica ? el('small', { text: dica }) : null);
    }

    function info(rotulo, valor) {
        return el('div', { class: 'info-item' }, el('span', { text: rotulo }), el('strong', { text: valor || 'Não informado' }));
    }

    /**
     * @param {object} opcoes
     * @param {object} opcoes.usuario  dados atuais (com id)
     * @param {function} opcoes.aoAtualizar  recebe o usuário atualizado
     * @param {function} [opcoes.extra]  devolve um elemento extra (ex.: médico responsável)
     */
    function iniciar({ usuario, aoAtualizar, extra }) {
        let dados = { ...usuario };
        const ehMedico = dados.tipo === 'medico';

        const modal = el('div', { class: 'modal', id: 'modalPerfil', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'perfilNome', 'aria-hidden': 'true' });
        const conteudo = el('div', { class: 'modal-content wide' });
        modal.append(conteudo);
        document.body.append(modal);

        const entradaFoto = el('input', { type: 'file', accept: 'image/*', hidden: true });
        entradaFoto.addEventListener('change', trocarFoto);

        // ---------- Visualização ----------
        function desenharVisao() {
            const caixaAvatar = UI.avatar(dados, 'xl');
            const secoes = [
                el('button', { type: 'button', class: 'icon-btn modal-close', 'data-fechar': true, 'aria-label': 'Fechar' }, icone('close')),
                el('div', { class: 'perfil-head' },
                    el('div', { class: 'avatar-edit' },
                        caixaAvatar,
                        el('button', { type: 'button', class: 'icon-btn', title: 'Trocar foto', 'aria-label': 'Trocar foto', on: { click: () => entradaFoto.click() } }, icone('camera'))
                    ),
                    el('div', {},
                        el('h3', { id: 'perfilNome', text: ehMedico ? UI.tituloMedico(dados) : dados.nome }),
                        el('p', { class: 'muted', text: ehMedico ? (dados.especialidade || 'Médico') : 'Paciente' }),
                        dados.foto ? el('button', { type: 'button', class: 'link-btn', style: 'border:none;background:none;color:var(--muted);cursor:pointer;padding:4px 0;font-size:.8rem', text: 'Remover foto', on: { click: removerFoto } }) : null
                    ),
                    entradaFoto
                )
            ];

            if (!ehMedico && dados.codigo) {
                secoes.push(el('section', { class: 'perfil-section' },
                    el('h4', { text: 'Seu código de paciente' }),
                    el('div', { class: 'form-row' },
                        el('span', { class: 'code-pill', style: 'font-size:1.05rem;padding:6px 6px 6px 14px' },
                            dados.codigo,
                            el('button', { type: 'button', title: 'Copiar código', 'aria-label': 'Copiar código', on: { click: () => UI.copiar(dados.codigo, 'Código copiado!') } }, icone('copy-outline'))
                        ),
                        el('small', { class: 'muted', style: 'flex:1;min-width:200px', text: 'Passe este código ao seu médico para ele acompanhar seus registros.' })
                    )
                ));
            }

            const itens = [
                info('E-mail', dados.email),
                info('Telefone', dados.telefone),
                info('Data de nascimento', dados.nascimento ? datas.isoParaBr(dados.nascimento) : ''),
                info('Na plataforma desde', datas.desde(dados.criadoEm))
            ];
            if (ehMedico) itens.splice(1, 0, info('CRM', dados.crm));

            secoes.push(el('section', { class: 'perfil-section' }, el('h4', { text: 'Informações pessoais' }), el('div', { class: 'info-grid' }, itens)));

            if (extra) {
                const bloco = extra();
                if (bloco) secoes.push(bloco);
            }

            secoes.push(el('section', { class: 'perfil-section' },
                el('h4', { text: 'Aparência' }),
                el('div', { class: 'tema-escolha', role: 'group', 'aria-label': 'Tema' },
                    el('button', { type: 'button', 'data-tema-opcao': 'light' }, icone('sunny-outline'), 'Claro'),
                    el('button', { type: 'button', 'data-tema-opcao': 'dark' }, icone('moon-outline'), 'Escuro')
                )
            ));

            secoes.push(el('div', { class: 'modal-actions' },
                el('button', { type: 'button', class: 'btn btn-ghost', on: { click: desenharSenha } }, icone('key-outline'), 'Trocar senha'),
                el('button', { type: 'button', class: 'btn btn-primary', on: { click: desenharEdicao } }, icone('create-outline'), 'Editar perfil')
            ));

            limpar(conteudo, secoes);
            UI.definirTema(document.documentElement.dataset.theme || 'light');
        }

        // ---------- Edição ----------
        function desenharEdicao() {
            const nome = el('input', { type: 'text', name: 'nome', required: true, minlength: '3', maxlength: '80', autocomplete: 'name' });
            const email = el('input', { type: 'email', name: 'email', required: true, autocomplete: 'email' });
            const telefone = el('input', { type: 'tel', name: 'telefone', placeholder: '(00) 00000-0000', autocomplete: 'tel' });
            const nascimento = el('input', { type: 'date', name: 'nascimento', max: DB.chaveData(new Date()) });
            nome.value = dados.nome || '';
            email.value = dados.email || '';
            telefone.value = dados.telefone || '';
            nascimento.value = dados.nascimento || '';
            UI.mascaraTelefone(telefone);

            const campos = [
                campo('Nome completo', nome),
                el('div', { class: 'form-grid' }, campo('E-mail', email), campo('Telefone', telefone)),
                campo('Data de nascimento', nascimento)
            ];

            let crm;
            let especialidade;
            if (ehMedico) {
                crm = el('input', { type: 'text', name: 'crm', maxlength: '20', placeholder: 'Ex.: 123456/SC' });
                especialidade = el('input', { type: 'text', name: 'especialidade', maxlength: '40', placeholder: 'Ex.: Psiquiatria' });
                crm.value = dados.crm || '';
                especialidade.value = dados.especialidade || '';
                campos.push(el('div', { class: 'form-grid' }, campo('CRM', crm), campo('Especialidade', especialidade)));
            }

            const alerta = el('div', { class: 'form-alert', hidden: true }, icone('alert-circle'), el('span'));
            const salvar = el('button', { type: 'submit', class: 'btn btn-primary' }, icone('save-outline'), 'Salvar alterações');
            const form = el('form', { class: 'form-stack', novalidate: true }, alerta, campos,
                el('div', { class: 'modal-actions' },
                    el('button', { type: 'button', class: 'btn btn-ghost', text: 'Cancelar', on: { click: desenharVisao } }),
                    salvar
                )
            );

            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                alerta.hidden = true;
                if (nome.value.trim().length < 3) return erro(alerta, 'Informe o nome completo.', nome);
                if (!Auth.emailValido(email.value.trim().toLowerCase())) return erro(alerta, 'Informe um e-mail válido.', email);

                ocupado(salvar, true);
                try {
                    const mudancas = {
                        nome: nome.value.trim().replace(/\s+/g, ' '),
                        telefone: telefone.value.trim(),
                        nascimento: nascimento.value
                    };
                    if (ehMedico) {
                        mudancas.crm = crm.value.trim();
                        mudancas.especialidade = especialidade.value.trim();
                    }
                    await Auth.trocarEmail(dados.id, dados.email, email.value);
                    await DB.Usuarios.atualizar(dados.id, mudancas);
                    dados = { ...dados, ...mudancas, email: email.value.trim().toLowerCase() };
                    Object.keys(mudancas).forEach((k) => { if (mudancas[k] === '') delete dados[k]; });
                    Auth.atualizarSessao({ nome: dados.nome });
                    aoAtualizar({ ...dados });
                    toast('Perfil atualizado!');
                    desenharVisao();
                } catch (falha) {
                    console.error(falha);
                    erro(alerta, falha.message || 'Não foi possível salvar.');
                    ocupado(salvar, false);
                }
            });

            limpar(conteudo,
                el('button', { type: 'button', class: 'icon-btn modal-close', 'data-fechar': true, 'aria-label': 'Fechar' }, icone('close')),
                el('div', { class: 'modal-head' },
                    el('div', { class: 'modal-icon' }, icone('create-outline')),
                    el('div', {}, el('h3', { id: 'perfilNome', text: 'Editar perfil' }), el('p', { text: 'Atualize seus dados de contato.' }))
                ),
                form
            );
            nome.focus();
        }

        // ---------- Senha ----------
        function desenharSenha() {
            const atual = el('input', { type: 'password', autocomplete: 'current-password', required: true });
            const nova = el('input', { type: 'password', autocomplete: 'new-password', required: true, minlength: '8' });
            const confirma = el('input', { type: 'password', autocomplete: 'new-password', required: true });
            const alerta = el('div', { class: 'form-alert', hidden: true }, icone('alert-circle'), el('span'));
            const salvar = el('button', { type: 'submit', class: 'btn btn-primary' }, icone('shield-checkmark-outline'), 'Trocar senha');

            const form = el('form', { class: 'form-stack', novalidate: true }, alerta,
                campo('Senha atual', atual),
                el('div', { class: 'form-grid' }, campo('Nova senha', nova, 'Mínimo de 8 caracteres.'), campo('Confirmar nova senha', confirma)),
                el('div', { class: 'modal-actions' },
                    el('button', { type: 'button', class: 'btn btn-ghost', text: 'Cancelar', on: { click: desenharVisao } }),
                    salvar
                )
            );

            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                alerta.hidden = true;
                if (!atual.value) return erro(alerta, 'Digite sua senha atual.', atual);
                if (nova.value.length < 8) return erro(alerta, 'A nova senha precisa ter pelo menos 8 caracteres.', nova);
                if (nova.value !== confirma.value) return erro(alerta, 'As senhas não coincidem.', confirma);
                ocupado(salvar, true);
                try {
                    await Auth.trocarSenha(dados.id, atual.value, nova.value);
                    toast('Senha alterada com sucesso!');
                    desenharVisao();
                } catch (falha) {
                    erro(alerta, falha.message, atual);
                    ocupado(salvar, false);
                }
            });

            limpar(conteudo,
                el('button', { type: 'button', class: 'icon-btn modal-close', 'data-fechar': true, 'aria-label': 'Fechar' }, icone('close')),
                el('div', { class: 'modal-head' },
                    el('div', { class: 'modal-icon' }, icone('key-outline')),
                    el('div', {}, el('h3', { id: 'perfilNome', text: 'Segurança' }), el('p', { text: 'Sua senha é guardada só como código criptografado.' }))
                ),
                form
            );
            atual.focus();
        }

        // ---------- Foto ----------
        async function trocarFoto() {
            const arquivo = entradaFoto.files[0];
            entradaFoto.value = '';
            if (!arquivo) return;
            try {
                const foto = await UI.reduzirImagem(arquivo);
                await DB.Usuarios.atualizar(dados.id, { foto });
                dados.foto = foto;
                aoAtualizar({ ...dados });
                desenharVisao();
                toast('Foto atualizada!');
            } catch (falha) {
                toast(falha.message || 'Não foi possível trocar a foto.', 'erro');
            }
        }

        async function removerFoto() {
            await DB.Usuarios.atualizar(dados.id, { foto: '' });
            delete dados.foto;
            aoAtualizar({ ...dados });
            desenharVisao();
            toast('Foto removida.');
        }

        function erro(alerta, mensagem, input) {
            alerta.querySelector('span').textContent = mensagem;
            alerta.hidden = false;
            if (input) input.focus();
        }

        modal.addEventListener('fechou', desenharVisao);

        return {
            abrir() {
                desenharVisao();
                Modal.abrir(modal);
            },
            redesenhar: desenharVisao
        };
    }

    window.Perfil = { iniciar };
})();
