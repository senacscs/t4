import { dbRealtime, ref, set, get, child } from './link.js';
import { lista } from './lista.js';

let cpfSeguidor = null;
let curtidaAtual = null; // índice da imagem curtida pelo CPF

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    return true;
}

function showNotification(msg, duration = 3000) {
    const list = document.getElementById('notification-toast-list');
    if (!list) return;

    // Limite de 4 notificações
    while (list.children.length >= 4) {
        list.removeChild(list.firstChild);
    }

    const toast = document.createElement('div');
    toast.className = 'notification-toast show';
    toast.textContent = msg;

    // Barrinha de tempo
    const bar = document.createElement('div');
    bar.className = 'toast-bar';
    bar.style.animationDuration = duration + 'ms';
    toast.appendChild(bar);

    list.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('show');
        toast.classList.add('hide');
        setTimeout(() => {
            if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 350); // Espera a animação de saída
    }, duration);
}

async function atualizarCurtidaAtual() {
    if (!cpfSeguidor) {
        curtidaAtual = null;
        return;
    }
    try {
        const dbRef = ref(dbRealtime);
        const snap = await get(child(dbRef, 'curtidas/' + cpfSeguidor));
        if (snap.exists() && typeof snap.val().imagem !== "undefined") {
            curtidaAtual = snap.val().imagem;
        } else {
            curtidaAtual = null;
        }
    } catch (e) {
        curtidaAtual = null;
    }
}

async function curtirImagem(index) {
    if (!cpfSeguidor) {
        showNotification("Siga a pagina antes para validar seu CPF e poder votar!");
        return;
    }
    try {
        await set(ref(dbRealtime, 'curtidas/' + cpfSeguidor), { cpf: cpfSeguidor, imagem: index });
        curtidaAtual = index;
        showNotification("Você curtiu a foto de Número " + (parseInt(index) + 1) + "!");

        // Atualiza botão de curtida na .foco se estiver aberto
        atualizarBotaoCurtirFoco(index);
    } catch (e) {
        showNotification("Algo de errado não está certo: " + (e?.message || e));
        console.error("Algo de errado não está certo:", e);
    }
}

function atualizarBotaoCurtirFoco(index) {
    const focus = document.getElementById("focus");
    const btnCurtir = focus.querySelector('.fun-icons button');
    const heartIcon = btnCurtir?.querySelector('ion-icon');
    if (btnCurtir && heartIcon) {
        if (curtidaAtual == index) {
            btnCurtir.classList.add('curtido');
            heartIcon.name = "heart";
        } else {
            btnCurtir.classList.remove('curtido');
            heartIcon.name = "heart-outline";
        }
    }
}

async function openCard(card) {
    const focus = document.getElementById("focus");
    focus.classList.remove("fechado");
    focus.classList.add("aberto");

    const imgs = document.querySelectorAll(".igm");
    const imgContainer = focus.querySelector(".img");
    const lateralTitle = focus.querySelector(".linha1 h3");
    const lateralDescription = focus.querySelector(".linha2-text p");

    const index = card.getAttribute('data-base');
    const item = lista[index];

    imgs.forEach(img => {
        img.src = item.link;
        img.alt = item.name;
    });

    imgContainer.style.backgroundImage = `url(${item.link})`;

    lateralTitle.textContent = item.name;
    lateralDescription.innerHTML = `<strong>${item.name}</strong> ${item.descicao.replace(/\n/g, "<br>")}`;

    // Adiciona evento ao botão de curtir do modal
    const btnCurtir = focus.querySelector('.fun-icons button');
    if (btnCurtir) {
        btnCurtir.onclick = () => curtirImagem(index);
    }

    // Evento para o botão "Postar" do comentário (apenas visual)
    const btnPostar = focus.querySelector('.comentar p');
    if (btnPostar) {
        btnPostar.onclick = () => {
            showNotification("É so enfeite :P");
        };
    }

    // Checa se a imagem está curtida pelo CPF validado
    await atualizarCurtidaAtual();
    atualizarBotaoCurtirFoco(index);

    document.body.classList.add("focus-active");
}

function closeCard() {
    const focus = document.getElementById("focus");
    focus.classList.remove("aberto");
    focus.classList.add("fechado");

    document.body.classList.remove("focus-active");
}

// Cria o modal de CPF customizado se não existir
function ensureCpfModal() {
    if (document.getElementById('cpf-modal')) return;
    const modal = document.createElement('div');
    modal.id = 'cpf-modal';
    modal.className = 'cpf-modal-bg';
    modal.innerHTML = `
        <div class="cpf-modal-content">
            <h2>Validação de CPF</h2>
            <p>O CPF será utilizado <b>apenas</b> para garantir que cada pessoa possa votar/curtir apenas uma vez.<br>
            Nenhum dado será compartilhado ou utilizado para outros fins.</p>
            <p class="cpf-info-extra">
                <b>Atenção:</b> Digite o CPF <b>apenas com números</b>, sem pontos ou traços.<br>
                Exemplo: <code>12345678901</code>
            </p>
            <input type="text" id="cpf-input" maxlength="14" placeholder="Digite seu CPF" autocomplete="off">
            <div class="cpf-modal-actions">
                <button id="cpf-cancel">Cancelar</button>
                <button id="cpf-ok">Validar</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Função para mostrar o modal e retornar uma Promise com o CPF ou null
function promptCpfCustom() {
    ensureCpfModal();
    return new Promise(resolve => {
        const modal = document.getElementById('cpf-modal');
        const input = modal.querySelector('#cpf-input');
        const btnOk = modal.querySelector('#cpf-ok');
        const btnCancel = modal.querySelector('#cpf-cancel');
        modal.style.display = 'flex';
        input.value = '';
        input.focus();

        function close(result) {
            modal.style.display = 'none';
            btnOk.removeEventListener('click', onOk);
            btnCancel.removeEventListener('click', onCancel);
            input.removeEventListener('keydown', onKey);
            resolve(result);
        }
        function onOk() {
            // Limpa o CPF de qualquer pontuação antes de retornar
            close(input.value.trim().replace(/[^\d]+/g, ''));
        }
        function onCancel() {
            close(null);
        }
        function onKey(e) {
            if (e.key === 'Enter') onOk();
            if (e.key === 'Escape') onCancel();
        }
        btnOk.addEventListener('click', onOk);
        btnCancel.addEventListener('click', onCancel);
        input.addEventListener('keydown', onKey);
    });
}

async function atualizarContadorSeguidores() {
    try {
        const dbRef = ref(dbRealtime);
        const snap = await get(child(dbRef, 'seguidores'));
        let total = 0;
        if (snap.exists()) {
            const seguidores = snap.val();
            total = Object.keys(seguidores).length;
        }
        // Atualiza o número na interface
        const seguidoresElem = document.querySelector('.subtitulo h3:nth-child(2) span');
        if (seguidoresElem) seguidoresElem.textContent = total;
    } catch (e) {
        // Se der erro, não altera nada
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Gera as imagens da galeria
    const pubSection = document.querySelector('.pub');
    lista.forEach((item, index) => {
        const img = document.createElement('img');
        img.src = item.link;
        img.alt = item.name;
        img.setAttribute('data-base', index);
        img.addEventListener('click', function() {
            openCard(this);
        });
        // Adiciona evento de curtir direto na grade (opcional)
        // img.addEventListener('dblclick', () => curtirImagem(index));
        pubSection.appendChild(img);
    });

    atualizarContadorSeguidores();

    // Evento para o botão "Seguir"
    const btnSeguir = document.getElementById('btn-seguir');
    if (btnSeguir) {
        btnSeguir.addEventListener('click', async function handleSeguir() {
            const cpf = await promptCpfCustom();
            if (!cpf) {
                showNotification("CPF inválido!");
                return;
            }
            const valido = validarCPF(cpf);
            if (!valido) {
                showNotification("CPF cancelado.");
                return;
            }
            showNotification("Agora você está seguindo a pagina.");
            try {
                await set(ref(dbRealtime, 'seguidores/' + cpf), { cpf });
                cpfSeguidor = cpf;
                await atualizarCurtidaAtual();
                btnSeguir.style.backgroundColor = "#888";
                btnSeguir.style.color = "#eee";
                btnSeguir.style.cursor = "not-allowed";
                btnSeguir.textContent = "Seguindo";
                btnSeguir.removeEventListener('click', handleSeguir);
                showNotification("CPF validado com sucesso! Agora você pode curtir imagens.");
                await atualizarContadorSeguidores();
            } catch (e) {
                showNotification("Erro ao cadastrar CPF: " + (e?.message || e));
                console.error("Erro ao cadastrar CPF:", e);
            }
        });
    }
});

// Torna as funções globais para uso inline no HTML (closeCard)
window.closeCard = closeCard;