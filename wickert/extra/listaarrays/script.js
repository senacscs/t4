let tex = document.getElementById("t")
let num = document.getElementById("n")
let folha = document.getElementById("folha")
let ar = document.getElementById("ar")

// Carregar a lista do localStorage ao iniciar
const savedList = localStorage.getItem("lista");
const lista = savedList ? JSON.parse(savedList) : [];

// Atualizar a exibição e salvar no localStorage
function atualizar() {
    folha.innerHTML = "";
    ar.textContent = lista.join(" - ");
    for (i = 0; i < lista.length; i++) {
        let u = i + 1;
        let r = i;
        let item = document.createElement("div");
        item.classList.add("item");
        let numb = document.createElement("h3");
        numb.classList.add("numb");
        numb.textContent = u + ".";
        let nome = document.createElement("h3");
        nome.textContent = lista[i];
        let iconUp = document.createElement("ion-icon");
        iconUp.setAttribute("name", "caret-up-outline");
        iconUp.classList.add("one");
        iconUp.onclick = function() { up(r); };
        let iconDown = document.createElement("ion-icon");
        iconDown.setAttribute("name", "caret-down-outline");
        iconDown.classList.add("doe");
        iconDown.onclick = function() { down(r); };
        let iconClose = document.createElement("ion-icon");
        iconClose.setAttribute("name", "close-outline");
        iconClose.classList.add("toe");
        iconClose.onclick = function() { delet(r); };
        item.appendChild(numb);
        item.appendChild(nome);
        item.appendChild(iconUp);
        item.appendChild(iconDown);
        item.appendChild(iconClose);
        folha.appendChild(item);
    }

    // Salvar a lista no localStorage
    localStorage.setItem("lista", JSON.stringify(lista));
}

function pu() {
    lista.push(tex.value);
    atualizar()
}
function po() {
    lista.pop();
    atualizar()

}
function un() {
    lista.unshift(tex.value);
    atualizar()
}
function sh() {
    lista.shift();
    atualizar()
}
function sp() {    
    let nump = num.value - 1
    lista.splice(nump, 0, tex.value)
    atualizar()
}
function su() {    
    let nump = num.value - 1
    lista[nump] = tex.value
    atualizar()
}

function up(e) {
    if(lista[e - 1] !== undefined) {
        let u = lista[e - 1]
        let d = lista[e]
        lista[e - 1] = d
        lista[e] = u
        atualizar()
    }
}
function down(e) {
    if(lista[e + 1] !== undefined) {
        let u = lista[e + 1]
        let d = lista[e]
        lista[e + 1] = d
        lista[e] = u
        atualizar()
    }
    
}
function delet(e) {
    lista.splice(e, 1)
    atualizar()
}
function alf() {
    lista.sort()
    atualizar()
}
function fla() {
    lista.sort()
    lista.reverse()
    atualizar()
}
atualizar()