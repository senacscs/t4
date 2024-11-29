const alunos = [
    { "nome": "Analice", "pasta": "ana" },
    { "nome": "Andrei", "pasta": "andrei" },
    { "nome": "Andri", "pasta": "andri" },
    { "nome": "Bernardo👽", "pasta": "aquino" },
    { "nome": "Augusto", "pasta": "augusto" },
    { "nome": "Pedro B.", "pasta": "backes" },
    { "nome": "Thom", "pasta": "brandt" },
    { "nome": "Cícero", "pasta": "cicero" },
    { "nome": "Clara", "pasta": "clara" },
    { "nome": "Guilherme D.🐒", "pasta": "dalke" },
    { "nome": "Davi", "pasta": "davie" },
    { "nome": "Eduardo D.", "pasta": "edu" },
    { "nome": "Ana E.", "pasta": "elisa" },
    { "nome": "Enzo", "pasta": "enzo" },
    { "nome": "João E.🍔", "pasta": "ernesto" },
    { "nome": "Gabriel Ludwig", "pasta": "ludwig" },
    { "nome": "Garcia🧃", "pasta": "garcia" },
    { "nome": "Gustavo", "pasta": "gustavo" },
    { "nome": "Henrique", "pasta": "henrique" },
    { "nome": "João G.", "pasta": "joaogoetze" },
    { "nome": "Joaquim", "pasta": "joaquim" },
    { "nome": "Guilherme K.", "pasta": "kipper" },
    { "nome": "Larissa", "pasta": "larii" },
    { "nome": "Lucas🍒", "pasta": "lucas" },
    { "nome": "Marina", "pasta": "marina" },
    { "nome": "Manuela🌙", "pasta": "mohr" },
    { "nome": "Eduardo M.", "pasta": "moraes" },
    { "nome": "Nicole", "pasta": "nick" },
    { "nome": "Pedro A.", "pasta": "pedroa" },
    { "nome": "Pedro F.", "pasta": "pedrofa" },
    { "nome": "Rafael", "pasta": "rafaelmarmitt" },
    { "nome": "Sara", "pasta": "sararosa" },
    { "nome": "Arthur", "pasta": "scherer" },
    { "nome": "Matheus B.", "pasta": "teteu" },
    { "nome": "Theo", "pasta": "theo" },
    { "nome": "Iuri🧃", "pasta": "wickert" },
    { "nome": "Matheus F.", "pasta": "" }
];


// ---------------------------

const projetos = [
    { "nome": "Indicações HTML", "url": "indicacoeshtml" },
    { "nome": "Indicações CSS", "url": "indicacoescss" },
    { "nome": "Site pros responsáveis", "url": "responsaveis" },
    { "nome": "Currículo", "url": "curriculo" },
    { "nome": "Olá Mundo", "url": "olamundo" },
    { "nome": "Projeto PI", "url": "projeto" },
    { "nome": "Autocuidado", "url": "autocuidado"},
    { "nome": "Imersão", "url": "imersao1"},
    { "nome": "Ponte Da Vinci", "url": "pontedavinci"},
    { "nome": "Biomas", "url": "biomas"},
    { "nome": "Jogo de mat.", "url": "jogo1"},
    { "nome": "Site da Oficina", "url": "oficina"},
    { "nome": "Imersão", "url": "imersao1"},
    { "nome": "Primeiro Site", "url": "olamundo"},
    { "nome": "Poemas", "url": "poema"},
    { "nome": "PortugolJS", "url": "portugoljs"},
    { "nome": "Tecnologia em mat.", "url": "tecnologiamat"},
    { "nome": "Site no Papel", "url": "teste_ods"},
    { "nome": "Triângulos", "url": "triangulos"},
];

// ----------------------------

function criarElem(tag, atrib = null) {
    let elem = document.createElement(tag);
    if(atrib != null){
        for (j = 0; j < atrib.length; j++) {
            elem.setAttribute(atrib[j][0], atrib[j][1]);
        }
    }
    return elem;
}


//CRIANDO LISTA DE FILTROS

projetos.sort(function (a, b) {
    if (a.url < b.url) {
        return -1;
    }
    if (a.url > b.url) {
        return 1;
    }
    return 0;
})

const filtros = document.getElementById('filters');

for (i = 0; i < projetos.length; i++) {
    const span = criarElem('span');
    const input = criarElem('input',[["type","radio"],["name","filter-param"],["class","filter"],["value",projetos[i].url]]);
    const div = criarElem('div');

    span.appendChild(document.createTextNode(projetos[i].nome));
    div.appendChild(input);
    div.appendChild(span);
    filtros.appendChild(div);
}

//CRIANDO LISTA DE ALUNOS

alunos.sort(function (a, b) {
    if (a.nome < b.nome) {
        return -1;
    }
    if (a.nome > b.nome) {
        return 1;
    }
    return 0;
})

console.log(alunos)

const lista = document.getElementById('lista');

for (i = 0; i < alunos.length; i++) {
    const p = criarElem('p');
    const div = criarElem('div', [["class", "nomes"]]);
    const a = criarElem('a', [["href", `./${alunos[i].pasta}/`],["target", "_blank"]]);

    p.appendChild(document.createTextNode(alunos[i].nome));

    div.appendChild(p);
    a.appendChild(div);
    lista.appendChild(a);
}

//FAZENDO OS FILTROS FUNCIONAREM

const inputs = document.querySelectorAll("input.filter");
const links = document.querySelectorAll("section > a");
let value;

inputs.forEach(function(i) {
    i.addEventListener("input",function(){
        value = this.value
        for (i = 0; i < links.length; i++) {
            links[i].setAttribute("href", `./${alunos[i].pasta}/${value}`)
        }
    })
});

// PESQUISA DE NOME DOS ALUNOS

const searchInput = document.getElementById("searchInput");
const nomes = document.querySelectorAll(".nomes");

searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase();

    nomes.forEach(nome => {
        const name = nome.querySelector("p").textContent.toLowerCase();

        if (name.startsWith(searchTerm)) {
            nome.style.display = "inline-block";
        } else {
            nome.style.display = "none";
        }
    });
});
