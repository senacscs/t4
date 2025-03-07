/* 
    Quando este codigo foi feito, Eu e Deus sabiamos como ele funciona.
Pore, agora, so ele sabe! 
*/
let tex = document.getElementById("t")
let num = document.getElementById("n")
let folha = document.getElementById("folha")
let ar = document.getElementById("ar")

//! Array/Matriz a ser manipulada como banco de dados da lista
const lista = []

//! Função para atualizar os itens da lista
function atualizar() {
    //? Para não duplicar o que já esta na lista
    folha.innerHTML = ""
    //? Só para deixar menos feio
    ar.textContent = lista.join(" - ")
    //? Laço de repetição que repete
    for (i = 0; i < lista.length; i++) {
        //? Gambiarra para não bugar (Apenas)
        let u = i + 1
        let r = i
        //? Criar a div do item da lista
        let item = document.createElement("div");
        item.classList.add("item");
        //? Criar o h3 que indica a posição do item na lista
        let numb = document.createElement("h3");
        numb.classList.add("numb");
        numb.textContent = u + ".";
        //? Criar o h3 com o texto indicando o item
        let nome = document.createElement("h3");
        nome.textContent = lista[i];
        //? Icone para mandar para cima
        let iconUp = document.createElement("ion-icon");
        iconUp.setAttribute("name", "caret-up-outline");
        iconUp.classList.add("one");
        iconUp.onclick = function () { up(r); };
        //? Icone para mandar para baixo
        let iconDown = document.createElement("ion-icon");
        iconDown.setAttribute("name", "caret-down-outline");
        iconDown.classList.add("doe");
        iconDown.onclick = function () { down(r); };
        //? Icone para remover da lista
        let iconClose = document.createElement("ion-icon");
        iconClose.setAttribute("name", "close-outline");
        iconClose.classList.add("toe");
        iconClose.onclick = function () { delet(r); };
        //? Colocar tudo pra dentro do item, 
        //? e o item pra dentro da folha
        item.appendChild(numb);
        item.appendChild(nome);
        item.appendChild(iconUp);
        item.appendChild(iconDown);
        item.appendChild(iconClose);
        folha.appendChild(item);
    }
}

//! Funçoes de manipulações
function pu() {
    lista.push(tex.value);
    atualizar();
}

function po() {
    lista.pop();
    atualizar();
}

function un() {
    lista.unshift(tex.value);
    atualizar();
}

function sh() {
    lista.shift();
    atualizar();
}

function sp() {
    let nump = num.value - 1;
    lista.splice(nump, 0, tex.value);
    atualizar();
}

function su() {
    let nump = num.value - 1;
    lista[nump] = tex.value;
    atualizar();
}

function up(e) {
    if (lista[e - 1] !== undefined) {
        let u = lista[e - 1];
        let d = lista[e];
        lista[e - 1] = d;
        lista[e] = u;
        atualizar();
    }
}

function down(e) {
    if (lista[e + 1] !== undefined) {
        let u = lista[e + 1];
        let d = lista[e];
        lista[e + 1] = d;
        lista[e] = u;
        atualizar();
    }
}

function delet(e) {
    lista.splice(e, 1);
    atualizar();
}

function alf() {
    lista.sort();
    atualizar();
}

function fla() {
    lista.sort();
    lista.reverse();
    atualizar();
}
