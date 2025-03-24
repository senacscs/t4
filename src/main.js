//! Cards, Pesquisa e Filtros
function atualizarCards(p, f) {   
    const cD = document.getElementById("cd");
    cD.innerHTML = "";
    alunos.sort((a, b) => a.nome.localeCompare(b.nome));
    if (!f) {
        let fils = document.getElementsByClassName("fil");
        for (let i = 0; i < fils.length; i++) {
            if (fils[i].classList.contains("sele")) {
                f = fils[i].value;
                break;
            }
        }
    }
    for (let i = 0; i < alunos.length; i++) {
        let elem1 = document.createElement("a");
        elem1.setAttribute("class", "card");
        elem1.setAttribute("href", "../" + alunos[i].pasta + "/" + f);
        let elem2 = document.createElement("div");
        let elem3 = document.createElement("p");
        elem3.innerText = alunos[i].nome;
        cD.appendChild(elem1);
        elem1.appendChild(elem2);
        elem2.appendChild(elem3); 
        if (p) {
            if (alunos[i].nome.toLowerCase().includes(p.toLowerCase())) {
                elem1.style.display = "block";
            } else {
                elem1.style.display = "none";
            }
        } else {
            elem1.style.display = "block";
        }
    }
} 

//! Filtros
//? Abrir a aba de filtros
function abrirFiltros() {
    let filtros = document.getElementById("filtros");
    if (filtros.classList.contains("aberto")) {
        filtros.classList.toggle("aberto2");
        setTimeout(() => {
            filtros.classList.toggle("aberto");
        }, 200);
    } else {
        filtros.classList.toggle("aberto");
        setTimeout(() => {
            filtros.classList.toggle("aberto2");
        }, 100);
    }
}

//? Responsividade da aba de filtros
function filtroWidth() {
    let barraW = document.getElementById("barraDePesquisa").offsetWidth;
    let filtro = document.getElementById("filtros");
    filtro.style.setProperty('--w', `${barraW}px`);
}
filtroWidth();
window.addEventListener("resize", filtroWidth);
//? Criar filtros 
function filtrosCards(t) {
    const fC = document.getElementById("filContainer");
    fC.innerHTML = "";
    let sp = document.getElementsByClassName("anpalr").length > 0 ? "p" : "s";
    let proj = sp === "p" ? ProjetosP : ProjetosS;
    let primeiroB = sp === "p" ? "primeiro/" : "segundo/"
    for(let i = 0; i < proj.length; i++) {
        let filbtn = document.createElement("button")
        filbtn.setAttribute("class", "fil");
        if(i === 0) {
            filbtn.classList.add("sele");
        };
        filbtn.setAttribute("onclick", "selecionado(this)");
        filbtn.setAttribute("value", primeiroB + proj[i].url);
        let filp = document.createElement("p")
        filp.innerText = proj[i].nome;
        fC.appendChild(filbtn);
        filbtn.appendChild(filp);
    };
    if (t == "1") {
        let pesvValue = document.getElementById("pesquisa").value;
        atualizarCards(pesvValue);
    }
};
filtrosCards()
//? Selecionar
function selecionado(a) {
    let fils = document.getElementsByClassName("fil");
    for (let i = 0; i < fils.length; i++) {
        fils[i].classList.remove("sele");
    };
    a.classList.add("sele");
    let pesvValue = document.getElementById("pesquisa").value;
    atualizarCards(pesvValue, a.value);
};

function troca() {
    let anpal = document.getElementById("anpal")
    anpal.classList.toggle("anpalr")
    filtrosCards("1")
}

//! Chamar a função pra spawnar os cards IMPORTANTE ESTAR NO FINAL
atualizarCards();