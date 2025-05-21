import { dbRealtime, ref, set } from './link.js';
import { lista } from './lista.js';

// Função para validar CPF
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

function openCard(card) {
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

    document.body.classList.add("focus-active");
}

function closeCard() {
    const focus = document.getElementById("focus");
    focus.classList.remove("aberto");
    focus.classList.add("fechado");

    document.body.classList.remove("focus-active");
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
        pubSection.appendChild(img);
    });

    // Evento para o botão "Seguir"
    const btnSeguir = document.getElementById('btn-seguir');
    if (btnSeguir) {
        btnSeguir.addEventListener('click', async () => {
            const cpf = prompt("Digite seu CPF para seguir:");
            console.log("CPF digitado:", cpf);
            if (!cpf) {
                alert("Operação cancelada.");
                return;
            }
            const valido = validarCPF(cpf);
            console.log("CPF válido?", valido);
            if (!valido) {
                alert("CPF inválido!");
                return;
            }
            alert("CPF válido!");
            try {
                // Envia para o Realtime Database usando o CPF como chave
                await set(ref(dbRealtime, 'seguidores/' + cpf), { cpf });
                alert("CPF cadastrado com sucesso no Realtime Database!");
            } catch (e) {
                alert("Erro ao cadastrar CPF: " + (e?.message || e));
                console.error("Erro ao cadastrar CPF:", e);
            }
        });
    }
});

// Torna as funções globais para uso inline no HTML (closeCard)
window.closeCard = closeCard;